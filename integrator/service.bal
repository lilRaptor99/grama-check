import ballerina/http;
import ballerina/io;
import ballerina/uuid;
import integrator.db;

// enum Status {
//     PENDING,
//     APPROVED,
//     REJECTED
// }

type PoliceReport record {|
    string police_report_id;
    string user_id;
    string first_name;
    string last_name;
    string address;
    string id_number;
    string proof_image_url;
    string id_check_status;
    string police_check_status;
    string address_check_status;
    string submitted_timestamp;
|};

type PoliceReportInput record {|
    string user_id;
    string first_name;
    string last_name;
    string address;
    string id_number;
    string proof_image_url;
|};

// INSERT INTO gramadb.police_report values (uuid(), "1", "Pratheek", "Senevirathne", "", "200/4 1st lane", "992383845V", "", "", "", "", now());

public configurable string addressCheckURL = ?;
public configurable string addressCheckToken = ?;
public final http:Client addressCheckClient = check new (addressCheckURL);

public configurable string identityCheckURL = ?;
public configurable string identityCheckToken = ?;
public final http:Client identityCheckClient = check new (identityCheckURL);

type HealthResponse record {
    json|error addressCheckStatus;
    json|error identityCheckStatus;
};

// Get and post police report data
service / on new http:Listener(8090) {

    // Check service health on microservices
    resource isolated function get health() returns json|error {
        io:println("GET service health");

        worker WaddressCheckStatus returns json|error {
            return check addressCheckClient->get("/", {"Authorization": "Bearer " + addressCheckToken});
        }
        worker WidentityCheckStatus returns json|error {
            return check identityCheckClient->get("/", {"Authorization": "Bearer " + identityCheckToken});
        }

        HealthResponse result = wait {addressCheckStatus: WaddressCheckStatus, identityCheckStatus: WidentityCheckStatus};

        json|error res1 = result.addressCheckStatus;
        json|error res2 = result.identityCheckStatus;

        json identityCheckAPIStatus;
        json addressCheckAPIStatus;
        if (res1 is error) {
            addressCheckAPIStatus = {"error": "Address check service is not available"};
        }
        else {
            addressCheckAPIStatus = res1;
        }
        if (res2 is error) {
            identityCheckAPIStatus = {"error": "Identity check service is not available"};
        }
        else {
            identityCheckAPIStatus = res2;
        }

        return {addressCheckAPIStatus, identityCheckAPIStatus};
    }

    resource isolated function get helloo() returns string {
        return "Helloo";
    }

    resource isolated function get policeReport/all() returns PoliceReport[]|error? {
        io:println("GET all police reports");
        stream<PoliceReport, error?> resultStream = db:db->query(`SELECT * FROM gramadb.police_report
                                                                LIMIT 100;`);

        PoliceReport[] repArr = [];

        check from PoliceReport report in resultStream
            do {
                repArr.push(report);
            };

        check resultStream.close();
        return repArr;
    }

    resource isolated function post policeReport(@http:Payload PoliceReportInput data) returns PoliceReport|error? {
        io:println("POST police report: ", data);

        string policeReportId = uuid:createType1AsString();

        _ = check db:db->execute(`INSERT INTO gramadb.police_report 
                                values (
                                ${policeReportId}, 
                                ${data.user_id}, 
                                ${data.first_name}, 
                                ${data.last_name}, 
                                ${data.address}, 
                                ${data.id_number}, 
                                ${data.proof_image_url}, 
                                "PENDING", 
                                "PENDING", 
                                "PENDING", 
                                now());`);

        PoliceReport storedReport = check db:db->queryRow(`SELECT * FROM gramadb.police_report 
                                                        WHERE police_report_id = ${policeReportId};`);

        _ = start checkPoliceReportStatus(policeReportId, data.id_number);

        return storedReport;
    }
}

// Check police report status
isolated function checkPoliceReportStatus(string policeReportId, string id_number) returns error? {
    io:println("Check police report status");

    // Check identity
    json|error identityCheckResponse = identityCheckClient->get("/api/citizen/" + id_number, {"Authorization": "Bearer " + identityCheckToken});
    if (identityCheckResponse is error) {
        io:println("Error while checking identity: ", identityCheckResponse);
        _ = check db:db->execute(`UPDATE gramadb.police_report 
                            SET id_check_status = "REJECTED" 
                            WHERE police_report_id = ${policeReportId};`);
    }
    else {
        io:println("Identity check response: ", identityCheckResponse);
        _ = check db:db->execute(`UPDATE gramadb.police_report 
                            SET id_check_status = "APPROVED" 
                            WHERE police_report_id = ${policeReportId};`);
    }
}

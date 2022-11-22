import ballerina/http;
import ballerina/io;
import ballerina/uuid;
import integrator.db;

// import ballerinax/java.jdbc;

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

// INSERT INTO gramadb.police_report values (uuid(), "1", "Pratheek", "Senevirathne", "", "200/4 1st lane", "992383845V", "", "", "", "", now());

public configurable string addressCheckURL = ?;
public configurable string addressCheckAPIKey = ?;
public final http:Client addressCheckClient = check new (addressCheckURL);

// Get and post police report data
service / on new http:Listener(8090) {

    // Check service health on microservices
    resource isolated function get health() returns json|error? {
        io:println("GET address check health: ");
        json resp = check addressCheckClient->get("/", {"API-Key": addressCheckAPIKey});
        return resp;
    }

    resource isolated function get helloo() returns string {
        return "Helloo";
    }

    resource isolated function get policeReport/all() returns PoliceReport[]|error? {
        io:println("GET all police reports");
        stream<PoliceReport, error?> resultStream = db:db->query(`SELECT * FROM gramadb.police_report
                                                                LIMIT 25;`);

        PoliceReport[] repArr = [];

        check from PoliceReport report in resultStream
            do {
                repArr.push(report);
            };

        check resultStream.close();
        return repArr;
    }

    resource isolated function post policeReport(@http:Payload PoliceReport data) returns PoliceReport|error? {
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
                                "", 
                                "", 
                                "", 
                                "", 
                                now());`);

        PoliceReport storedReport = check db:db->queryRow(`SELECT * FROM gramadb.police_report 
                                                        WHERE police_report_id = ${policeReportId};`);
        return storedReport;
    }
}

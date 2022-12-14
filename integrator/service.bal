import ballerina/http;
import ballerina/io;
import ballerina/uuid;
import ballerina/jwt;
import ballerinax/slack;
import integrator.db;

// enum Status {
//     PENDING,
//     APPROVED,
//     REJECTED
// }

type PoliceReport record {|
    string police_report_id;
    string user_email;
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
    string user_email;
    string first_name;
    string last_name;
    string address;
    string id_number;
    string proof_image_url;
|};

public configurable string addressCheckURL = ?;
public configurable string addressCheckToken = ?;
public final http:Client addressCheckClient = check new (addressCheckURL);

public configurable string identityCheckURL = ?;
public configurable string identityCheckToken = ?;
public final http:Client identityCheckClient = check new (identityCheckURL);

public configurable string slackAuthToken = ?;
public final slack:Client slackClient = check new ({
    auth: {
        token: slackAuthToken
    }
});

type HealthResponse record {
    json|error addressCheckStatus;
    json|error identityCheckStatus;
};

service class RequestAuthInterceptor {
    *http:RequestInterceptor;

    resource function 'default [string... path](http:RequestContext ctx,
            http:Request req) returns http:NextService|error? {

        string authHeader = check req.getHeader("Authorization");

        if (!authHeader.startsWith("Bearer ")) {
            return error("Authorization header is missing");
        }

        string token = authHeader.substring(7, authHeader.length());

        [jwt:Header, jwt:Payload] [header, payload] = check jwt:decode(token);

        io:println("JWT Payload: ", payload.entries());

        req.setHeader("userEmail", "bleh@someCompany.com");

        return ctx.next();
    }
}

// TODO: Add sercurity filter

// @http:ServiceConfig {
//     interceptors: [new RequestAuthInterceptor()]
// }

service / on new http:Listener(8090) {

    // Check service health on microservices
    resource isolated function get serviceHealth() returns json|error {
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

    resource isolated function get .(@http:Header {name: "userEmail"} string userEmail) returns string {
        io:println("Recieved user email: ", userEmail);
        return "Service is up and running";
    }

    // Police report endpoits 
    resource isolated function get policeReport/all() returns PoliceReport[]|error? {
        io:println("GET all police reports");
        stream<PoliceReport, error?> resultStream = db:db->query(`SELECT * FROM gramadb.police_report
                                                                ORDER BY submitted_timestamp DESC
                                                                LIMIT 100;`);

        PoliceReport[] repArr = [];

        check from PoliceReport report in resultStream
            do {
                repArr.push(report);
            };

        check resultStream.close();
        return repArr;
    }

    resource isolated function get policeReport/[string email]() returns PoliceReport|error? {
        io:println("GET police report: ", email);
        PoliceReport storedReport = check db:db->queryRow(`SELECT * FROM gramadb.police_report 
                                                        WHERE user_email = ${email};`);
        return storedReport;
    }

    resource isolated function post policeReport(@http:Payload PoliceReportInput data) returns PoliceReport|error? {
        io:println("POST police report: ", data);

        string policeReportId = uuid:createType1AsString();

        _ = check db:db->execute(`INSERT INTO gramadb.police_report 
                                values (
                                ${policeReportId}, 
                                ${data.user_email}, 
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

        _ = start updatePoliceReportStatus(policeReportId, data.id_number);

        return storedReport;
    }

    resource isolated function post acceptReport/[string policeReportId]() returns PoliceReport|error? {
        io:println("POST accept police report: ", policeReportId);

        _ = check db:db->execute(`UPDATE gramadb.police_report 
                                        SET address_check_status = "APPROVED" 
                                        WHERE police_report_id = ${policeReportId};`);

        PoliceReport storedReport = check db:db->queryRow(`SELECT * FROM gramadb.police_report 
                                                        WHERE police_report_id = ${policeReportId};`);

        return storedReport;
    }

    resource isolated function post rejectReport/[string policeReportId]() returns PoliceReport|error? {
        io:println("POST accept police report: ", policeReportId);

        _ = check db:db->execute(`UPDATE gramadb.police_report 
                                        SET address_check_status = "REJECTED"  
                                        WHERE police_report_id = ${policeReportId};`);

        PoliceReport storedReport = check db:db->queryRow(`SELECT * FROM gramadb.police_report 
                                                        WHERE police_report_id = ${policeReportId};`);

        return storedReport;
    }

    resource isolated function post reCheckPoliceReportStatus/[string policeReportId]() returns json|error? {
        io:println("POST reCheck Police Report Status: ", policeReportId);

        PoliceReport storedReport = check db:db->queryRow(`SELECT * FROM gramadb.police_report 
                                                        WHERE police_report_id = ${policeReportId};`);
        _ = start updatePoliceReportStatus(policeReportId, storedReport.id_number);

        return {"status": "Recheck started"};
    }

}

// Check police report status
isolated function updatePoliceReportStatus(string policeReportId, string id_number) returns error? {
    io:println("Update police report status");

    // Check identity
    json|error identityCheckResponse = identityCheckClient->get("/api/citizen/" + id_number, {"Authorization": "Bearer " + identityCheckToken});
    if (identityCheckResponse is error) {
        io:println("Error while checking identity: ", identityCheckResponse);

        slack:Message messageParams = {
            channelName: "grama-check",
            text: "Error while checking identity status \n"
                + "Police check report ID: " + policeReportId + " \n"
                + "ID number: " + id_number + " \n"
                + "Error: " + identityCheckResponse.toString()
        };

        _ = check slackClient->postMessage(messageParams);

        if (identityCheckResponse is http:ClientError) {
            _ = check db:db->execute(`UPDATE gramadb.police_report 
                                        SET id_check_status = "REJECTED" 
                                        WHERE police_report_id = ${policeReportId};`);
        } else {
            _ = check db:db->execute(`UPDATE gramadb.police_report 
                                        SET id_check_status = "SYSTEM_ERROR" 
                                        WHERE police_report_id = ${policeReportId};`);
        }

    }
    else {
        io:println("Identity check response: ", identityCheckResponse);
        _ = check db:db->execute(`UPDATE gramadb.police_report 
                            SET id_check_status = "APPROVED" 
                            WHERE police_report_id = ${policeReportId};`);
    }
}

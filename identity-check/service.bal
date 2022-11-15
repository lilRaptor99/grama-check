import ballerina/http;
import identity_check.db;
import identity_check.models;

public listener http:Listener httpListener = new (8080);

service / on httpListener {
    resource function get health() returns string {
        return "OK";
    }

    resource function get citizens() returns models:Citizen[]|http:Conflict {
        return db:getAllCitizenData();
    }

    resource function get citizen/[string id]() returns models:Citizen|http:NotFound {
        models:Citizen? citizen = db:getCitizenData(id);

        if (citizen is null) {
            http:NotFound err = {body: {"error": "Id number not found"}};
            return err;
        }

        return citizen;
    }

}

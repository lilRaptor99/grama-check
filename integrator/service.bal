import ballerina/http;

service / on new http:Listener(9090) {
    resource function get health() returns string|error {
        return "OK";
    }
}

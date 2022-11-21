import ballerinax/mysql;

public final mysql:Client db = check new (
    host = "grama-check.mysql.database.azure.com",
port = 3306,
database = "gramadb",
user = "dbAdmin",
password = "railway!123",
connectionPool = {maxOpenConnections: 5},
    options = {ssl: {mode: mysql:SSL_PREFERRED, allowPublicKeyRetrieval: true}, connectTimeout: 10}
);

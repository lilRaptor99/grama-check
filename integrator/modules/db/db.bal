import ballerinax/mysql;

// public final mysql:Client db = check new (
//     host = "localhost",
// port = 3306,
// database = "gramadb",
// user = "root",
// password = "admin",
// connectionPool = {maxOpenConnections: 5},
//     options = {ssl: {mode: mysql:SSL_PREFERRED, allowPublicKeyRetrieval: true}, connectTimeout: 10}
// );

public configurable string dbUser = ?;
public configurable string dbPassword = ?;

public final mysql:Client db = check new (
    host = "grama-check.mysql.database.azure.com",
port = 3306,
database = "gramadb",
user = dbUser,
password = dbPassword,
connectionPool = {maxOpenConnections: 5},
    options = {ssl: {mode: mysql:SSL_PREFERRED, allowPublicKeyRetrieval: true}, connectTimeout: 10}
);

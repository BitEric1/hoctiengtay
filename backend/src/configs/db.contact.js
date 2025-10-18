const mysql = require("mysql2/promise");
const { env } = require("./env");

let pool = null;
if (env.MYSQL_URI_COURSES) {
    pool = mysql.createPool({
        uri: env.MYSQL_URI_COURSES,
        connectionLimit: 10,
        namedPlaceholders: true,
    });
}

module.exports = { pool };

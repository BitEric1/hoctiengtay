const mysql = require("mysql2/promise");
require("dotenv").config();

const pool = mysql.createPool({
    uri: process.env.MYSQL_URI,
    connectionLimit: 10,
    namedPlaceholders: true,
    charset: "utf8mb4_general_ci",
});

module.exports = { pool };

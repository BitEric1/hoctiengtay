const path = require("path");
require("dotenv").config({ path: path.join(__dirname, "..", "..", ".env") });

const mysql = require("mysql2/promise");

const uri = process.env.MYSQL_URI_COURSES;

if (!uri) {
    throw new Error("Thiếu MYSQL_URI_COURSES trong backend/.env");
}

// Truyền CHUỖI URI trực tiếp
const pool = mysql.createPool(uri);
// Nếu cần nhiều câu SQL 1 lần: const pool = mysql.createPool(uri + "?multipleStatements=true");

module.exports = { pool };

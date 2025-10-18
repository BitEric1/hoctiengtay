require("dotenv").config();

const env = {
    PORT: Number(process.env.PORT || 5500),
    PUBLIC_BASE: process.env.PUBLIC_BASE || "http://localhost:5500",
    MYSQL_URI_TRANSLATE: process.env.MYSQL_URI_TRANSLATE || null,
    MYSQL_URI_COURSES: process.env.MYSQL_URI_COURSES || null,
    RESEND_API_KEY: process.env.RESEND_API_KEY,
    MAIL_FROM: process.env.MAIL_FROM || "onboarding@resend.dev",
    MAIL_TO: process.env.MAIL_TO,
    MYSQL_URI: process.env.MYSQL_URI || null,
};

module.exports = { env };

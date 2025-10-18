const helmet = require("helmet");
const rateLimit = require("express-rate-limit");

const security = [helmet(), rateLimit({ windowMs: 60 * 1000, limit: 20 })];

module.exports = { security };

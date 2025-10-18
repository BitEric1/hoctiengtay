require("dotenv").config();
const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const app = express();
app.use(morgan("dev"));
const rateLimit = require("express-rate-limit");
const helmet = require("helmet");

const translateRouter = require("./routes/router.translate.js");
const coursesRouter = require("./routes/router.courses.js");
const contactRouter = require("./routes/route.contact.js");

const PORT = process.env.PORT || 5000;
app.use(cors());
app.use(helmet());
app.use(express.urlencoded({ extended: true }));
app.use(express.json({ limit: "16kb" }));

const corsOptions = {
    origin: ["http://localhost:5173/", "http://localhost:3001/"],
    credential: true,
};

app.get("/", (req, res) => res.send("Home page"));
app.get("/api/v1/health", cors(corsOptions), (_, res) =>
    res.send({ ok: true })
);
app.use("/api/v1", translateRouter);
app.use("/api/v1/courses", coursesRouter);
app.use("/api/v1", contactRouter);
app.use(
    "/api/v1/contact",
    rateLimit({ windowMs: 60 * 1000, limit: 20 }),
    contactRouter
);

app.use((err, req, res, next) => {
    console.error("ERROR:", err);
    const status = err.status || err.statusCode || 500;
    res.status(status).json({
        ok: false,
        message: err.message || "Internal Server Error",
    });
});

app.listen(PORT, () => {
    console.log(`Server is running at http://localhost:${PORT}`);
});

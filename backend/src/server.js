import cors from "cors";
import express from "express";
import morgan from "morgan";
import { PORT } from "./config/env.js";
import { errorHandler } from "./middlewares/error.js";
import router from "./routes/index.js";

const app = express();

app.use(cors());
app.use(express.json());
app.use(morgan("dev"));

app.use("/api", router);

app.use((req, res) => res.status(404).json({ error: "Not found" }));

app.use(errorHandler);

app.listen(PORT, () => {
    console.log(`API listening on http://localhost:${PORT}`);
});

console.log("Hello");

import express from "express";
import dotenv from "dotenv";
import router from "./src/routes/database.routes.js";
import cacheRoutes from "./src/routes/cache.routes.js";

dotenv.config();
const app = express();
app.use(express.json());

app.use("/api", router);
app.use("/api/cache", cacheRoutes);

app.get("/health", (_, res) => res.send("✅ API DB online"));

app.listen(5001, () => console.log("🚀 API DB rodando em http://localhost:5001"));

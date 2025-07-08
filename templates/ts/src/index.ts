import "reflect-metadata";
import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import morgan from "morgan";
import { AppDataSource } from "./config/data-source";
import authRoutes from "./routes/auth.route";
import { errorHandler } from "./middlewares/error.middleware";

dotenv.config();

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());
app.use(morgan("dev"));

app.use("/api/auth", authRoutes);

app.use(errorHandler);

AppDataSource.initialize()
  .then(() => {
    console.log("✅ Database connected");
    app.listen(port, () => console.log(`🚀 Server running on port ${port}`));
  })
  .catch((err) => {
    console.error("❌ DB connection error", err);
  });

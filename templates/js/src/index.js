require("dotenv").config();
require("reflect-metadata");
require("express-async-errors");

const express = require("express");
const cors = require("cors");
const morgan = require("morgan");

const { AppDataSource } = require("./config/data-source");
const authRoutes = require("./routes/auth.route");
const { errorHandler } = require("./middlewares/error.middleware");

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
import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import mongoose from "mongoose";

// routes
import categoryRoutes from "./routes/category.route.js";

import dotenv from "dotenv";
dotenv.config();

const app = express();

const DB_URL = process.env.DB_URL;
mongoose.connect(DB_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

mongoose.connection.on("connected", () => {
  console.log("DB Connected");
});

mongoose.connection.on("error", (err) => {
  console.log("DB Connection Error: ", err);
});

app.use(cors());
app.use(bodyParser.json({ limit: "30mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));

app.use(express.static("uploads"));

app.use("/api/category", categoryRoutes);

app.get("/", (req, res) => {
  res.send("api url:  http://localhost:5050/api");
});

const PORT = process.env.PORT;

app.listen(PORT, () => {
  console.log("Server Url: http://localhost:5050");
});

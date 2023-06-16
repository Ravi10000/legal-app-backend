import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();

// routes
import categoryRoutes from "./routes/category.route.js";
import landingBannerRoutes from "./routes/landing-banner.route.js";
import contactRouter from "./routes/contact.route.js";
import contactUsRoutes from "./routes/contact-us.route.js";
import newsRoutes from "./routes/news.route.js";
import notifictiaonRoutes from "./routes/notification.route.js";
import authRoutes from "./routes/auth.route.js";
import serviceRoutes from "./routes/service.route.js";
import newsImageRoutes from "./routes/news-image.route.js";
import reviewRoutes from "./routes/review.route.js";
import serviceRequestRoutes from "./routes/service-request.route.js";
import statisticRoutes from "./routes/statistic.route.js";
import transcationRoutes from "./routes/transaction.route.js";
import orderRoutes from "./routes/order.route.js";

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

app.use("/api/banner", landingBannerRoutes);
app.use("/api/category", categoryRoutes);
app.use("/api/contact-us", contactUsRoutes);
app.use("/api/contact", contactRouter);
app.use("/api/news", newsRoutes);
app.use("/api/notification", notifictiaonRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/service", serviceRoutes);
app.use("/api/news-image", newsImageRoutes);
app.use("/api/review", reviewRoutes);
app.use("/api/service-request", serviceRequestRoutes);
app.use("/api/statistic", statisticRoutes);
app.use("/api/transaction", transcationRoutes);
app.use("/api/order", orderRoutes);

app.get("/", (req, res) => {
  res.send("api url:  http://localhost:5050/api");
});

const PORT = process.env.PORT;

app.listen(PORT, () => {
  console.log("Server Url: http://localhost:5050");
});

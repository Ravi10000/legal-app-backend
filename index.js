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
import notificationRoutes from "./routes/notification.route.js";
import authRoutes from "./routes/auth.route.js";
import serviceRoutes from "./routes/service.route.js";
import newsImageRoutes from "./routes/news-image.route.js";
import reviewRoutes from "./routes/review.route.js";
import serviceRequestRoutes from "./routes/service-request.route.js";
import statisticRoutes from "./routes/statistic.route.js";
import transcationRoutes from "./routes/transaction.route.js";
import orderRoutes from "./routes/order.route.js";
import userRoutes from "./routes/user.route.js";
import vendorRoutes from "./routes/vendor.route.js";
import vendorServiceRoutes from "./routes/vendor-service.route.js";
import { getIP } from "./utils/get-ip.js";
import { sendSlackMessage } from "./utils/send-slack.js";

const app = express();

const DB_URL = process.env.DB_URL;
// const DB_URL = "mongodb://127.0.0.1:27017/legal-app";
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
app.use("/api/auth", authRoutes);
app.use("/api/service", serviceRoutes);
app.use("/api/news-image", newsImageRoutes);
app.use("/api/review", reviewRoutes);
app.use("/api/service-request", serviceRequestRoutes);
app.use("/api/statistic", statisticRoutes);
app.use("/api/transaction", transcationRoutes);
app.use("/api/order", orderRoutes);
app.use("/api/notification", notificationRoutes);
app.use("/api/user", userRoutes);
app.use("/api/vendor", vendorRoutes);
app.use("/api/vendor-service", vendorServiceRoutes);

app.get(["/", "/api"], (req, res) => {
  const response = {
    status: "success",
    message: "welcome to legal API🚀",
    serverUrl: `http://${getIP()}:${process.env.PORT}`,
    assestsUrl: `http://${getIP()}:${process.env.PORT}`,
    APIUrl: `http://${getIP()}:${process.env.PORT}/api`,
  };
  res.json(response);
});

const PORT = process.env.PORT;

app.listen(PORT, () => {
  console.log("Local URL: http://localhost:5050");
  console.log("Server URL: http://" + getIP() + ":5050");
  if (process.env.NODE_ENV !== "production") sendSlackMessage();
});

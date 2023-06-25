import path from "path";

import express from "express";
import dotenv from "dotenv";
import UserRoutes from "./routes/authRoute.js";
import cookieParser from "cookie-parser";

// middlewares

import { notFound, errorHandler } from "./middlewares/errorMiddleware.js";
import connectDB from "./config/db.js";

// config
dotenv.config();

const port = process.env.PORT || 5000;

connectDB();
const app = express();

app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api/users", UserRoutes);

if (process.env.NODE_ENV === "production") {
  console.log(process.env.NODE_ENV);
  const __dirname = path.resolve();

  console.log(path.join(__dirname, "/frontend/dist"));
  app.use(express.static(path.join(__dirname, "/frontend/dist")));

  app.get("*", (req, res) =>
    res.sendFile(path.resolve(__dirname, "frontend", "dist", "index.html"))
  );
} else {
  app.get("/", (req, res) => {
    res.send("API is running....");
  });
}

app.use(notFound);
app.use(errorHandler);

app.listen(port, () => console.log(`Server started on port ${port}`));

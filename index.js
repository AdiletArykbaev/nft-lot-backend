import express from "express";
import mongoose from "mongoose";
import * as AdminController from "./Controllers/AdminController.js";
import checkAuth from "./Utils/checkAuth.js";
import { loginValidator } from "./Validations/validation.js";
import multer from "multer";
import dotenv from "dotenv";
dotenv.config();

const app = express();

const PORT = process.env.APP;
const dbLink = process.env.USER_STRING;
const storage = multer.diskStorage({
  destination: (req, file, callback) => {
    callback(null, "uploads");
  },
  filename: (req, file, callback) => {
    callback(null, file.originalname);
  },
});

const upload = multer({ storage });

app.use(express.json());

app.get("/", (req, res) => {
  res.send("hello express");
});

mongoose
  .connect(dbLink)
  .then(() => {
    console.log("db ok");
  })
  .catch((err) => {
    console.log("db error", err);
  });

//   mongoose.admin.insertOne({fullname:"admin",})
app.post("/login", loginValidator, AdminController.login);
app.post("/createAdmin", loginValidator, AdminController.register);
app.post("/uploadFile", checkAuth, upload.single("image"), (req, res) => {
  res.json({
    url: `/uploads/${req.file.originalname}`,
  });
});
app.use("/uploads", express.static("uploads"));

app.listen(PORT, (err) => {
  if (err) {
    console.log(err);
  }
  console.log(`app running on port ${PORT}`);
  console.log(process.env.USER_STRING);
});

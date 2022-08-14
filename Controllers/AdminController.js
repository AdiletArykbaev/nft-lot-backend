import AdminModel from "../Models/Admin.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { validationResult } from "express-validator";

export const login = async (req, res) => {
  try {
    const user = await AdminModel.findOne({ email: req.body.email });
    if (!user) {
      return res.status(404).json({
        message: "user not found",
      });
    }

    const isValidPass = await bcrypt.compare(
      req.body.password,
      user._doc.passwordHash
    );
    if (!isValidPass) {
      return res.status(403).json({
        message: "неверный пароль или логин!",
      });
    }

    const token = jwt.sign(
      {
        _id: user._id,
      },
      "adilet",
      {
        expiresIn: "30d",
      }
    );

    const { passwordHash, ...userData } = user._doc;

    res.json({
      userData,
      token,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      message: "не удалось авторизоваться",
    });
  }
};
export const register = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json(errors.array());
    }
    const password = req.body.password;
    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(password, salt);
    const doc = new AdminModel({
      fullname: req.body.fullname,
      passwordHash: hash,
    });

    const user = await doc.save();

    const token = jwt.sign(
      {
        _id: user._id,
        fullname: user.fullname,
      },
      "adilet",
      {
        expiresIn: "30d",
      }
    );

    const { passwordHash, ...userData } = user._doc;

    res.json({
      userData,
      token,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      message: "не удалось зарегистрироваться",
    });
  }
};

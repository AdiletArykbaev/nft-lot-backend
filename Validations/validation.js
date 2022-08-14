import { body } from "express-validator";

export const loginValidator = [
  body(
    "fullname",
    "неверный формат почты,пожалуйста введите правильную почту!"
  ),
  body("password", "Пароль должен содержать минимум 5 символов").isLength({
    min: 5,
  }),
];

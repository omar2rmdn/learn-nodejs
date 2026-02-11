import { body } from "express-validator";

const userValidation = [
  body("name")
    .notEmpty()
    .withMessage("name is required")
    .isLength({ min: 2, max: 100 })
    .withMessage("name must be between 2 and 100 characters"),
  body("email")
    .notEmpty()
    .withMessage("email is required")
    .isEmail()
    .withMessage("email must be a valid email address"),
  body("password")
    .notEmpty()
    .withMessage("password is required")
    .isLength({ min: 6 })
    .withMessage("password must be at least 6 characters"),
  body("role")
    .optional()
    .isIn(["user", "admin"])
    .withMessage("role must be either user or admin"),
  body("avatar")
    .optional()
    .isString()
    .withMessage("avatar must be a string url"),
];

export { userValidation };

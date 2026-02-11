import { body } from "express-validator";

const courseValidation = [
  body("title")
    .notEmpty()
    .withMessage("title is required")
    .isLength({ min: 3, max: 100 })
    .withMessage("title must be between 3 and 100 characters"),
  body("price")
    .notEmpty()
    .withMessage("price is required")
    .isNumeric()
    .withMessage("price must be a number")
    .custom((value) => value > 0)
    .withMessage("price must be greater than 0"),
];

export { courseValidation };

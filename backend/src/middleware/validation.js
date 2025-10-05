const { body } = require("express-validator");

const employeeValidationRules = [
  body("name")
    .trim()
    .notEmpty()
    .withMessage("Name is required")
    .isLength({ min: 2, max: 100 })
    .withMessage("Name must be between 2 and 100 characters"),

  body("email")
    .trim()
    .notEmpty()
    .withMessage("Email is required")
    .isEmail()
    .withMessage("Invalid email format")
    .normalizeEmail(),

  body("position")
    .trim()
    .notEmpty()
    .withMessage("Position is required")
    .isLength({ min: 2, max: 100 })
    .withMessage("Position must be between 2 and 100 characters"),
];

module.exports = {
  employeeValidationRules,
};

const express = require("express");
const router = express.Router();
const EmployeeController = require("../controller/employeController");
const { employeeValidationRules } = require("../middleware/validation");

// GET all employees (with optional search)
router.get("/", EmployeeController.getAllEmployees);

// GET single employee by ID
router.get("/:id", EmployeeController.getEmployeeById);

// POST create new employee
router.post("/", employeeValidationRules, EmployeeController.createEmployee);

// PUT update employee
router.put("/:id", employeeValidationRules, EmployeeController.updateEmployee);

// DELETE employee
router.delete("/:id", EmployeeController.deleteEmployee);

module.exports = router;

const Employee = require("../models/employeeModel");
const { validationResult } = require("express-validator");

class EmployeeController {
  // Get all employees with optional search
  static async getAllEmployees(req, res) {
    try {
      const { search } = req.query;
      const employees = await Employee.findAll(search || "");

      res.json({
        success: true,
        count: employees.length,
        data: employees,
      });
    } catch (error) {
      console.error("Error fetching employees:", error);
      res.status(500).json({
        success: false,
        error: "Failed to fetch employees",
        message: error.message,
      });
    }
  }

  // Get single employee by ID
  static async getEmployeeById(req, res) {
    try {
      const { id } = req.params;
      const employee = await Employee.findById(id);

      if (!employee) {
        return res.status(404).json({
          success: false,
          error: "Employee not found",
        });
      }

      res.json({
        success: true,
        data: employee,
      });
    } catch (error) {
      console.error("Error fetching employee:", error);
      res.status(500).json({
        success: false,
        error: "Failed to fetch employee",
        message: error.message,
      });
    }
  }

  // Create new employee
  static async createEmployee(req, res) {
    try {
      // Check validation errors
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({
          success: false,
          errors: errors.array(),
        });
      }

      const { name, email, position } = req.body;

      // Check if email already exists
      const existingEmployee = await Employee.findByEmail(email);
      if (existingEmployee) {
        return res.status(400).json({
          success: false,
          error: "Email already exists",
        });
      }

      const newEmployee = await Employee.create({ name, email, position });

      res.status(201).json({
        success: true,
        message: "Employee created successfully",
        data: newEmployee,
      });
    } catch (error) {
      console.error("Error creating employee:", error);
      res.status(500).json({
        success: false,
        error: "Failed to create employee",
        message: error.message,
      });
    }
  }

  // Update employee
  static async updateEmployee(req, res) {
    try {
      // Check validation errors
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({
          success: false,
          errors: errors.array(),
        });
      }

      const { id } = req.params;
      const { name, email, position } = req.body;

      // Check if employee exists
      const employee = await Employee.findById(id);
      if (!employee) {
        return res.status(404).json({
          success: false,
          error: "Employee not found",
        });
      }

      // Check if email is being changed and if it already exists
      if (email !== employee.email) {
        const existingEmployee = await Employee.findByEmail(email);
        if (existingEmployee) {
          return res.status(400).json({
            success: false,
            error: "Email already exists",
          });
        }
      }

      const updatedEmployee = await Employee.update(id, {
        name,
        email,
        position,
      });

      res.json({
        success: true,
        message: "Employee updated successfully",
        data: updatedEmployee,
      });
    } catch (error) {
      console.error("Error updating employee:", error);
      res.status(500).json({
        success: false,
        error: "Failed to update employee",
        message: error.message,
      });
    }
  }

  // Delete employee
  static async deleteEmployee(req, res) {
    try {
      const { id } = req.params;

      // Check if employee exists
      const employee = await Employee.findById(id);
      if (!employee) {
        return res.status(404).json({
          success: false,
          error: "Employee not found",
        });
      }

      await Employee.delete(id);

      res.json({
        success: true,
        message: "Employee deleted successfully",
      });
    } catch (error) {
      console.error("Error deleting employee:", error);
      res.status(500).json({
        success: false,
        error: "Failed to delete employee",
        message: error.message,
      });
    }
  }
}

module.exports = EmployeeController;

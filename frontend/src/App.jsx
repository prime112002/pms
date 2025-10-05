import React, { useState, useEffect } from "react";
import { employeeService } from "./services/api";
import EmployeeList from "./components/EmployeeList";
import EmployeeForm from "./components/EmployeeForm";
import Modal from "./components/Modal";

function App() {
  const [employees, setEmployees] = useState([]);
  const [filteredEmployees, setFilteredEmployees] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [editingEmployee, setEditingEmployee] = useState(null);
  const [alert, setAlert] = useState(null);

  // Fetch employees on component mount
  useEffect(() => {
    fetchEmployees();
  }, []);

  // Filter employees when search term changes
  useEffect(() => {
    if (searchTerm.trim()) {
      const filtered = employees.filter(
        (emp) =>
          emp.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          emp.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
          emp.position.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setFilteredEmployees(filtered);
    } else {
      setFilteredEmployees(employees);
    }
  }, [searchTerm, employees]);

  const fetchEmployees = async () => {
    setIsLoading(true);
    try {
      const response = await employeeService.getAllEmployees();
      setEmployees(response.data);
      setFilteredEmployees(response.data);
    } catch (error) {
      showAlert("Failed to fetch employees", "error");
      console.error("Error:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const showAlert = (message, type = "success") => {
    setAlert({ message, type });
    setTimeout(() => setAlert(null), 5000);
  };

  const handleAddEmployee = () => {
    setEditingEmployee(null);
    setShowModal(true);
  };

  const handleEditEmployee = (employee) => {
    setEditingEmployee(employee);
    setShowModal(true);
  };

  const handleDeleteEmployee = async (employee) => {
    if (!window.confirm(`Are you sure you want to delete ${employee.name}?`)) {
      return;
    }

    try {
      await employeeService.deleteEmployee(employee.id);
      showAlert("Employee deleted successfully", "success");
      fetchEmployees();
    } catch (error) {
      showAlert(error.error || "Failed to delete employee", "error");
      console.error("Error:", error);
    }
  };

  const handleSubmitEmployee = async (formData) => {
    setIsSubmitting(true);
    try {
      if (editingEmployee) {
        await employeeService.updateEmployee(editingEmployee.id, formData);
        showAlert("Employee updated successfully", "success");
      } else {
        await employeeService.createEmployee(formData);
        showAlert("Employee added successfully", "success");
      }
      setShowModal(false);
      setEditingEmployee(null);
      fetchEmployees();
    } catch (error) {
      const errorMessage =
        error.error || error.errors?.[0]?.msg || "Operation failed";
      showAlert(errorMessage, "error");
      console.error("Error:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setEditingEmployee(null);
  };

  return (
    <div className="app-container">
      <header className="header">
        <h1>👥 Employee Management System</h1>
        <p>Manage your team efficiently</p>
      </header>

      <main className="main-content">
        {alert && (
          <div className={`alert alert-${alert.type}`}>
            <span>{alert.type === "success" ? "✓" : "⚠"}</span>
            <span>{alert.message}</span>
          </div>
        )}

        <div className="controls">
          <input
            type="text"
            className="search-bar"
            placeholder="🔍 Search by name, email, or position..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <button className="btn btn-primary" onClick={handleAddEmployee}>
            ➕ Add Employee
          </button>
        </div>

        <div className="stats">
          <div className="stats-item">
            <span>📊 Total Employees:</span>
            <strong>{employees.length}</strong>
          </div>
          {searchTerm && (
            <div className="stats-item">
              <span>🔍 Search Results:</span>
              <strong>{filteredEmployees.length}</strong>
            </div>
          )}
        </div>

        <EmployeeList
          employees={filteredEmployees}
          onEdit={handleEditEmployee}
          onDelete={handleDeleteEmployee}
          isLoading={isLoading}
        />
      </main>

      <Modal
        isOpen={showModal}
        onClose={handleCloseModal}
        title={editingEmployee ? "Edit Employee" : "Add New Employee"}
      >
        <EmployeeForm
          employee={editingEmployee}
          onSubmit={handleSubmitEmployee}
          onCancel={handleCloseModal}
          isLoading={isSubmitting}
        />
      </Modal>
    </div>
  );
}

export default App;

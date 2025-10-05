import React from "react";

const EmployeeList = ({ employees, onEdit, onDelete, isLoading }) => {
  if (isLoading) {
    return (
      <div className="loading">
        <div className="spinner"></div>
        <p>Loading employees...</p>
      </div>
    );
  }

  if (employees.length === 0) {
    return (
      <div className="empty-state">
        <div className="empty-state-icon">👥</div>
        <h3>No Employees Found</h3>
        <p>Start by adding your first employee using the button above.</p>
      </div>
    );
  }

  return (
    <div className="table-container">
      <table className="employee-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Email</th>
            <th>Position</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {employees.map((employee) => (
            <tr key={employee.id}>
              <td>{employee.id}</td>
              <td>{employee.name}</td>
              <td>{employee.email}</td>
              <td>{employee.position}</td>
              <td>
                <div className="action-buttons">
                  <button
                    className="btn btn-edit"
                    onClick={() => onEdit(employee)}
                  >
                    ✏️ Edit
                  </button>
                  <button
                    className="btn btn-delete"
                    onClick={() => onDelete(employee)}
                  >
                    🗑️ Delete
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default EmployeeList;

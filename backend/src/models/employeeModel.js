const { runQuery, getQuery, allQuery } = require("../config/database");

class Employee {
  static async create(employeeData) {
    const { name, email, position } = employeeData;
    const query = `
      INSERT INTO employees (name, email, position)
      VALUES (?, ?, ?)
    `;
    const result = await runQuery(query, [name, email, position]);
    return this.findById(result.id);
  }

  static async findAll(searchTerm = "") {
    let query = "SELECT * FROM employees";
    let params = [];

    if (searchTerm) {
      query += " WHERE name LIKE ? OR email LIKE ? OR position LIKE ?";
      const searchPattern = `%${searchTerm}%`;
      params = [searchPattern, searchPattern, searchPattern];
    }

    query += " ORDER BY created_at DESC";
    return await allQuery(query, params);
  }

  static async findById(id) {
    const query = "SELECT * FROM employees WHERE id = ?";
    return await getQuery(query, [id]);
  }

  static async findByEmail(email) {
    const query = "SELECT * FROM employees WHERE email = ?";
    return await getQuery(query, [email]);
  }

  static async update(id, employeeData) {
    const { name, email, position } = employeeData;
    const query = `
      UPDATE employees 
      SET name = ?, email = ?, position = ?, updated_at = CURRENT_TIMESTAMP
      WHERE id = ?
    `;
    await runQuery(query, [name, email, position, id]);
    return this.findById(id);
  }

  static async delete(id) {
    const query = "DELETE FROM employees WHERE id = ?";
    const result = await runQuery(query, [id]);
    return result.changes > 0;
  }

  static async count() {
    const query = "SELECT COUNT(*) as count FROM employees";
    const result = await getQuery(query);
    return result.count;
  }
}

module.exports = Employee;

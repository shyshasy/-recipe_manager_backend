import db from '../config/db.js';

class Category {
  static async getAllCategories() {
    const [results] = await db.query('SELECT * FROM categories');
    return results;
  }

  static async getCategoryById(id) {
    const [results] = await db.query(
      'SELECT * FROM categories WHERE categorie_id = ?',
      [id]
    );
    return results.length > 0 ? results[0] : null;
  }

  static async createCategory(name) {
    const [result] = await db.query(
      'INSERT INTO categories (name) VALUES (?)',
      [name]
    );
    return result.insertId;
  }

  static async updateCategory(id, name) {
    const [result] = await db.query(
      'UPDATE categories SET name = ? WHERE categorie_id = ?',
      [name, id]
    );
    return result.affectedRows;
  }

  static async deleteCategory(id) {
    const [result] = await db.query(
      'DELETE FROM categories WHERE categorie_id = ?',
      [id]
    );
    return result.affectedRows;
  }
}

export default Category;

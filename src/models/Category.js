import db from "../config/db.js";

class Category {
  static async getAllCategories() {
    const [results] = await db.query("SELECT * FROM categories");
    return results;
  }

  static async getCategoryById(id) {
    const [results] = await db.query(
      "SELECT * FROM categories WHERE categorie_id = ?",
      [id]
    );
    return results.length > 0 ? results[0] : null;
  }

  static async createCategory(title) {
    const [result] = await db.query(
      "INSERT INTO categories (title) VALUES (?)",
      [title]
    );
    return result.insertId;
  }

  static async updateCategory(id, title) {
    const [result] = await db.query(
      "UPDATE categories SET title = ? WHERE categorie_id = ?",
      [title, id]
    );
    return result.affectedRows;
  }

  static async deleteCategory(id) {
    const [result] = await db.query(
      "DELETE FROM categories WHERE categorie_id = ?",
      [id]
    );
    return result.affectedRows;
  }
}

export default Category;

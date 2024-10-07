import db from "../config/db.js";

class Recipe {
  static async getAllRecipes() {
    const [results] = await db.query("SELECT * FROM recipes");
    return results;
  }

  static async getRecipeById(id) {
    const [results] = await db.query("SELECT * FROM recipes WHERE id = ?", [
      id,
    ]);
    return results.length > 0 ? results[0] : null;
  }

  static async createRecipe(title, ingredients, id_categorie, type) {
    const [result] = await db.query(
      "INSERT INTO recipes (title, ingredients, id_categorie, type) VALUES (?, ?, ?, ?)",
      [title, ingredients, id_categorie, type]
    );
    return result.insertId;
  }

  static async updateRecipe(id, title, ingredients, id_categorie, type) {
    const [result] = await db.query(
      "UPDATE recipes SET title = ?, ingredients = ?, id_categorie = ?, type = ? WHERE id = ?",
      [title, ingredients, id_categorie, type, id]
    );
    return result.affectedRows;
  }

  static async deleteRecipe(id) {
    const [result] = await db.query("DELETE FROM recipes WHERE id = ?", [id]);
    return result.affectedRows;
  }
}

export default Recipe;

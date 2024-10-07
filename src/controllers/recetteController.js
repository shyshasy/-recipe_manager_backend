import { body, param, validationResult } from "express-validator";
import Recipe from "../models/Recipe.js";

const handleValidationErrors = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  next();
};

export const getAllRecipes = async (req, res) => {
  try {
    const recipes = await Recipe.getAllRecipes();
    res.json(recipes);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const getRecipeById = [
  param("id").isInt({ min: 1 }).withMessage("ID must be a positive integer"),
  handleValidationErrors,
  async (req, res) => {
    const { id } = req.params;
    try {
      const recipe = await Recipe.getRecipeById(id);
      if (!recipe) {
        return res.status(404).json({ message: "Recipe not found" });
      }
      res.json(recipe);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  },
];

export const createRecipe = [
  body("title").isString().notEmpty().withMessage("Title is required"),
  body("ingredients")
    .isString()
    .notEmpty()
    .withMessage("Ingredients are required"),
  body("id_categorie")
    .isInt({ min: 1 })
    .withMessage("id_categorie must be a valid integer"),
  body("type").isString().notEmpty().withMessage("Type is required"),
  handleValidationErrors,
  async (req, res) => {
    const { title, ingredients, id_categorie, type } = req.body; // Ajout de type ici
    try {
      const id = await Recipe.createRecipe(
        title,
        ingredients,
        id_categorie,
        type
      ); // Passer type ici
      res.status(201).json({
        message: "Recipe successfully created!",
        id,
        title,
        ingredients,
        id_categorie,
        type, // Inclure type dans la réponse
      });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  },
];

export const updateRecipe = [
  param("id").isInt({ min: 1 }).withMessage("ID must be a positive integer"),
  body("title").optional().isString().withMessage("Title must be a string"),
  body("ingredients")
    .optional()
    .isString()
    .withMessage("Ingredients must be a string"),
  body("id_categorie")
    .optional()
    .isInt({ min: 1 })
    .withMessage("id_categorie must be a valid integer"),
  body("type").optional().isString().withMessage("Type must be a string"), // Ajout de type ici
  handleValidationErrors,
  async (req, res) => {
    const { id } = req.params;
    const { title, ingredients, id_categorie, type } = req.body; // Inclure type
    try {
      const affectedRows = await Recipe.updateRecipe(
        id,
        title,
        ingredients,
        id_categorie,
        type // Passer type ici
      );
      if (affectedRows === 0) {
        return res.status(404).json({ message: "Recipe not found" });
      }
      res.json({ message: "Recipe updated successfully" });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  },
];

export const deleteRecipe = [
  param("id").isInt({ min: 1 }).withMessage("ID must be a positive integer"),
  handleValidationErrors,
  async (req, res) => {
    const { id } = req.params;
    try {
      const affectedRows = await Recipe.deleteRecipe(id);
      if (affectedRows === 0) {
        return res.status(404).json({ message: "Recipe not found" });
      }
      res.json({ message: "Recipe deleted successfully" });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  },
];

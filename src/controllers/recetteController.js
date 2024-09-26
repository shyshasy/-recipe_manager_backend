import { body, param, validationResult } from 'express-validator';
import Recipe from '../models/recipeModel.js';

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
  param('id').isInt({ min: 1 }).withMessage('ID must be a positive integer'),
  handleValidationErrors,
  async (req, res) => {
    const { id } = req.params;
    try {
      const recipe = await Recipe.getRecipeById(id);
      if (!recipe) {
        return res.status(404).json({ message: 'Recipe not found' });
      }
      res.json(recipe);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  },
];

export const createRecipe = [
  body('title').isString().notEmpty().withMessage('Title is required'),
  body('description')
    .isString()
    .notEmpty()
    .withMessage('Description is required'),
  body('date').isDate().withMessage('Date must be a valid date'),
  body('id_categorie')
    .isInt({ min: 1 })
    .withMessage('id_categorie must be a valid integer'),
  handleValidationErrors,
  async (req, res) => {
    const { title, description, date, id_categorie } = req.body;
    try {
      const id = await Recipe.createRecipe(
        title,
        description,
        date,
        id_categorie
      );
      res.status(201).json({
        message: 'Recipe successfully created!',
        id,
        title,
        description,
        date,
        id_categorie,
      });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  },
];

export const updateRecipe = [
  param('id').isInt({ min: 1 }).withMessage('ID must be a positive integer'),
  body('title').optional().isString().withMessage('Title must be a string'),
  body('description')
    .optional()
    .isString()
    .withMessage('Description must be a string'),
  body('date').optional().isDate().withMessage('Date must be a valid date'),
  body('id_categorie')
    .optional()
    .isInt({ min: 1 })
    .withMessage('id_categorie must be a valid integer'),
  handleValidationErrors,
  async (req, res) => {
    const { id } = req.params;
    const { title, description, date, id_categorie } = req.body;
    try {
      const affectedRows = await Recipe.updateRecipe(
        id,
        title,
        description,
        date,
        id_categorie
      );
      if (affectedRows === 0) {
        return res.status(404).json({ message: 'Recipe not found' });
      }
      res.json({ message: 'Recipe updated successfully' });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  },
];

export const deleteRecipe = [
  param('id').isInt({ min: 1 }).withMessage('ID must be a positive integer'),
  handleValidationErrors,
  async (req, res) => {
    const { id } = req.params;
    try {
      const affectedRows = await Recipe.deleteRecipe(id);
      if (affectedRows === 0) {
        return res.status(404).json({ message: 'Recipe not found' });
      }
      res.json({ message: 'Recipe deleted successfully' });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  },
];

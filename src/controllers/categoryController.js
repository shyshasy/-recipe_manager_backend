// categoryController.js
import { body, param, validationResult } from 'express-validator';
import Category from '../models/categoryModel.js'; // On utilise la classe Category avec méthodes statiques

// Middleware de validation des erreurs
const handleValidationErrors = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  next();
};

// Récupérer toutes les catégories
export const getAllCategories = async (req, res) => {
  try {
    const categories = await Category.getAllCategories();
    res.json(categories);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Récupérer une catégorie par ID avec validation de l'ID
export const getCategoryById = [
  param('id').isInt({ min: 1 }).withMessage('ID must be a positive integer'), // Validation améliorée pour s'assurer que l'ID est un entier positif
  handleValidationErrors,
  async (req, res) => {
    const { id } = req.params;
    try {
      const category = await Category.getCategoryById(id);
      if (!category) {
        return res.status(404).json({ message: 'Category not found' });
      }
      res.json(category);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  },
];

// Créer une nouvelle catégorie avec validation des champs
export const createCategory = [
  body('name')
    .isString()
    .withMessage('Name must be a string')
    .notEmpty()
    .withMessage('Name is required'),
  handleValidationErrors,
  async (req, res) => {
    const { name } = req.body;
    try {
      const id = await Category.createCategory(name);
      res.status(201).json({
        message: 'Category successfully created!',
        id,
        name,
      });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  },
];

// Mettre à jour une catégorie existante avec validation
export const updateCategory = [
  param('id').isInt({ min: 1 }).withMessage('ID must be a positive integer'),
  body('name').optional().isString().withMessage('Name must be a string'),
  handleValidationErrors,
  async (req, res) => {
    const { id } = req.params;
    const { name } = req.body;
    try {
      const affectedRows = await Category.updateCategory(id, name);
      if (affectedRows === 0) {
        return res.status(404).json({ message: 'Category not found' });
      }
      res.json({ message: 'Category updated successfully' });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  },
];

// Supprimer une catégorie avec validation de l'ID
export const deleteCategory = [
  param('id').isInt({ min: 1 }).withMessage('ID must be a positive integer'),
  handleValidationErrors,
  async (req, res) => {
    const { id } = req.params;
    try {
      const affectedRows = await Category.deleteCategory(id);
      if (affectedRows === 0) {
        return res.status(404).json({ message: 'Category not found' });
      }
      res.json({ message: 'Category deleted successfully' });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  },
];

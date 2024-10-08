import { body, param, validationResult } from "express-validator";
import Category from "../models/Category.js";

const handleValidationErrors = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  next();
};

// Vérification de l'unicité du titre dans la base de données
const checkUniqueTitle = async (title, { req }) => {
  const existingCategory = await Category.findCategoryByTitle(title);
  if (existingCategory) {
    throw new Error("Title must be unique");
  }
};

export const getAllCategories = async (req, res) => {
  try {
    const categories = await Category.getAllCategories();
    res.json(categories);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const getCategoryById = [
  param("id").isInt({ min: 1 }).withMessage("ID must be a positive integer"),
  handleValidationErrors,
  async (req, res) => {
    const { id } = req.params;
    try {
      const category = await Category.getCategoryById(id);
      if (!category) {
        return res.status(404).json({ message: "Category not found" });
      }
      res.json(category);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  },
];

export const createCategory = [
  body("title")
    .isString()
    .withMessage("Title must be a string")
    .notEmpty()
    .withMessage("Title is required")
    .isLength({ max: 100 })
    .withMessage("Title must not exceed 100 characters")
    .custom(checkUniqueTitle), // Vérification de l'unicité
  handleValidationErrors,
  async (req, res) => {
    const { title } = req.body;
    try {
      const id = await Category.createCategory(title);
      res.status(201).json({
        message: "Category successfully created!",
        id,
        title,
      });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  },
];

export const updateCategory = [
  param("id").isInt({ min: 1 }).withMessage("ID must be a positive integer"),
  body("title")
    .optional()
    .isString()
    .withMessage("Title must be a string")
    .isLength({ max: 100 })
    .withMessage("Title must not exceed 100 characters")
    .custom(async (title, { req }) => {
      // Vérification d'unicité uniquement si un titre est fourni
      if (title) {
        const existingCategory = await Category.findCategoryByTitle(title);
        if (existingCategory && existingCategory.id !== parseInt(req.params.id)) {
          throw new Error("Title must be unique");
        }
      }
    }),
  handleValidationErrors,
  async (req, res) => {
    const { id } = req.params;
    const { title } = req.body;
    try {
      const affectedRows = await Category.updateCategory(id, title);
      if (affectedRows === 0) {
        return res.status(404).json({ message: "Category not found" });
      }
      res.json({ message: "Category updated successfully" });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  },
];

export const deleteCategory = [
  param("id").isInt({ min: 1 }).withMessage("ID must be a positive integer"),
  handleValidationErrors,
  async (req, res) => {
    const { id } = req.params;
    try {
      const affectedRows = await Category.deleteCategory(id);
      if (affectedRows === 0) {
        return res.status(404).json({ message: "Category not found" });
      }
      res.json({ message: "Category deleted successfully" });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  },
];

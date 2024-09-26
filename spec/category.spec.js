import Category from '../src/models/categoryModel.js';

describe('Category tests', () => {
  let categoryId = null;

  it('can be created', async () => {
    const category = { name: 'Desserts' };
    const result = await Category.createCategory(category.name);
    expect(result).not.toBeNull();
    categoryId = result;
  });

  it('can not be created with invalid data', async () => {
    try {
      const category = { name: null };
      await Category.createCategory(category.name);
    } catch (error) {
      expect(error.message).toMatch(/Column 'name' cannot be null/);
    }
  });

  it('can get all categories', async () => {
    const getAll = await Category.getAllCategories();
    expect(getAll).not.toBeNull();
    expect(getAll.length).toBeGreaterThan(0);
  });

  it('can get a category by id', async () => {
    const getCategory = await Category.getCategoryById(categoryId);
    expect(getCategory).not.toBeNull();
    expect(getCategory.name).toBe('Desserts');
  });

  it('can be updated', async () => {
    const updatedCategory = { name: 'Sweets' };
    const result = await Category.updateCategory(
      categoryId,
      updatedCategory.name
    );
    expect(result).toBe(1);
    const category = await Category.getCategoryById(categoryId);
    expect(category.name).toBe('Sweets');
  });

  it('can delete a category', async () => {
    await Category.deleteCategory(categoryId);
    const deletedCategory = await Category.getCategoryById(categoryId);
    expect(deletedCategory).toBeNull();
  });
});

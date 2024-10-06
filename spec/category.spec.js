import Category from '../src/models/Category.js';

describe('Category tests', () => {
  let categoryId = null;

  it('can be created', async () => {
    const category = { title: 'Desserts' }; // Updated from name to title
    const result = await Category.createCategory(category.title);
    expect(result).not.toBeNull();
    categoryId = result;
  });

  it('can not be created with invalid data', async () => {
    try {
      const category = { title: null }; // Updated from name to title
      await Category.createCategory(category.title);
    } catch (error) {
      expect(error.message).toMatch(/Column 'title' cannot be null/); // Updated error message
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
    expect(getCategory.title).toBe('Desserts'); // Updated from name to title
  });

  it('can be updated', async () => {
    const updatedCategory = { title: 'Sweets' }; // Updated from name to title
    const result = await Category.updateCategory(
      categoryId,
      updatedCategory.title // Updated from name to title
    );
    expect(result).toBe(1);
    const category = await Category.getCategoryById(categoryId);
    expect(category.title).toBe('Sweets'); // Updated from name to title
  });

  it('can delete a category', async () => {
    await Category.deleteCategory(categoryId);
    const deletedCategory = await Category.getCategoryById(categoryId);
    expect(deletedCategory).toBeNull();
  });
});

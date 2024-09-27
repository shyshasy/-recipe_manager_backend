import Recipe from '../src/models/recipeModel.js';

describe('Recipe tests', () => {
  let recipeId = null;

  it('can create a recipe', async () => {
    const recipe = {
      title: 'crepe',
      description: 'dessert',
      id_categorie: 1,
    };
    const result = await Recipe.createRecipe(
      recipe.title,
      recipe.description,
      recipe.id_categorie
    );

    expect(result).not.toBeNull();
    recipeId = result;
  });

  it('cannot create a recipe with null title', async () => {
    try {
      const recipe = {
        title: null,
        description: 'dessert',
        id_categorie: 1,
      };
      await Recipe.createRecipe(
        recipe.title,
        recipe.description,
        recipe.id_categorie
      );
    } catch (error) {
      expect(error).toBeDefined();
    }
  });

  it('can get all recipes', async () => {
    const getAll = await Recipe.getAllRecipes();
    expect(Array.isArray(getAll)).toBe(true);
    expect(getAll.length).toBeGreaterThan(0);
  });

  it('can get a recipe by id', async () => {
    const recipe = await Recipe.getRecipeById(recipeId);
    expect(recipe).not.toBeNull();
    expect(recipe.id).toBe(recipeId);
  });

  it('can update a recipe', async () => {
    const updatedRecipe = {
      title: 'Updated Title',
      description: 'Updated Description',
      id_categorie: 2,
    };

    const result = await Recipe.updateRecipe(
      recipeId,
      updatedRecipe.title,
      updatedRecipe.description,
      updatedRecipe.id_categorie
    );

    expect(result).toBeGreaterThan(0);

    const recipe = await Recipe.getRecipeById(recipeId);
    expect(recipe.title).toBe(updatedRecipe.title);
    expect(recipe.description).toBe(updatedRecipe.description);
    expect(recipe.id_categorie).toBe(updatedRecipe.id_categorie);
  });

  it('can delete a recipe', async () => {
    await Recipe.deleteRecipe(recipeId);
    const deletedRecipe = await Recipe.getRecipeById(recipeId);
    expect(deletedRecipe).toBeNull();
  });
});

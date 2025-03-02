const Recipe = require("../models/Recipe");
const mongoose = require("mongoose");

// Get all recipes
const getAllRecipes = async (req, res) => {
  const user_id = req.user._id;
  const recipes = await Recipe.find({ userId: user_id }).sort({
    createdAt: -1,
  });
  res.status(200).json(recipes);
};

// Get a single recipe
const getRecipe = async (req, res) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ error: "Invalid recipe id" });
  }
  const recipe = await Recipe.findById(id);
  if (!recipe) {
    return res.status(404).json({ error: "No such recipe" });
  }
  res.status(200).json(recipe);
};

// Create a new recipe
const createRecipe = async (req, res) => {
  const { name, ingredients, instructions, prepTime, difficulty, imageUrl } =
    req.body;
  let emptyFields = [];
  if (!name) {
    emptyFields.push("name");
  }
  if (!ingredients) {
    emptyFields.push("ingredients");
  }
  if (!instructions) {
    emptyFields.push("instructions");
  }
  if (!prepTime) {
    emptyFields.push("prepTime");
  }
  if (!difficulty) {
    emptyFields.push("difficulty");
  }
  if (emptyFields.length > 0) {
    return res
      .status(400)
      .json({ error: "Please fill in all the fields", emptyFields });
  }
  try {
    const userId = req.user._id;
    const recipe = await Recipe.create({
      userId,
      name,
      ingredients,
      instructions,
      prepTime,
      difficulty,
      imageUrl,
    });
    res.status(200).json(recipe);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Delete a recipe
const deleteRecipe = async (req, res) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ error: "Invalid recipe id" });
  }
  const recipe = await Recipe.findOneAndDelete({ _id: id });
  if (!recipe) {
    return res.status(404).json({ error: "No such recipe" });
  }
  res.status(200).json(recipe);
};

// Update a recipe
const updateRecipe = async (req, res) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ error: "Invalid recipe id" });
  }
  const recipe = await Recipe.findOneAndUpdate({ _id: id }, { ...req.body });
  if (!recipe) {
    return res.status(404).json({ error: "No such recipe" });
  }
  res.status(200).json(recipe);
};

// ✅ Get all favorite recipes for the logged-in user
const getFavorites = async (req, res) => {
  try {
    const user = await User.findById(req.user._id).populate("favorites");
    res.status(200).json(user.favorites);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Add a recipe to favorites
const addFavorite = async (req, res) => {
  try {
    const user = await User.findById(req.user._id);
    const recipeId = req.params.id;

    if (!user.favorites.includes(recipeId)) {
      user.favorites.push(recipeId);
      await user.save();
    }

    res.status(200).json(user.favorites);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Remove a recipe from favorites
const removeFavorite = async (req, res) => {
  try {
    const user = await User.findById(req.user._id);
    user.favorites = user.favorites.filter((id) => id.toString() !== req.params.id);
    await user.save();

    res.status(200).json(user.favorites);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

module.exports = {
  getAllRecipes,
  getRecipe,
  createRecipe,
  deleteRecipe,
  updateRecipe,
  getFavorites, 
  addFavorite, 
  removeFavorite 
};

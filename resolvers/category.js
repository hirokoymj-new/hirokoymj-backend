const Category = require("../database/models/category");

module.exports = {
  Query: {
    categories: async (_) => {
      try {
        return await Category.find().sort({ order: 1 });
      } catch (error) {
        console.log(error);
        throw error;
      }
    },
    categoryById: (_, { id }) => {
      const category = Category.findById(id);
      return category;
    },
  },
  Mutation: {
    createCategory: async (_, { input }) => {
      try {
        const newCategory = new Category({ ...input });
        const result = await newCategory.save();
        return result;
      } catch (error) {
        console.log(error);
        throw error;
      }
    },
    updateCategory: async (_, { id, input }) => {
      try {
        const category = await Category.findByIdAndUpdate(
          id,
          { ...input },
          { new: true }
        );
        return category;
      } catch (error) {
        console.log(error);
        throw error;
      }
    },
    deleteCategory: async (_, { id }) => {
      try {
        const category = await Category.findByIdAndDelete(id);
        return category;
      } catch (error) {
        console.log(error);
        throw error;
      }
    },
  },
};

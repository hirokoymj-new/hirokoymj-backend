const Category = require("../database/models/category");
const SubCategory = require("../database/models/subCategory");

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
    subCategories: async (_) => {
      try {
        return await SubCategory.find().sort({ order: 1 });
      } catch (error) {
        console.log(error);
        throw error;
      }
    },
    subCategoryById: (_, { id }) => {
      const subCategory = SubCategory.findById(id);
      return subCategory;
    },
    subCategoryByCategory: async (_, { categoryId }) => {
      try {
        const subCategoryArray = await SubCategory.find({
          category: categoryId,
        }).sort({ order: -1 });
        return subCategoryArray;
      } catch (error) {
        console.log(error);
        throw error;
      }
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
    createSubCategory: async (_, { input }) => {
      try {
        const subCategory = new SubCategory({ ...input });
        const result = await subCategory.save();
        return result;
      } catch (error) {
        console.log(error);
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
    updateSubCategory: async (_, { id, input }) => {
      try {
        const subCategory = await SubCategory.findByIdAndUpdate(
          id,
          { ...input },
          { new: true }
        );
        return subCategory;
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
  // Field Level Resolver
  SubCategory: {
    category: async (parent) => {
      const category = await Category.findById(parent.category);
      return category;
    },
  },
};

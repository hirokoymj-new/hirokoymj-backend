const Category = require("../database/models/category");
const SubCategory = require("../database/models/subCategory");

module.exports = {
  Query: {
    categories: (_) => {
      return Category.find();
    },
    categoryById: (_, { id }) => {
      const category = Category.findById(id);
      return category;
    },
    subCategories: (_) => {
      return SubCategory.find();
    },
    subCategoryById: (_, { id }) => {
      const subCategory = SubCategory.findById(id);
      return subCategory;
    },
    subCategoryByCategory: (_, { categoryId }) => {
      const subCategoryArray = SubCategory.find({ category: categoryId });
      return subCategoryArray;
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

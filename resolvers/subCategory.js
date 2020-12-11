const Category = require("../database/models/category");
const SubCategory = require("../database/models/subCategory");

module.exports = {
  Query: {
    subCategories: async (_) => {
      try {
        return await SubCategory.find().sort({ category: 1 });
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
    createSubCategory: async (_, { input }) => {
      try {
        const subCategory = new SubCategory({ ...input });
        const result = await subCategory.save();
        return result;
      } catch (error) {
        console.log(error);
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
    deleteSubCategory: async (_, { id }) => {
      try {
        const subCategory = await SubCategory.findByIdAndDelete(id);
        return subCategory;
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

const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { combineResolvers } = require("graphql-resolvers");

const Category = require("../database/models/category");
const SubCategory = require("../database/models/subCategory");
const { isAuthenticated } = require("./middleware");

module.exports = {
  Query: {
    categories: (_) => {
      return Category.find();
    },
    category: (_, { id }) => {
      const category = Category.findById(id);
      return category;
    },
    subCategories: (_) => {
      return SubCategory.find();
    },
    subCategory: (_, { id }) => {
      const subCategory = SubCategory.findById(id);
      return subCategory;
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
  },
};

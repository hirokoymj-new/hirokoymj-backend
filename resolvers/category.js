const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { combineResolvers } = require("graphql-resolvers");

const Category = require("../database/models/category");
const SubCategory = require("../database/models/subCategory");
const Topic = require("../database/models/topic");
const { isAuthenticated } = require("./middleware");

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
    topics: (_) => {
      return Topic.find();
    },
    topicById: (_, { id }) => {
      const topic = Topic.findById(id);
      return topic;
    },
    topicByCategory: (_, { categoryId }) => {
      const topicArray = Topic.find({ category: categoryId });
      return topicArray;
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
    createTopic: async (_, { input }) => {
      try {
        const topic = new Topic({ ...input });
        const result = await topic.save();
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
    deleteTopic: async (_, { id }) => {
      try {
        const topic = await Topic.findByIdAndDelete(id);
        return topic;
      } catch (error) {
        console.log(error);
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
  Topic: {
    category: async (parent) => {
      const category = await Category.findById(parent.category);
      return category;
    },
    subCategory: async (parent) => {
      const subCategory = await SubCategory.findById(parent.subCategory);
      return subCategory;
    },
  },
};

const Category = require("../database/models/category");
const SubCategory = require("../database/models/subCategory");
const Topic = require("../database/models/topic");

module.exports = {
  Query: {
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
    createTopic: async (_, { input }) => {
      try {
        const topic = new Topic({ ...input });
        const result = await topic.save();
        return result;
      } catch (error) {
        console.log(error);
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
    updateTopic: async (_, { id, input }) => {
      try {
        const topic = await Topic.findByIdAndUpdate(
          id,
          { ...input },
          { new: true }
        );
        return topic;
      } catch (error) {
        console.log(error);
        throw error;
      }
    },
  },
  // Field Level Resolver
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

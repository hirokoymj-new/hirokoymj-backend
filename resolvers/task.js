const uuid = require("uuid");
const { combineResolvers } = require("graphql-resolvers");

const Task = require("../database/models/task");
const User = require("../database/models/user");
const { isAuthenticated } = require("./middleware");
const _ = require("lodash");
const task = require("../database/models/task");

const taskOrderByEnum = {
  id_ASC: "_id",
  id_DESC: "-_id",
  name_ASC: "name",
  name_DESC: "-name",
  completed_ASC: "completed",
  completed_DESC: "-completed",
  updatedAt_ASC: "updatedAt",
  updatedAt_DESC: "-updatedAt",
  createdAt_ASC: "createdAt",
  createdAt_DESC: "-createdAt",
};

module.exports = {
  Query: {
    tasks: async (_, { cursor, limit = 10, sortBy }) => {
      const query = {};
      if (cursor) {
        query["_id"] = {
          $lt: cursor,
        };
      }
      let tasks = await Task.find(query)
        .sort({ _id: -1 })
        .limit(limit + 1);
      const hasNextPage = tasks.length > limit;
      tasks = hasNextPage ? tasks.slice(0, -1) : tasks;

      const totalCount = await Task.countDocuments();
      return {
        taskFeed: tasks,
        totalCount,
        pageInfo: {
          endCursor: hasNextPage ? tasks[tasks.length - 1].id : null,
          hasNextPage,
        },
      };
    },
    task: combineResolvers(isAuthenticated, async (_, { id }) => {
      try {
        const task = await Task.findById(id);
        return task;
      } catch (error) {
        console.log(error);
        throw error;
      }
    }),
  },
  Mutation: {
    createTask: combineResolvers(
      isAuthenticated,
      async (_, { input }, { email }) => {
        try {
          const user = await User.findOne({ email });
          const task = new Task({ ...input, user: user.id });
          const result = await task.save();
          user.tasks.push(result.id);
          await user.save();
          return result;
        } catch (error) {
          console.log(error);
          throw error;
        }
      }
    ),
  },
  Task: {
    user: async (parent) => {
      const user = await User.findById(parent.user);
      return user;
    },
  },
};

const uuid = require("uuid");
const { combineResolvers } = require("graphql-resolvers");

const Task = require("../database/models/task");
const User = require("../database/models/user");
const { isAuthenticated } = require("./middleware");

module.exports = {
  Query: {
    tasks: combineResolvers(isAuthenticated, async (_) => {
      return Task.find();
    }),
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

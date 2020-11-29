const uuid = require("uuid");
const { combineResolvers } = require("graphql-resolvers");

const Task = require("../database/models/task");
const User = require("../database/models/user");
const { isAuthenticated } = require("./middleware");

module.exports = {
  Query: {
    tasks: () => tasks,
    task: (_, { id }) => tasks.find((task) => task.id === id),
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
    user: (parent) => {
      return users.find((user) => user.id === parent.userId);
      // console.log(parent);
      // const result = [];
      // parent.userId.map((id) => {
      //   const obj = users.find((user) => user.id === id);
      //   result.push(obj);
      // });

      // return result;
    },
  },
};

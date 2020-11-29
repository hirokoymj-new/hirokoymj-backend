const uuid = require("uuid");

//const { tasks, users } = require("../constants");

// Import Task and User model
const Task = require("../database/models/task");
const User = require("../database/models/user");

module.exports = {
  Query: {
    tasks: () => tasks,
    task: (_, { id }) => tasks.find((task) => task.id === id),
  },
  Mutation: {
    createTask: (_, { input }, { email }) => {
      const task = new Task({ ...input });
    },
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

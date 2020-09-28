const uuid = require("uuid");

const { tasks, users } = require("../constants");

module.exports = {
  Query: {
    tasks: () => tasks,
    task: (_, { id }) => tasks.find((task) => task.id === id),
  },
  Mutation: {
    createTask: (_, { input }) => {
      const newTask = {
        ...input,
        id: uuid.v4(),
      };

      tasks.push(newTask);
      return newTask;
    },
  },
  Task: {
    user: (parent) => {
      //return users.find((user) => user.id === parent.userId);
      console.log(parent);
      const result = [];
      parent.userId.map((id) => {
        const obj = users.find((user) => user.id === id);
        result.push(obj);
      });

      return result;
    },
  },
};

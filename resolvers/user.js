const { tasks, users } = require("../constants");

module.exports = {
  Query: {
    users: () => users,
    user: (_, args) => users.find((user) => user.id === args.id),
  },
  Mutation: {},
  User: {
    tasks: ({ id }) => {
      return tasks.filter((task) => task.id === id);
    },
  },
};

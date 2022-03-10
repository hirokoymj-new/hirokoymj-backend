const User = require("../database/models/user");

module.exports = {
  Query: {
    users: async () => {
      try {
        const users = await User.find();
        console.log(users);
        return users;
      } catch (error) {
        console.log(error);
        throw error;
      }
    },
  },
};

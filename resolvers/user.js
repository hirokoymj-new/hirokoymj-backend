const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const User = require("../database/models/user");
const Task = require("../database/models/task");

module.exports = {
  Query: {
    users: (_) => {
      return User.find();
    },
    user: (_, args, { email }) => {
      console.log("===Query user");
      console.log(email);
      if (!email) {
        throw Error("Access Denied. Please login");
      }
      const user = User.findById(args.id);
      return user;
    },
  },
  Mutation: {
    signup: async (_, { input }) => {
      try {
        const user = await User.findOne({ email: input.email });
        if (user) {
          throw new Error("Email already in use");
        }
        console.log("user password", input.password);
        const hashedPassword = await bcrypt.hash(input.password, 12);
        const newUser = new User({ ...input, password: hashedPassword });
        const result = await newUser.save();
        return result;
      } catch (error) {
        console.log(error);
        throw error;
      }
    },
    login: async (_, { input }) => {
      try {
        const user = await User.findOne({ email: input.email });
        if (!user) {
          throw new Error("User not found");
        }
        const isPasswordValid = await bcrypt.compare(
          input.password,
          user.password
        );
        if (!isPasswordValid) {
          throw new Error("Incorrect Password");
        }
        const secret = process.env.JWT_SECRET_KEY || "mysecretkey";
        const token = jwt.sign({ email: user.email }, secret, {
          expiresIn: "1d",
        });
        return { token };
      } catch (error) {
        console.log(error);
        throw error;
      }
    },
  },
  User: {
    tasks: ({ id }) => {
      return tasks.filter((task) => task.id === id);
    },
  },
};

const User = require("../database/models/user");
const { ApolloServerError, ApolloError } = require("apollo-server-errors");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

module.exports = {
  Mutation: {
    async registerUser(_, { registerInput: { username, email, password } }) {
      const oldUser = await User.findOne({ email });

      if (oldUser) {
        throw new ApolloServerError("A user is already registered");
      }
      let encryptedPassword = await bcrypt.hash(password, 10);

      const newUser = new User({
        username: username,
        email: email.toLowerCase(),
        password: encryptedPassword,
      });
      const token = jwt.sign(
        {
          user_id: newUser._id,
          username,
          email,
        },
        "UNSAFE_STRING",
        {
          expiresIn: "2h",
        }
      );

      newUser.token = token;
      const res = await newUser.save();
      return {
        id: res.id,
        ...res._doc,
      };
    },
    async loginUser(_, { loginInput: { email, password } }) {
      const user = await User.findOne({ email });
      if (user && (await bcrypt.compare(password, user.password))) {
        const token = jwt.sign(
          {
            user_id: user._id,
            username: user.username,
            email,
          },
          "UNSAFE_STRING",
          {
            expiresIn: "2h",
          }
        );
        // Attached token to user model that we found above
        user.token = token;
        return {
          id: user.id,
          ...user._doc,
        };
      } else {
        throw new ApolloError("Cannot find a user", "NOT FOUND USER");
      }
    },
  },
  Query: {
    user: async (_, { id }) => {
      const user = await User.findById(id);
      return user;
    },
  },
};

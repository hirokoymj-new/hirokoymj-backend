const { skip } = require("graphql-resolvers");

module.exports.isAuthenticated = (_, __, { email }) => {
  console.log("isAuthenticated");
  if (!email) {
    throw new Error("Access Denied! Please login");
  }
  return skip;
};

const { gql } = require("apollo-server");

const userTypeDefs = require("./user");
const taskTypeDefs = require("./task");
const categoryTypeDefs = require("./category");
const topicTypeDefs = require("./topic");
const weatherTypeDefs = require("./weather");

const typeDefs = gql`
  scalar Date

  type Query {
    _: String
  }
  type Mutation {
    _: String
  }
`;

module.exports = [
  typeDefs,
  userTypeDefs,
  taskTypeDefs,
  categoryTypeDefs,
  topicTypeDefs,
  weatherTypeDefs,
];

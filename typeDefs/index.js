const { gql } = require("apollo-server");

const categoryTypeDefs = require("./category");
const subCategoryTypeDefs = require("./subCategory");
const topicTypeDefs = require("./topic");
const weatherTypeDefs = require("./weather");
const cityTypeDefs = require("./city");
const userTypeDefs = require("./user");

const typeDefs = gql`
  scalar Date
  type Query {
    _: String
  }
  type Mutation {
    _: String
  }
  type PageInfo {
    endCursor: String
    hasNextPage: Boolean
  }
`;

module.exports = [
  typeDefs,
  categoryTypeDefs,
  subCategoryTypeDefs,
  topicTypeDefs,
  weatherTypeDefs,
  cityTypeDefs,
  userTypeDefs,
];

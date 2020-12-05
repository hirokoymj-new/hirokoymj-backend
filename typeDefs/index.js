const { gql } = require("apollo-server");

const userTypeDefs = require("./user");
const taskTypeDefs = require("./task");
const categorytypeDefs = require("./category");

const typeDefs = gql`
  scalar Date

  type Query {
    _: String
  }
  type Mutation {
    _: String
  }
`;

module.exports = [typeDefs, userTypeDefs, taskTypeDefs, categorytypeDefs];

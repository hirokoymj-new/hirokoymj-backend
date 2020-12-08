const { gql } = require("apollo-server");

module.exports = gql`
  extend type Query {
    categories: [Category!]
    categoryById(id: ID!): Category!
  }

  extend type Mutation {
    createCategory(input: createCategoryInput): Category
    updateCategory(id: ID!, input: updateCategoryInput!): Category
    deleteCategory(id: ID!): Category
  }

  type Category {
    id: ID!
    name: String!
    order: Int
    createdAt: Date!
    updatedAt: Date!
  }

  input updateCategoryInput {
    name: String
    order: Int
  }

  input createCategoryInput {
    name: String!
    order: Int
  }
`;

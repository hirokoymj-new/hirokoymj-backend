const { gql } = require("apollo-server-express");

module.exports = gql`
  extend type Query {
    categories: [Category!]
    category(id: ID!): Category!
    subCategories: [SubCategory!]
    subCategory(id: ID!): SubCategory
  }

  extend type Mutation {
    createCategory(input: createCategoryInput): Category
    createSubCategory(input: createSubCategoryInput): SubCategory
  }

  type Category {
    id: ID!
    name: String!
    createdAt: Date!
    updatedAt: Date!
  }

  input createCategoryInput {
    name: String!
  }

  input createSubCategoryInput {
    name: String!
    # category: Category!
  }

  type SubCategory {
    id: ID!
    name: String!
    # category: Category!
  }
`;

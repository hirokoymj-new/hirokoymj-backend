const { gql } = require("apollo-server");

module.exports = gql`
  extend type Query {
    subCategories: [SubCategory!]
    subCategoryById(id: ID!): SubCategory
    subCategoryByCategory(categoryId: ID): [SubCategory!]
  }

  extend type Mutation {
    createSubCategory(input: createSubCategoryInput): SubCategory
    updateSubCategory(id: ID!, input: updateSubCategoryInput!): SubCategory
  }

  input createSubCategoryInput {
    name: String!
    category: ID!
    order: Int
    categoryOrder: Int
  }

  input updateSubCategoryInput {
    name: String
    order: Int
    category: ID
  }

  type SubCategory {
    id: ID!
    name: String!
    order: Int
    category: Category
    createdAt: Date!
    updatedAt: Date!
  }
`;

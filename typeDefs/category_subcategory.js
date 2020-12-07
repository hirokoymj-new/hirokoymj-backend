const { gql } = require("apollo-server");

module.exports = gql`
  extend type Query {
    categories: [Category!]
    categoryById(id: ID!): Category!
    subCategories: [SubCategory!]
    subCategoryById(id: ID!): SubCategory
    subCategoryByCategory(categoryId: ID): [SubCategory!]
  }

  extend type Mutation {
    createCategory(input: createCategoryInput): Category
    updateCategory(id: ID!, input: updateCategoryInput!): Category
    deleteCategory(id: ID!): Category
    createSubCategory(input: createSubCategoryInput): SubCategory
    updateSubCategory(id: ID!, input: updateSubCategoryInput!): SubCategory
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

  input createSubCategoryInput {
    name: String!
    category: ID!
    order: Int
  }

  input updateSubCategoryInput {
    name: String
    order: Int
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

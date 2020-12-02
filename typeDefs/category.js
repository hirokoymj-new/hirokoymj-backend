const { gql } = require("apollo-server-express");

module.exports = gql`
  extend type Query {
    categories: [Category!]
    category(id: ID!): Category!
    subCategories: [SubCategory!]
    subCategory(id: ID!): SubCategory
    subCategoryByCategoryId(categoryId: ID): [SubCategory!]
  }

  extend type Mutation {
    createCategory(input: createCategoryInput): Category
    updateCategory(id: ID!, input: updateCategoryInput!): Category
    createSubCategory(input: createSubCategoryInput): SubCategory
    updateSubCategory(id: ID!, input: updateSubCategoryInput!): SubCategory
  }

  type Category {
    id: ID!
    name: String!
    createdAt: Date!
    updatedAt: Date!
  }

  input updateCategoryInput {
    name: String!
  }

  input createCategoryInput {
    name: String!
  }

  input createSubCategoryInput {
    name: String!
    category: ID!
  }

  input updateSubCategoryInput {
    name: String!
  }

  type SubCategory {
    id: ID!
    name: String!
    category: Category
    createdAt: Date!
    updatedAt: Date!
  }
`;

// Category - SubCatewgory - Topic
// JavaScript - Basic - www.test1.com
// JavaScript - Basic - www.test2.com
// JavaScript - Basic - www.test3.com

// JavaScript - ES6 - www.es6.com
// JavaScript - ES6 - www.es7.com
// JavaScript - ES6 - www.es8.com

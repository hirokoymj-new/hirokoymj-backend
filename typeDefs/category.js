const { gql } = require("apollo-server-express");

module.exports = gql`
  extend type Query {
    categories: [Category!]
    categoryById(id: ID!): Category!
    subCategories: [SubCategory!]
    subCategoryById(id: ID!): SubCategory
    subCategoryByCategory(categoryId: ID): [SubCategory!]
    topics: [Topic!]
    topicById(id: ID!): Topic!
    topicByCategory(categoryId: ID!): [Topic!]
  }

  extend type Mutation {
    createCategory(input: createCategoryInput): Category
    updateCategory(id: ID!, input: updateCategoryInput!): Category
    createSubCategory(input: createSubCategoryInput): SubCategory
    updateSubCategory(id: ID!, input: updateSubCategoryInput!): SubCategory
    createTopic(input: createTopicInput): Topic
    deleteTopic(id: ID!): Topic
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

  input createTopicInput {
    title: String!
    url: String!
    category: ID!
    subCategory: ID!
  }

  type SubCategory {
    id: ID!
    name: String!
    category: Category
    createdAt: Date!
    updatedAt: Date!
  }

  type Topic {
    id: ID!
    title: String!
    url: String!
    category: Category!
    subCategory: SubCategory!
  }
`;

// Category - SubCatewgory - Topic
// JavaScript - Basic - www.test1.com
// JavaScript - Basic - www.test2.com
// JavaScript - Basic - www.test3.com

// JavaScript - ES6 - www.es6.com
// JavaScript - ES6 - www.es7.com
// JavaScript - ES6 - www.es8.com

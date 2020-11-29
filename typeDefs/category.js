const { gql } = require("apollo-server-express");

module.exports = gql`
  extend type Query {
    categories: [Category!]
  }

  extend type Mutation {
    createCategory(input: createCategoryInput): Category
  }

  type Category {
    id: ID!
    name: String!
    # subCategories: [SubCategory!]
    createdAt: Date!
    updatedAt: Date!
  }

  input createCategoryInput {
    name: String!
  }

  # type Topic{
  # 	id: ID
  # 	title: String!
  # 	url: String!
  # 	categoryId: ID
  # 	subCategoryId: ID
  # }

  # type SubCategory {
  #   id: ID!
  #   name: String!
  #   category: Category!
  # }
`;

//shopping, false, hiroko

// Category
// JavaScript

// Category - SubCatewgory - Topic
// JavaScript - Basic - www.test1.com
// JavaScript - Basic - www.test2.com
// JavaScript - Basic - www.test3.com

// JavaScript - ES6 - www.es6.com
// JavaScript - ES6 - www.es7.com
// JavaScript - ES6 - www.es8.com

// JavaScript - Advanced JavaScript

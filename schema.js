const { gql } = require("apollo-server-express");

const typeDefs = gql`
  scalar Date

  type Query {
    tasks: [Task!]
    task(id: ID!): Task!
    users: [User!]
    user: User
  }

  input createTaskInput {
    name: String!
    completed: Boolean!
    userId: ID!
  }

  input signupInput {
    name: String!
    email: String!
    password: String!
  }

  type Mutation {
    createTask(input: createTaskInput): Task
    signup(input: signupInput): User
    login(input: loginInput): Token
  }

  input loginInput {
    email: String!
    password: String!
  }

  type Token {
    token: String!
  }

  type User {
    id: ID!
    name: String!
    email: String!
    tasks: [Task!]
    createdAt: Date!
    updatedAt: Date!
  }

  # type Category{
  # 	id: ID!
  # 	name: String!
  # 	subCategories: [SubCategory!]
  # }

  # type Topic{
  # 	id: ID
  # 	title: String!
  # 	url: String!
  # 	categoryId: ID
  # 	subCategoryId: ID
  # }

  type Task {
    id: ID!
    name: String!
    completed: Boolean!
    user: User!
  }

  # type SubCategory{
  # 	id: ID!
  # 	name: String!
  # 	category: Category!
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

module.exports = typeDefs;

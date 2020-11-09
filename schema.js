const { gql } = require("apollo-server-express");

const typeDefs = gql`
  scalar Date

  type Query {
    tasks: [Task!]
    task(id: ID!): Task!
    users: [User!]
    user(id: ID!): User!
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

  type Task {
    id: ID!
    name: String!
    completed: Boolean!
    user: User!
    # user: [User!]
  }
`;

module.exports = typeDefs;

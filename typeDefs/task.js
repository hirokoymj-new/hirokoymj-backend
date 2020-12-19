const { gql } = require("apollo-server");

module.exports = gql`
  extend type Query {
    tasks(limit: Int, cursor: String, sortBy: TaskOrderByEnum): TaskFeed!
    task(id: ID!): Task!
  }

  extend type Mutation {
    createTask(input: createTaskInput): Task
  }

  type TaskFeed {
    taskFeed: [Task!]
    totalCount: Int!
    pageInfo: PageInfo!
  }

  type PageInfo {
    endCursor: String
    hasNextPage: Boolean
  }

  input createTaskInput {
    name: String!
    completed: Boolean!
  }

  type Task {
    id: ID!
    name: String!
    completed: Boolean!
    user: User!
    createdAt: Date!
    updatedAt: Date!
  }

  enum TaskOrderByEnum {
    id_ASC
    id_DESC
    name_ASC
    name_DESC
    completed_ASC
    completed_DESC
    updatedAt_ASC
    updatedAt_DESC
    createdAt_ASC
    createdAt_DESC
  }
`;

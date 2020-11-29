# Section 4: Building Graphql API

## 16. Field Level Resolver

- Field level resolver is given high priority as compared to query level resolver.

```js
const { tasks, users } = require("./constants");

const typeDefs = gql`
  type Query {
    tasks: [Task!]
  }

  type User {
    id: ID!
    name: String!
    email: String!
    tasks: [Task!]
  }

  type Task {
    id: ID!
    name: String!
    completed: Boolean!
    user: User!
  }
`;

const resolvers = {
  Query: {
    greetings: () => ["Hello", "Hi"],
    tasks: () => tasks,
    task: (_, { id }) => {
      return tasks.find((task) => task.id === id);
    },
  },
  Task: {
    user: ({ userId }) => {
      return users.find((user) => user.id === userId);
    },
  },
};
```

**Output console**

```js
Server listening on PORT: 3001
[
  { id: '1', name: 'Work', completed: false, userId: '3' },
  { id: '2', name: 'Eat', completed: true, userId: '1' },
  { id: '3', name: 'Shopping', completed: true, userId: '4' },
  { id: '4', name: 'Gym', completed: true, userId: '2' }
]
userId 3
userId 1
userId 4
userId 2
```

**Output GQ**

```js
{
  "data": {
    "tasks": [
      {
        "id": "1",
        "name": "test-task",
        "completed": false,
        "user": {
          "id": "3",
          "name": "peter"
        }
      },
      {
        "id": "2",
        "name": "test-task",
        "completed": true,
        "user": {
          "id": "1",
          "name": "kevin"
        }
      },
      {
        "id": "3",
        "name": "test-task",
        "completed": true,
        "user": {
          "id": "4",
          "name": "bob"
        }
      },
      {
        "id": "4",
        "name": "test-task",
        "completed": true,
        "user": {
          "id": "2",
          "name": "john"
        }
      }
    ]
  }
}
```

# Section 4: Building Graphql API

## 17. Get Task By Id Query

```js
const typeDefs = gql`
  type Query {
    tasks: [Task!]
    task(id: ID!): Task!
  }
`;
```

```js
const resolvers = {
  Query: {
    tasks: () => tasks,
    task: (_, args) => tasks.find((task) => task.id === args.id),
  },
};
```

## 19. Create Task Mutation

**Type Definition**

```js
const typeDefs = gql`
  input createTaskInput {
    name: String!
    completed: Boolean!
    userId: ID!
  }

  type Mutation {
    createTask(input: createTaskInput): Task! //return single Task
  }
`;
```

**Resolver**

```js
const resolvers = {
  Mutation: {
    createTask: (_, { input }) => {
      const newTask = {
        ...input,
        id: uuid.v4(),
      };
      tasks.push(newTask);
      return newTask;
    },
  },
};
```

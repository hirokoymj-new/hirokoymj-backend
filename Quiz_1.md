# Quiz - Apollo Server

**Write Resolvers from Type Definitions**
**Q1: What is Resolver?**

**QA:**

````text
A resolver is a function that's responsible for populating the data for a single field in your schema.


Define top-level resolvers
As mentioned above, the resolver for a parent field always executes before the resolvers for that field's children.

**Q1: Write Resolver**

```js
type Query {
  numberSix: Int! # Should always return the number 6 when queried
  numberSeven: Int! # Should always return 7
}
````

**A1: Write Resolver**

```js
const resolvers = {
  Query: {
    numberSix() {
      return 6;
    },
    numberSeven() {
      return 7;
    },
  },
};
```

<hr />

**Q2: Write Resolver**

```js
type User {
  id: ID!
  name: String
}

type Query {
  user(id: ID!): User
}
```

```js
const users = [
  {
    id: "1",
    name: "Elizabeth Bennet",
  },
  {
    id: "2",
    name: "Fitzwilliam Darcy",
  },
];
```

**A2: Write Resolver**

```js
const resolvers = {
  Query: {
    user(parent, args, context, info) {
      return users.find((user) => user.id === args.id);
    },
  },
};
```

<hr />

**Q3: Write Resolvers**

```js
  type Query {
    tasks: [Task!]
    task(id: ID!): Task!
  }
```

**A3:**

```js
const resolvers = {
  Query: {
    tasks: () => tasks,
    task: (_, args) => tasks.find((task) => task.id === args.id),
  },
};
```

<hr />

**Q4: Write Resolvers for below mutation.**

```js
  input createTaskInput {
    name: String!
    completed: Boolean!
    userId: ID!
  }

  type Mutation {
    createTask(input: createTaskInput): Task! //return single Task
  }
```

**A4:**

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

<hr />

## References:

- https://www.apollographql.com/docs/apollo-server/data/resolvers/

- https://www.apollographql.com/docs/tutorial/resolvers/#define-top-level-resolvers

<!--
**Q1:**
```js
````
**A1:**
```js
```
<hr />
**Q1:**
```js
```
**A1:**
```js
```
<hr />
**Q1:**
```js
```
**A1:**
```js
```
<hr />
**Q1:**
```js
```
**A1:**
```js
```
<hr />
**Q1:**
```js
```
**A1:**
```js
```
<hr /> -->

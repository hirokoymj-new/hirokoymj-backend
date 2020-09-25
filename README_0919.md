# Section 4: Building Graphql API

Date: Sat. 09/19/2020
Cource Contents:
Start: 7. Where to find source code?
End: 13.GraphQL Resolvers and Type Modifier

## 9. Schema basics

- A schema to describe the shape of your data graph.
- Schema Definition Language (or SDL)
- A schema defines a collection of types and the relationships between those types.

**Supported types**

- Scalar types
- Object types
- The Query type
- The Mutation type
- Input types

**Scalar types**
Scalar types == primitive type

```text
- Int: A signed 32‐bit integer
- Float: A signed double-precision floating-point value
- String: A UTF‐8 character sequence
- Boolean: true or false
- ID (serialized as a String):
```

**Object types**

```js
type Book {
  title: String
  author: Author
}

type Author {
  name: String
  books: [Book]
}
```

**The Query type**

```js
type Query {
  books: [Book]
  authors: [Author]
}
```

**The Mutation type**

```js
type Mutation {
  addBook(title: String, author: String): Book
}
```

**Input types**
Input types are special object types that allow you to pass objects as arguments to queries and mutations.

```js
type Mutation {
  createPost(post: PostAndMediaInput): Post
}

input PostAndMediaInput {
  title: String
  body: String
  mediaUrls: [String]
}
```

<hr />

## 11. Setup GraphQL Server

```js
npm init -y
npm install express apollo-server-express cors dotenv
npm install -D nodemon
```

**Create an instance of ApolloServer**

```js
// The ApolloServer constructor requires two parameters: your schema
// definition and your set of resolvers.
const apolloServer = new ApolloServer({
  typeDefs,
  resolvers,
});

// localhost:3000/graphql
apolloServer.applyMiddleware({ app, path: "/graphql" });

// localhost:3000
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server listening on PORT: ${PORT}`);
});
```

<hr />

## 13. GraphQL Resolvers and Type Modifier

```js
const typeDefs = gql`
  type Query {
    greetings: [String]!
  }
`;

const resolvers = {
  Query: {
    greetings: () => ["Hello", "Hi"],
  },
};

const apolloServer = new ApolloServer({
  typeDefs,
  resolvers,
});
```

**non-nullable Modifier**

```js
!
```

```js
const typeDefs = gql`
  type Query {
    greetings: [String]!
  }
`;

const resolvers = {
  Query: {
    greetings: () => ["Hello", "Hi"],
  },
};
```

## References:

- https://www.apollographql.com/docs/apollo-server/schema/schema/
- https://www.apollographql.com/docs/apollo-server/v1/servers/express/
- apollographql.com/docs/apollo-server/getting-started/

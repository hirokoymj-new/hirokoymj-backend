# Custom Scalar

https://www.apollographql.com/docs/apollo-server/schema/scalars-enums/

- Default scalar types: Int, Float, String, Boolean and ID
- Custom scalar types (example): Date, JSON, ENUM


## Custom scalar examples (JSON)
1. To define a custom scalar, add it to the schema string.
2. Next, define resolver.

```js
const { ApolloServer, gql } = require('apollo-server');
const GraphQLJSON = require('graphql-type-json');

const schemaString = gql`
  scalar JSON

  type Foo {
    aField: JSON
  }

  type Query {
    foo: Foo
  }
`;

const resolveFunctions = {
  JSON: GraphQLJSON
};

const server = new ApolloServer({ typeDefs: schemaString, resolvers: resolveFunctions });

server.listen().then(({ url }) => {
  console.log(`🚀 Server ready at ${url}`)
});
```

## Custom scalar examples (Date)

0. Install a package
   ```js
	 npm install graphql-iso-date
	 ```

1. Schema

```js
const typeDefs = gql`
	scalar Date

  type User {
    id: ID!
    name: String!
    email: String!
    tasks: [Task!]
    createdAt: Date!
    updatedAt: Date!		
  }	
`
```

2. Resolver:
```js
const { GraphQLDateTime } = require("graphql-iso-date");

const customDateScalarResolver = {
  Date: GraphQLDateTime,
};
```

# Quiz 4- Custom Scalar 




**Q1: Write resolver for custom scalar**

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
// Resolver for custom scalar JSON HERE


const server = new ApolloServer({ typeDefs: schemaString, resolvers: resolveFunctions });

server.listen().then(({ url }) => {
  console.log(`🚀 Server ready at ${url}`)
});
```

**A1:**

```js
const resolveFunctions = {
  JSON: GraphQLJSON
};
```


## References:


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

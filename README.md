# Section 4: Building Graphql API


7. Where to find source code ?


8. What is GraphQL


9. GraphQL Schema Basics


10. GraphQL API Overview


11. Setup GraphQL Server

https://www.apollographql.com/docs/apollo-server/v1/servers/express/

apollographql.com/docs/apollo-server/getting-started/

**Install some packages.**
  
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

apolloServer.applyMiddleware({ app, path: "/graphql" });

```


1.  GraphQL Playground Overview


2.  GraphQL Resolvers and Type Modifier
    
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
end of 09/19
<hr />

14.  User and Task Schema/TypeDefs


15.  Task List Query Resolver


16.  Field Level Resolver


17. Get Task By Id Query

18. Get Users List and Get User By Id Query
5min

19. Create Task Mutation
5min

20. Modularize Resolvers
5min

21. Modularize Schema ( Schema Stiching )
9min

22. MongoDB Connectivity
4min

23. User and Task Mongoose Schema
4min

24. Signup Mutation
13min

25. Custom Date Scalar Type
3min

26. Authentication: Login Mutation
10min

27. Resolver Context


28. Verify Token and Set Auth Context


29. Combine Resolver/ Resolver Middleware


30. UPDATING: Get User By Id


31. UPDATING: Create Task Mutation


32. UPDATING: List Task and Get Task By Id


33. Update/Modify Task Mutation


34. Delete Task Mutation


35. Offset Limit Pagination ( Task List )


36. Offset limit Pagination Vs Cursor Based
Pagination


1.  Cursor Based Pagination ( Task List )


2.  Data Loaders- What and Why

3.  Implementing Data Loaders

4.  User Subscription

5.  Format GraphQL Error Response and Query
Variables Overview

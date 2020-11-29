# Resolver Context 

11/8 - udemy 27. Resolver Context


## Resolver Context Basic
- Resolver can access context on 3rd argument
  ```js
  (parent, args, context, info)
  ```
- Context usually declears **as a function**.
  

## Context : Object vs Function
- Context usually declear as a function because a context runs each time when graphql calls.
  
```js
// Context is object - Not good idea
const apolloServer = new ApolloServer({
  typeDefs,
  resolvers,
  context: {
    email: "test@gmail.com" + Math.random(),
  },
});
// output - random number is same because Context is object.
// test@gmail.com0.03349650965875228
// test@gmail.com0.03349650965875228
// test@gmail.com0.03349650965875228


// Context is a function! so a context runs everytime.
const apolloServer = new ApolloServer({
  typeDefs,
  resolvers,
  context: () => {
    return {
      email: "test@gmail.com" + Math.random(),
    };
  },
})

// Output
// test@gmail.com0.7281702660677751
// test@gmail.com0.6742306984422213


const resolvers = {
  Query: {
    user(parent, args, {email}, info) {
      console.log(email);
      return users.find(user => user.id === args.id);
    }
  }
}
```


## Resolver Context ex.2
 
```js
// Constructor
const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: ({ req }) => ({
    authScope: getScope(req.headers.authorization)
  })
}));

// Example resolver
(parent, args, context, info) => {
  if(context.authScope !== ADMIN) throw AuthenticationError('not admin');
  // Proceed
}
```



## References: 

- https://www.apollographql.com/docs/apollo-server/security/authentication/
- https://www.apollographql.com/docs/apollo-server/data/resolvers/
- https://www.apollographql.com/docs/apollo-server/data/resolvers/#resolver-arguments
 
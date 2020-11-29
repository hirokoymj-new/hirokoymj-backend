# Verify Token

28, 29 Udemy

**HTTP Headers Format**
```js
{
  "Authorization" :"Bearer [token]"
}
```
![](screenshot/playground_send-http-headers.png)

// console.log(req.headers)
![](screenshot/playground_req-headers.png)
![](screenshot/jwt.io.png)

**Verify Token**

```js
// login mutation
const token = jwt.sign({ email: user.email }, secret, {
  expiresIn: "1d",
});

// Verify Token in Context
const payload = jwt.verify(
  token,
  process.env.JWT_SECRET_KEY || "mysecretkey"
);
req.email = payload.email;
```

**Context function**
```js
const verifyUser = async (req) => {
  try {
    req.email = null;
    const bearerHeader = req.headers.authorization;
    if (bearerHeader) {
      const token = bearerHeader.split(" ")[1];
      const payload = jwt.verify(
        token,
        process.env.JWT_SECRET_KEY || "mysecretkey"
      );
      req.email = payload.email;
    }
  } catch (error) {
    console.log(error);
    throw error;
  }
};

const apolloServer = new ApolloServer({
  typeDefs,
  resolvers,
  context: async ({ req }) => { // Context returns user email
    await verifyUser(req);
    return {
      email: req.email,
    };
  },
});
```

###  **Where should add Access Denied Code**
#### Idea 1 - The logic(if token exists or not ) in Context - bad idea

```js
const apolloServer = new ApolloServer({
  typeDefs,
  resolvers,
  context: async ({ req }) => {
    try {
      req.email = null;
      const bearerHeader = req.headers.authorization;
      if (bearerHeader) {
        const token = bearerHeader.split(" ")[1];
        const payload = jwt.verify(
          token,
          process.env.JWT_SECRET_KEY || "mysecretkey"
        );
        req.email = payload.email;
      }
// 1) It is not a good idea to place it over here because this check is going to apply each and every query and mutation.
// 2) We do not want to check the token on each and every mutation for example sign-up. We do not want the token to be passed by the user and also for the login API. 
// 3) We don't want the token to be passed by the user. Now you might thing that we should put this logic inside of each and every resolver.			
      if (!req.email) {
        throw new Error("Access Denied. please login");
      }
      return {
        email: req.email,
      };
    } catch (error) {
      console.log(error);
      throw error;
    }
  },
});
```

### idea #2 - The logic(if token exists or not ) put inside each resolver.

```js
  Query: {
    user: (_, args, { email }) => {
// 1. Now you might thing that we should put this logic inside of each and every resolver.			
      if (!email) {
        throw Error("Access Denied. Please login");
      }
      const user = User.findById(args.id);
      return user;
    },
  },
```

### Solution - Use Resolver Middleware

```js
const { skip } = require("graphql-resolvers");

module.exports.isAuthenticated = (_, __, { email }) => {
  console.log("isAuthenticated");
  if (!email) {
    throw new Error("Access Denied! Please login.");
  }
  return skip;
};
```

```js
user: combineResolvers(isAuthenticated, async (_, __, { email }) => {
  try {
    const user = await User.findOne({ email });
    if (!user) {
      throw new Error("User not found!");
    }
    return user;
  } catch (error) {
    console.log(error);
    throw error;
  }
}),
```

## References:
- https://www.npmjs.com/package/jsonwebtoken
- https://jwt.io/
# Login Mutation
11/8 - 26. Authentication: Login Mutation

if you're wondering why the login has to be mutation not a query because login is not going to change any data in backend.
But there can be some scenario where you want to log some user activeity as the user logs in 

## Schema.js
```js
type Mutation {
    login(input: loginInput): Token
  }

  input loginInput {
    email: String!
    password: String!
  }

  type Token {
    token: String!
  }
```

## Resolver

```js
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../database/models/user");

module.exports = {
  Mutation: {
    login: async (_, { input }) => {
      try {
        // 1. Check if user exists
        const user = await User.findOne({ email: input.email });
        if (!user) {
          throw new Error("User not found");
        }
        // 2. Check password
        const isPasswordValid = await bcrypt.compare(
          input.password,
          user.password
        );
        if (!isPasswordValid) {
          throw new Error("Incorrect Password");
        }
        const secret = process.env.JWT_SECRET_KEY || "mysecretkey";
        const token = jwt.sign({ email: user.email }, secret, {
          expiresIn: "1d",
        });
        return { token };
      } catch (error) {
        console.log(error);
        throw error;
      }
    },
  },
```

## Playground

```js
mutation login{
  login(input: { email: "hiroko1@gmail.com", password: "hiroko1"}){
    token
  }
}
// output
{
  "data": {
    "login": {
      "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6Imhpcm9rbzFAZ21haWwuY29tIiwiaWF0IjoxNjA0ODc4MTYwLCJleHAiOjE2MDQ5NjQ1NjB9.jgb7aojp-kdtV3qYNLjn1QxdNSHOkwWt3jfX6mCfEvw"
    }
  }
}
```



```js
$ npm install jsonwebtoken
```
## References: 
 - [jsonwebtoken](https://www.npmjs.com/package/jsonwebtoken)

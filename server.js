// const express = require("express");
// const { ApolloServer } = require("apollo-server-express");
// const cors = require("cors");
const { ApolloServer, gql } = require("apollo-server");
const dotEnv = require("dotenv");
const jwt = require("jsonwebtoken");

const resolvers = require("./resolvers");
const typeDefs = require("./typeDefs");
const { connection } = require("./database/util");

// set env variables
dotEnv.config();

//const app = express();

//db connectivity
connection();

//cores
// app.use(cors());

// body parser middleware
//app.use(express.json());

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
      // Put this code is not good idea because login mutation won't need to check token.
      // if (!req.email) {
      //   throw new Error("Access Denied. please login");
      // }
      return {
        email: req.email,
      };
    } catch (error) {
      console.log(error);
      throw error;
    }
  },
  introspection: true,
  playground: true,
});
//("");

//apolloServer.applyMiddleware({ app, path: "/graphql" });

//const PORT = process.env.PORT || 4000;

// app.use("/", (req, res, next) => {
//   res.send({ message: "Hello Hiroko" });
// });

// app.listen(PORT, () => {
//   console.log(`Server listening on PORT: ${PORT}`);
// });

// app.listen({ port: process.env.PORT || 4000 }, () =>
//   console.log(
//     `🚀 Server ready at http://localhost:4000${apolloServer.graphqlPath}`
//   )
// );

apolloServer.listen({ port: process.env.PORT || 4000 }).then(({ url }) => {
  console.log(`🚀  Server ready at ${url}`);
});

const { ApolloServer, gql } = require("apollo-server");
const dotEnv = require("dotenv");
const jwt = require("jsonwebtoken");

const resolvers = require("./resolvers");
const typeDefs = require("./typeDefs");
const { connection } = require("./database/util");
const WeatherAPI = require("./datasources/weather");

// set env variables
dotEnv.config();

connection();

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
  dataSources: () => ({
    weatherAPI: new WeatherAPI(),
  }),
  introspection: true,
  playground: true,
});

apolloServer.listen({ port: process.env.PORT || 4000 }).then(({ url }) => {
  console.log(`Server ready at ${url}`);
});

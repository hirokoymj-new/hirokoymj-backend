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
  dataSources: () => ({
    weatherAPI: new WeatherAPI(),
  }),
  introspection: true,
  playground: true,
});

apolloServer.listen({ port: process.env.PORT || 4000 }).then(({ url }) => {
  console.log(`Server ready at ${url}`);
});

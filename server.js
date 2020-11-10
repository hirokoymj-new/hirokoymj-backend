const express = require("express");
const { ApolloServer } = require("apollo-server-express");
const cors = require("cors");
const dotEnv = require("dotenv");
const jwt = require("jsonwebtoken");

const resolvers = require("./resolvers");
const typeDefs = require("./schema");
const { connection } = require("./database/util");

// set env variables
dotEnv.config();

const app = express();

//db connectivity
connection();

//cores
app.use(cors());

// body parser middleware
app.use(express.json());

const verifyUser = async (req) => {
  try {
    console.log("===requerst header");
    console.log(req.headers);
    req.email = null;
    const bearerHeader = req.headers.authorization;
    if (bearerHeader) {
      const token = bearerHeader.split(" ")[1];
      const payload = jwt.verify(
        token,
        process.env.JWT_SECRET_KEY || "mysecretkey"
      );
      console.log("payload.email", payload.email);

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
  context: async ({ req }) => {
    await verifyUser(req);
    console.log("===context ran");
    return {
      email: req.email,
    };
  },
});

apolloServer.applyMiddleware({ app, path: "/graphql" });

const PORT = process.env.PORT || 3000;

app.use("/", (req, res, next) => {
  res.send({ message: "Hello Hiroko" });
});

app.listen(PORT, () => {
  console.log(`Server listening on PORT: ${PORT}`);
});

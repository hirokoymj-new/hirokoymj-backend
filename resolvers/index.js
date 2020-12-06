const { GraphQLDateTime } = require("graphql-iso-date");

const userResolver = require("./user");
const taskResolver = require("./task");
const categoryResolver = require("./category");
const weatherResolver = require("./weather");

const customDateScalarResolver = {
  Date: GraphQLDateTime,
};

module.exports = [
  userResolver,
  taskResolver,
  customDateScalarResolver,
  categoryResolver,
  weatherResolver,
];

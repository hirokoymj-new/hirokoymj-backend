const { GraphQLDateTime } = require("graphql-iso-date");

const userResolver = require("./user");
const taskResolver = require("./task");
const categoryResolver = require("./category");
const subCategoryResolver = require("./subCategory");
const topicResolver = require("./topic");
const weatherResolver = require("./weather");
const cityResolver = require("./city");

const customDateScalarResolver = {
  Date: GraphQLDateTime,
};

module.exports = [
  userResolver,
  taskResolver,
  customDateScalarResolver,
  categoryResolver,
  subCategoryResolver,
  topicResolver,
  weatherResolver,
  cityResolver,
];

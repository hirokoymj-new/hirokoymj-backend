const { GraphQLDateTime } = require("graphql-iso-date");

const userResolver = require("./user");
const taskResolver = require("./task");
const category_subcategoryResolver = require("./category_subcategory");
const topicResolver = require("./topic");
const weatherResolver = require("./weather");

const customDateScalarResolver = {
  Date: GraphQLDateTime,
};

module.exports = [
  userResolver,
  taskResolver,
  customDateScalarResolver,
  category_subcategoryResolver,
  topicResolver,
  weatherResolver,
];

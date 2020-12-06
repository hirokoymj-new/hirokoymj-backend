const { gql } = require("apollo-server");

module.exports = gql`
  extend type Query {
    weathers: [Weather]!
  }

  type Weather {
    id: String!
    pressure: String
    description: String
    main: String
  }
`;

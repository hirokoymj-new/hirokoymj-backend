const { gql } = require("apollo-server");

module.exports = gql`
  extend type Query {
    currentWeather(lat: String!, lon: String!, unit: String): Weather!
  }

  type Weather {
    id: String!
    cityName: String!
    country: String
    weather: String
    icon: String
    temperature: Float
    min: Float
    max: Float
    humidity: Int
  }
`;

const { gql } = require("apollo-server");

module.exports = gql`
  extend type Query {
    currentWeather(lat: String!, lon: String!, unit: String): Weather!
    currentWeatherByCity(city: String!, unit: Units): Weather
  }

  enum Units {
    metric
    imperial
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

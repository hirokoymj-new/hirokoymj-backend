const { gql } = require("apollo-server");

module.exports = gql`
  extend type Query {
    currentWeather(lat: String!, lon: String!, unit: String): Weather!
    currentWeatherByCity(city: String!, unit: Units): Weather
    dailyForecast(city: String!, unit: Units): DailyForecast
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

  type DailyForecast {
    id: String!
    city: City
    forecastList: [Forecast!]
  }

  type City {
    name: String
    lon: String
    lat: String
    country: String
  }

  type Forecast {
    dt: Int
    temperature: Temperature
    weather: String
    icon: String
    humidity: Int
  }

  type Temperature {
    day: Float
    min: Float
    max: Float
  }
`;

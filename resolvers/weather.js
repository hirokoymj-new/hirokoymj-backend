module.exports = {
  Query: {
    currentWeather: (_, { lat, lon, unit = "metric" }, { dataSources }) =>
      dataSources.weatherAPI.getCurrentWeather(lat, lon, unit),
    currentWeatherByCity: (_, { city, unit = "metric" }, { dataSources }) =>
      dataSources.weatherAPI.getCurrentWeatherByCity(city, unit),
  },
};

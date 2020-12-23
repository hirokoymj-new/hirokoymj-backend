module.exports = {
  Query: {
    currentWeather: (_, { lat, lon, unit = "metric" }, { dataSources }) =>
      dataSources.weatherAPI.getCurrentWeather(lat, lon, unit),
  },
};

module.exports = {
  Query: {
    weathers: (_, __, { dataSources }) =>
      dataSources.weatherAPI.getAllWeathers(),
  },
};

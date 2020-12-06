const { RESTDataSource } = require("apollo-datasource-rest");

class WeatherAPI extends RESTDataSource {
  constructor() {
    super();
    this.baseURL = "https://samples.openweathermap.org/";
  }

  async getAllWeathers() {
    const response = await this.get(
      "data/2.5/forecast/daily?id=524901&appid=b1b15e88fa797225412429c1c50c122a15"
    );
    const weatherList = response.list;

    return Array.isArray(weatherList)
      ? weatherList.map((weather) => this.weatherReducer(weather))
      : [];
  }

  weatherReducer(weather) {
    return {
      id: weather.dt,
      pressure: weather.pressure,
      description: weather.weather[0].description,
      main: weather.weather[0].main,
    };
  }
}

module.exports = WeatherAPI;

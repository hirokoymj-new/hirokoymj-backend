const { RESTDataSource } = require("apollo-datasource-rest");
const get = require("lodash/get");

class WeatherAPI extends RESTDataSource {
  constructor() {
    super();
    this.baseURL = "https://api.openweathermap.org/";
    this.apiKey = "be2d43efb7b89c5d69256d7ec44da9b8";
  }

  async getCurrentWeather(lat, lon, unit) {
    // const lat = 34.0522342;
    // const lon = -118.2436849;
    const response = await this.get(
      `data/2.5/weather?lat=${lat}&lon=${lon}&units=${unit}&type=accurate&appid=${this.apiKey}`
    );

    const id = get(response, "id");
    const { country } = get(response, "sys", {});
    const name = get(response, "name");
    const { main, icon } = get(response, "weather[0]", []);
    const { temp, temp_min, temp_max, humidity } = get(response, "main", {});

    return {
      id,
      cityName: name,
      country,
      weather: main,
      icon,
      temperature: temp,
      min: temp_min,
      max: temp_max,
      humidity,
    };
  }
}

module.exports = WeatherAPI;

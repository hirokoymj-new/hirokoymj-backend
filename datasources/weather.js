const { RESTDataSource } = require("apollo-datasource-rest");
const get = require("lodash/get");
const map = require("lodash/map");

class WeatherAPI extends RESTDataSource {
  constructor() {
    super();
    this.baseURL = "https://api.openweathermap.org/";
    this.apiKey = "be2d43efb7b89c5d69256d7ec44da9b8";
  }

  async getCurrentWeather(lat, lon, unit) {
    console.log("getCurrentWeather");
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

  async getCurrentWeatherByCity(city, unit) {
    const response = await this.get(
      `data/2.5/weather?q=${city}&units=${unit}&appid=be2d43efb7b89c5d69256d7ec44da9b8`
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

  async getDailyForecast(city, unit) {
    const response = await this.get(
      `data/2.5/forecast/daily?q=${city}&units=metric&cnt=7&appid=${this.apiKey}`
    );

    const {
      id,
      name,
      coord: { lon, lat },
      country,
    } = get(response, "city");
    const list = get(response, "list", []);

    const mappedData = map(list, (data) => {
      const {
        dt,
        temp: { day, min, max },
        humidity,
        weather,
      } = data;

      return {
        dt,
        temperature: {
          day,
          min,
          max,
        },
        weather: weather[0].main,
        icon: weather[0].icon,
        humidity,
      };
    });

    return {
      id,
      city: { name, lon, lat, country },
      forecastList: mappedData,
    };
  }
}

module.exports = WeatherAPI;

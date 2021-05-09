const request = require("request");

const forecast = (lat,long, callback) => {
  const url =
    "http://api.weatherstack.com/current?access_key=b8e07459d85088c91e1692234bcdc2bb&query=" +
    lat +
    "," +
    long;
  request({ url: url, json: true }, (error, response) => {
    if (error) {
      callback("unable to connect to weather stack",undefined);
    } else if (response.body.error) {
      callback("unable to get location",undefined);
    } else {
      callback(undefined,
        response.body.current.weather_descriptions[0] +
          ". It is currently " +
          response.body.current.temperature +
          " ,but feels like " +
          response.body.current.feelslike +
          ". Humidity is " + response.body.current.humidity
      );
    }
  });
};

module.exports = forecast;

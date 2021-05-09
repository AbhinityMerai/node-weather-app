const request = require("request");

const geoLocUrl = (address, callback) => {
    const url =
      "https://api.mapbox.com/geocoding/v5/mapbox.places/" +
      address +
      ".json?access_token=pk.eyJ1IjoiYWJoaW5pdHkiLCJhIjoiY2tuc2RrYjg0MjRodjJvcHU0eDl0c2dleiJ9.hk0MulyhX2WEl7ktdEeLNw&limit=1";
    request({ url: url, json: true }, (error, response) => {
      if (error) {
        callback("unable to get geo loaction",undefined);
      } else if (response.body.features.length === 0) {
        callback(
          "search result not found, please try again with different location",undefined
        );
      } else {
        callback(undefined,{
          longitude: response.body.features[0].center[0],
          latitude:response.body.features[0].center[1],
          location:response.body.features[0].place_name}
        );
      }
    });
  };

  module.exports = geoLocUrl;
  
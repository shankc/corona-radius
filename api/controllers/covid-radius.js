const { exits } = require("./corona");

module.exports = {

  friendlyName: 'Get corona data as per radius',

  description: 'Calculates covid data according to the given radius',

  fn: async function(inputs, exits) {

    let request = sails.helpers.requestSerializer.with(
      {
        request: this.req
      }
    );
    currentCity = request.city;
    radius = request.radius;
    slackUrl = request.responseUrl;

    exits.success('Working on The request :)');

    let currentCityDetails = await sails.models.district_lat_long.findOne(
      {
        where: {city_name: currentCity}
      }
    );
    if(!currentCityDetails)
    {
      console.log('Not found');
    }
    else {
      let citiesAtGivenRadius = await sails.helpers.findCities.with({
        model: sails.models.district_lat_long,
        radius: radius,
        center: {
          x: currentCityDetails.latitude,
          y: currentCityDetails.longitude
        }
      });

      if (citiesAtGivenRadius) {
        let nearByCities = citiesAtGivenRadius.map(c => c.city_name);
        let nearByCitiesCovidData = await sails.helpers.getCityCovidData.with({
          cities: nearByCities
        });
        if(nearByCitiesCovidData) {
          exits.success(nearByCitiesCovidData);
          let resp = await sails.helpers.postToSlack.with({
            url: slackUrl,
            response: nearByCitiesCovidData,
            radius: radius,
            responseType: 1,
            cityName: currentCity
          });
          console.log('posted to slack', resp);
        }
        else {
          console.log('No nearby cities were found');
        }
      }
      else {
        console.log('No cities were found near by');
      }
    }
  }

};

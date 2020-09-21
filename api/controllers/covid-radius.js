const { exits } = require("./corona");

module.exports = {

  friendlyName: 'Get corona data as per radius',

  description: 'Calculates covid data according to the given radius',

  fn: async function(inputs, exits) {
    currentCity = this.req.query.city;
    radius = this.req.query.radius;

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

      if(citiesAtGivenRadius) {
        let nearByCities = citiesAtGivenRadius.map(c => c.city_name);
        let nearByCitiesCovidData = await sails.helpers.getCityCovidData.with({
          cities: nearByCities
        });
        if(nearByCitiesCovidData) {
          exits.success(nearByCitiesCovidData);
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

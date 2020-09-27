module.exports = {

  friendlyName: '',

  description: '',

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

    if(!currentCityDetails) {
      console.log('Current city not found');
    }
    else {
      let citiesAtGivenRadius = await sails.helpers.findCities.with({
        model: sails.models.centers,
        radius: radius,
        center: {
          x: currentCityDetails.latitude,
          y: currentCityDetails.longitude
        }
      });

      if (citiesAtGivenRadius) {
        let nearByCities = citiesAtGivenRadius.map(c => c.cityName);
        let nearByTestCenters = await sails.helpers.getTestCentersData.with({
          cities: nearByCities
        });
        if (nearByTestCenters) {
          exits.success(nearByTestCenters);
          let resp = await sails.helpers.postToSlack.with({
            url: slackUrl,
            response: nearByTestCenters,
            radius: radius,
            responseType: 3,
            cityName: currentCity
          });
          console.log('posted to slack', resp);
        }
        else {
          console.log('No TestCenters were found Were found');
        }
      }
    }


  }
};

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
        model: sails.models.hospital,
        radius: radius,
        center: {
          x: currentCityDetails.latitude,
          y: currentCityDetails.longitude
        }
      });

      if (citiesAtGivenRadius) {
        let nearByCities = citiesAtGivenRadius.map(c => c.cityName);
        let nearByHospitals = await sails.helpers.getHospitalData.with({
          cities: nearByCities
        });
        if(nearByHospitals) {
          exits.success(nearByHospitals);
          let resp = await sails.helpers.postToSlack.with({
            url: slackUrl,
            response: nearByHospitals,
            radius: radius,
            responseType: 2,
            cityName: currentCity
          });
          console.log('posted to slack', resp);
        }
        else {
          console.log('No Hospitals Were found');
        }
      }
    }


  }
}
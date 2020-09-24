module.exports = {

  friendlyName: '',

  description: '',

  fn: async function(inputs, exits) {
    currentCity = this.req.query.city;
    radius = this.req.query.radius;

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
        }
        else {
          console.log('No Hospitals Were found');
        }
      }
    }


  }
}
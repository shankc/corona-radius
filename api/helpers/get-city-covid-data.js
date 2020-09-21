module.exports = {
  friendlyName: '',

  description: '',

  inputs: {
    cities: {
      type: 'ref'
    }
  },
  fn: async function(inputs, exits) {

    let cityCovidData = await sails.models.countrystates.find({
      where: {
        districtName: inputs.cities
      }
    });

    if (cityCovidData) {
      return exits.success(cityCovidData);
    }
  }
};

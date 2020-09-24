module.exports = {
  friendlyName: '',

  description: '',

  inputs: {
    cities: {
      type: 'ref'
    }
  },

  fn: async function(inputs, exits) {
    let cityTestCenterData = await sails.models.centers.find({
      where: {
        cityName: inputs.cities
      }
    });

    if (cityTestCenterData) {
      return exits.success(cityTestCenterData);
    }
  }
};

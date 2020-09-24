const saveHospitalData = require("./save-hospital-data");

module.exports = {
  friendlyName: '',

  description: '',

  inputs: {
    cities: {
      type: 'ref'
    }
  },

  fn: async function(inputs, exits) {

    let cityHospitalData = await sails.models.hospital.find({
      where: {
        cityName: inputs.cities
      }
    });

    if (cityHospitalData) {
      return exits.success(cityHospitalData);
    }

  }

};

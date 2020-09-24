const saveHospitalData = require("../helpers/save-hospital-data");

module.exports = {
  friendlyName: '',

  description: '',

  fn: async function (inputs, exits) {

    let hospitalData = this.req.body;
    _.forEach(hospitalData,  async (val, key) => {
      let stateName = val['stateName'];
      let cityName = val['cityName'];
      let districtName = val['districtName'];

      let dbResponse = await sails.helpers.createOrUpdate.with({
        model: sails.models.hospital,
        filter: {stateName: stateName, cityName: cityName, districtName: districtName},
        initialValues: val
      });
      return exits.success(dbResponse);
    });
  }
};

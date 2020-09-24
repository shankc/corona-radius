module.exports = {

  friendlyName: '',

  description: '',

  fn: async function(inputs, exits) {
    let testCenterData = this.req.body;

    _.forEach(testCenterData, async (val, key) => {
      let stateName = val['stateName'];
      let cityName = val['cityName'];
      let districtName = val['districtName'];

      let dbResponse = await sails.helpers.createOrUpdate.with({
        model: sails.models.centers,
        filter: {stateName: stateName, cityName: cityName, districtName: districtName},
        initialValues: val
      });

      if (dbResponse) {
        return exits.success(dbResponse);
      }
    });
  }

};

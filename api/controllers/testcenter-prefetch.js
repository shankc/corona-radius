module.exports = {

  friendlyName: '',

  description: '',

  fn: async function(inputs, exits) {
    let testCenterData = this.req.body;

    _.forEach(testCenterData, async (val, key) => {
      let stateName = val['stateName'];
      let cityName = val['cityName'];
      let districtName = val['districtName'];

      try{
        let dbResponse = await sails.helpers.createOrUpdate.with({
          model: sails.models.centers,
          filter: {stateName: stateName, cityName: cityName, districtName: districtName},
          initialValues: val
        });
      }
      catch(err) {
        console.log(err);
      }
    });

    exits.success('Records are being inserted');
  }

};

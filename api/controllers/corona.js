const country_states = require('../models/CountryStates');
const CountryStates = require('../models/CountryStates');

module.exports = {
  friendlyName: 'Get Corona data across india',

  description: 'Gets the corona virus data from across india, state wise',

  exits: {
    success: {},
  },

  fn: async function () {
    let countryData = await sails.helpers.getAllData();
    let countryCovidRecords = [];

    _.forEach(countryData, (value, key) => {
      let stateName = key;
      let stateCovidRecords = {};
      _.forEach(value['districts'], (v, k) => {
        let districtName = k;

        //Maintain sanity of the receved data.
        let districtMetrics = v['total'];

        if (!districtMetrics.hasOwnProperty('total')) {
          districtMetrics['total'] = 0;
        }
        if (!districtMetrics.hasOwnProperty('confirmed')) {
          districtMetrics['confirmed'] = 0;
        }
        if (!districtMetrics.hasOwnProperty('deceased')) {
          districtMetrics['deceased'] = 0;
        }

        if (!districtMetrics.hasOwnProperty('recovered')) {
          districtMetrics['recovered'] = 0;
        }

        let activeCases = sails.helpers.serializer(districtMetrics['confirmed']);
        let deaths = sails.helpers.serializer(districtMetrics['deceased']);
        let recoveredCases = sails.helpers.serializer(districtMetrics['recovered']);
        let totalCases = activeCases + recoveredCases + deaths;

        dbRecord = {
          stateName: stateName,
          districtName: districtName,
          totalCases: totalCases,
          activeCases: activeCases,
          deaths: deaths,
          recoveredCases: recoveredCases,
        };

        if (_.has(stateCovidRecords, stateName)) {
          stateCovidRecords[stateName].push(dbRecord);
        } else {
          stateCovidRecords[stateName] = [];
          stateCovidRecords[stateName].push(dbRecord);
        }
      });
      countryCovidRecords.push(stateCovidRecords);
    });

    _.forEach(countryCovidRecords, (value, key) => {
      // check if state data already exists
      console.log(value);
      _.forEach(value, (v, key) => {
        _.forEach(v, async (val, ke) => {
          let stateName = val['stateName'];

          let districtName = val['districtName'];

          let dbResponse = await sails.helpers.createOrUpdate.with({
            model: sails.models.countrystates,
            filter: {stateName: stateName, districtName: districtName},
            initialValues: val
          });
        });
      });
      // let stateRecord = await CountryStates.findOne(value)
    });
  },
};

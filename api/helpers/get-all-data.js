const { exists } = require('grunt');

module.exports = {

  friendlyName: 'Get all states data',


  description: 'Helper function to get entrie data of the country.',

  inputs: {},

  fn: async function (inputs, exits) {

    const axios = require('axios');

    let url = 'https://api.covid19india.org/v4/data.json';

    axios.get(url).then((resp) => {
      console.log(resp);
      return exits.success(resp.data);
    }).catch((error) => {
      console.log(error);
      return exists.error(error);
    });

  }

};

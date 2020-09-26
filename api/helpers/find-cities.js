const district_lat_long = require("../models/district_lat_long");
const { exists } = require("grunt");

module.exports = {

  friendlyName: 'Fetch Cities according to radius',

  description: 'Finds cities lying in a circle with selected city acting as a center, this is a db query',

  inputs: {
    model: {
      type: 'ref',
      description: 'model to find lat long on',
    },
    radius: {
      type: 'number',
      description: 'radius'
    },
    center: {
      type: 'ref',
      description: 'contains lat long of the center'
    }
  },

  fn: async function(inputs, exits) {
    console.log(inputs);

    function serialize(x) {
      if (Number(x) === x && x % 1 !== 0) {
        return x;
      }
      else if (typeof x === 'string' || x instanceof String){
        return  parseFloat(x.trim());
      }
    }

    let nearByCities = [];
    await inputs.model.stream().eachRecord(async (record) => {
      let lat = serialize(record.latitude);
      let long = serialize(record.longitude);

      let isInsideCircle = false;
      try {
        if ((lat && long) && lat !== '' && long !== ''){
          isInsideCircle = sails.helpers.circle.with({
            x: lat,
            y: long,
            cx: inputs.center.x,
            cy: inputs.center.y,
            radius: inputs.radius
          });
        }
        if(isInsideCircle) {
          nearByCities.push(record);
        }
      }
      catch(err) {
        console.log(err, record);
      }
    });

    return exits.success(nearByCities);
  }

};

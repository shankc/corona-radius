module.exports = {
  friendlyName: 'Find if point lies inside a circle',

  description: '',

  sync: true,

  inputs :{
    x: {
      type: 'number',
    },
    y: {
      type: 'number'
    },
    cx: {
      type: 'number',
    },
    cy: {
      type: 'number',
    },
    radius: {
      type: 'number'
    }
  },

  fn: function(inputs, exits) {
    // function to calculate distance between two points
    function deg2rad(deg) {
      return deg * (Math.PI/180);
    }
    let R = 6371; // Radius of the earth in km
    let dLat = deg2rad(inputs.x - inputs.cx); // deg2rad below
    let dLon = deg2rad(inputs.y - inputs.cy);
    let a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(deg2rad(inputs.x)) *
        Math.cos(deg2rad(inputs.cx)) *
        Math.sin(dLon / 2) *
        Math.sin(dLon / 2);
    let c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a)); 
    var d = R * c; // Distance in km

    if(d <= inputs.radius)
    {
      return exits.success(true);
    }

    return exits.success(false);
  },
};

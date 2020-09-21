module.exports = {
  friendlyName: 'Format welcome message',

  description: 'Return a personalized greeting based on the provided name.',

  sync: true,

  inputs: {
    arg: {
      type: 'number'
    }
  },

  fn: function (inputs, exits) {
    if (Number.isNaN(inputs.arg) || inputs === undefined) {
      exits.success(0);
    } else {
      return exits.success(inputs.arg);
    }
  },
};

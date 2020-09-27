
module.exports = {

  sync: true,

  inputs: {
    request: {
      type: 'ref'
    }
  },
  fn: function(inputs, exits) {
    let reqBody = inputs.request.body;

    let request = reqBody.text.split(' ');

    let cityName = request[0];
    let radius = parseInt(request[1]);



    return exits.success({
      city: cityName,
      radius: radius,
      responseUrl: reqBody.response_url
    });
  }
};

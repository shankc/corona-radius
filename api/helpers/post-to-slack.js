// {
//   "channel": "C1H9RESGL",
//   "blocks": [
//     {
//       "type": "section",
//       "text": {
//         "type": "mrkdwn",
//         "text": "Danny Torrence left the following review for your property:"
//       }
//     },
//     {
//       "type": "section",
//       "block_id": "section567",
//       "text": {
//         "type": "mrkdwn",
//         "text": "<https://google.com|Overlook Hotel> \n :star: \n Doors had too many axe holes, guest in room 237 was far too rowdy, whole place felt stuck in the 1920s."
//       },
//       "accessory": {
//         "type": "image",
//         "image_url": "https://is5-ssl.mzstatic.com/image/thumb/Purple3/v4/d3/72/5c/d3725c8f-c642-5d69-1904-aa36e4297885/source/256x256bb.jpg",
//         "alt_text": "Haunted hotel image"
//       }
//     },
//     {
//       "type": "section",
//       "block_id": "section789",
//       "fields": [
//         {
//           "type": "mrkdwn",
//           "text": "*Average Rating*\n1.0"
//         }
//       ]
//     }
//   ]
// }
function createCovidSlackResponse(body, radius, cityName) {

  let resp = {};
  let blocks = [{
    type: 'section',
    text: {
      type: 'mrkdwn',
      text: `Covid Cases at a ${radius} km radius from ${cityName}`
    }
  }];
  _.forEach(body, (val, key) => {
    let blockObj = {
      type: 'section',
      fields: [
        {
          type: 'mrkdwn',
          text: `State Name: ${val.stateName}`
        },
        {
          type: 'mrkdwn',
          text: `District Name: ${val.districtName}`,
        },
        {
          type: 'mrkdwn',
          text: `Total Cases: ${val.totalCases}`
        },
        {
          type: 'mrkdwn',
          text: `Active Cases: ${val.activeCases}`
        },
        {
          type: 'mrkdwn',
          text: `Recovered Cases: ${val.recoveredCases}`
        },
        {
          type: 'mrkdwn',
          text: `Deaths: ${val.deaths}`
        }
      ]
    };
    blocks.push(blockObj);
  });

  resp = Object.assign(resp, {blocks: blocks});

  return resp;
}

function createHospitalSlackResponse(body, radius, cityName) {

  let resp = {};
  let blocks = [{
    type: 'section',
    text: {
      type: 'mrkdwn',
      text: `Hospitals treating covid at a ${radius} km radius from ${cityName}`
    }
  }];
  _.forEach(body, (val, key) => {
    let blockObj = {
      type: 'section',
      fields: [
        {
          type: 'mrkdwn',
          text: `State Name: ${val.stateName}`
        },
        {
          type: 'mrkdwn',
          text: `District Name: ${val.districtName}`,
        },
        {
          type: 'mrkdwn',
          text: `City Name: ${val.cityName}`
        },
        {
          type: 'mrkdwn',
          text: `Hospital Name: ${val.hospitalName}`
        },
        {
          type: 'mrkdwn',
          text: `Hospital Address: ${val.address}`
        }
      ]
    };
    blocks.push(blockObj);
  });

  resp = Object.assign(resp, {blocks: blocks});

  return resp;
}

function createTestCenterSlackResponse(body, radius, cityName) {

  let resp = {};
  let blocks = [{
    type: 'section',
    text: {
      type: 'mrkdwn',
      text: `Diagnostic centers testing for covid at a ${radius} km radius from ${cityName}`
    }
  }];
  _.forEach(body, (val, key) => {
    let blockObj = {
      type: 'section',
      fields: [
        {
          type: 'mrkdwn',
          text: `State Name: ${val.stateName}`
        },
        {
          type: 'mrkdwn',
          text: `District Name: ${val.districtName}`,
        },
        {
          type: 'mrkdwn',
          text: `City Name: ${val.cityName}`
        },
        {
          type: 'mrkdwn',
          text: `Testcenter Name: ${val.testCenterName}`
        },
        {
          type: 'mrkdwn',
          text: `Test Center Address: ${val.address}`
        }
      ],
    };

    blocks.push(blockObj);
  });

  resp = Object.assign(resp, {blocks: blocks});

  return resp;
}


module.exports = {

  inputs: {
    url: {
      type: 'string',
    },
    response: {
      type: 'ref'
    },
    radius: {
      type: 'number'
    },
    cityName: {
      type: 'string'
    },
    responseType: {
      type: 'number'
    }
  },

  fn: async function(inputs, exits) {

    const axios = require('axios');

    let url = inputs.url;
    let respBody = inputs.response;
    let responseType = inputs.responseType;

    let slackResponse = null;

    switch(responseType) {
      case 1:
        slackResponse = createCovidSlackResponse(respBody, inputs.radius, inputs.cityName);
        break;
      case 2:
        slackResponse = createHospitalSlackResponse(respBody, inputs.radius, inputs.cityName);
        break;
      case 3:
        slackResponse = createTestCenterSlackResponse(respBody, inputs.radius, inputs.cityName);
        break;
    }

    console.log(slackResponse);

    axios({
      method: 'post',
      url: url,
      data: slackResponse,
      headers: {
        'content-type': 'application/json'
      }
    }).then((resp) => {
      exits.success(resp);
    }).catch((err) => {
      console.log(err);
      exits.success(err);
    });
  }
};

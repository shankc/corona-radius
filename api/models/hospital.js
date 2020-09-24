module.exports = {

  friendlyName: '',

  description: '',

  attributes: {
    stateName: {
      type: 'string',
      description: 'State name',
      required: true
    },
    districtName : {
      type: 'string',
      description: 'District Name',
      required: true
    },
    cityName: {
      type: 'string',
      description: 'City Name',
      required: true
    },
    pincode: {
      type: 'number',
      description: 'Pincode',
      required: true
    },
    latitude: {
      type: 'number',
      description: 'lat',
      required: true,
      columnType: 'float'
    },
    longitude: {
      type: 'number',
      description: 'long',
      required: true,
      columnType: 'float'
    },
    hospitalName: {
      type: 'string',
      description: 'City Name',
      required: true
    },
    address: {
      type: 'string',
      description: 'City Name',
      required: true
    }
  }
}
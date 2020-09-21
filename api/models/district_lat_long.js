/* eslint-disable camelcase */
module.exports = {
  attributes: {
    city_id: {
      type: 'number',
      description: 'city id',
      required: true
    },
    city_name: {
      type: 'string',
      description: 'city_name',
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
    }
  }
};

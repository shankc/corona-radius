module.exports = {

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

    totalCases: {
      type: 'number',
      description: 'Total cases',
      required: true
    },

    activeCases: {
      type: 'number',
      description: 'Total Active cases',
      required: true
    },

    recoveredCases : {
      type: 'number',
      description: 'Total recovery cases',
      required: true
    },

    deaths: {
      type: 'number',
      description: 'Total Number of deaths',
      required: true
    },
  }
};

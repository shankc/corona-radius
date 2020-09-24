module.exports = {
  friendlyName: 'Update or create new record',

  description: 'Creates or updates a record',

  inputs: {
    model: {
      type: 'ref',
      description: 'The model to work on'
    },
    filter: {
      type: 'ref',
      description: 'filters to be applied in the where clause to find collections'
    },
    initialValues: {
      type: 'ref',
      description: 'Object to be inserted into the db'
    }
  },

  fn: async function(inputs, exits) {
    console.log(inputs);
    let existingRecord = await inputs.model.findOne({
      where: inputs.filter
    });
    if (!existingRecord) {
      //create new record
      try {
        let dbRecord = await inputs.model.create(inputs.initialValues);
        if (dbRecord) {
          exits.success(dbRecord);
        }
      }
      catch (err) {
        console.log(err);
      }
    }
    else {
      // update record
      try {
        let dbRecord = await inputs.model.updateOne({
          where: inputs.filter
        }).set(inputs.initialValues);

        if (dbRecord) {
          exits.success(dbRecord);
        }

      }
      catch (err) {
        console.log(err);
      }
    }
  }
};

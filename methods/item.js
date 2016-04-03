
Meteor.methods({

  addItem: (instance) => {
    crud.Items.insert(instance);
  },

  editItem: (itemId, instance) => {
    item = crud.Items.update({_id: itemId}, {$set: instance})
  },

  removeItem: (itemId) => {
    crud.Items.remove(itemId);
  }

})

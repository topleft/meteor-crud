
Meteor.methods({
  addItem: (instance) => {
    instance.save()
  },
  editItem: (itemId, instance) => {
    item = crud.Items.findOne(itemId)
    item.set(instance)
    item.save()
  },
  removeItem: (itemId) => {
    crud.Items.remove(itemId);
  }
})

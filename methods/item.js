
Meteor.methods({
  addItem: (instance) => {
    crud.Items.insert(instance)
  },
  editItem: (itemId, instance) => {
    console.log("args", itemId, instance.raw());
    item = crud.Items.findOne(itemId)
    item.set('name', instance.name)
    item.set('type', instance.type)
    item.save()
  },
  removeItem: (itemId) => {
    crud.Items.remove(itemId);
  }
})

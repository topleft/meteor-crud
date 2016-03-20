
Meteor.methods({
  addItem: (instance) => {
    instance.save()
  },
  editItem: (itemId, instance) => {
    console.log("args", itemId, instance.raw());
    item = crud.Items.findOne(itemId)
    item.set('itemName', instance.itemName)
    item.set('type', instance.type)
    item.save()
  },
  removeItem: (itemId) => {
    crud.Items.remove(itemId);
  }
})

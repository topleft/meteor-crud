
Meteor.publish('items', function () {
  return crud.Items.find({ownerId: this.userId})
  })

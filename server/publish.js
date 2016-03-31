
Meteor.publish('items', function () {
  if (Roles.userIsInRole(Meteor.userId(), 'admin')){
    return crud.Items.find({})
  }
  else if (Meteor.userId()) {
    return crud.Items.find({ownerId: this.userId})
  }
})

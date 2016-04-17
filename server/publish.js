
Meteor.publish('items', function () {
  if (Roles.userIsInRole(this.userId, 'admin')){
    return crud.Items.find({})
  }
  else if (this.userId) {
    return crud.Items.find({ownerId: this.userId})
  }
})

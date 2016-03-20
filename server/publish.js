console.log("publish file")

Meteor.publish('items', () => {
  console.log("In the publish",crud.Items.find({}))
  return crud.Items.find({})
  })

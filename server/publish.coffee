Meteor.publish('items', () => {
  console.log(crud.Items.find({})) 
  return crud.Items.find({})
  })

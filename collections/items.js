crud.Items = new Mongo.Collection("items");

crud.Items.schema = new SimpleSchema({
  name: {type: String},
  type: {type: String},
  ownerId: {type: String}
})

crud.Items.attachSchema(crud.Items.schema)

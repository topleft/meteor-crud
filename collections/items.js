crud.Items = new Mongo.Collection("items");
crud.Item = Astronomy.Class({
    name: 'Item',
    collection: crud.Items,
    fields: {
      itemName: String,
      type: String,
      ownerId: 'string'
    }
  }
)

crud.Items = new Mongo.Collection("items");
crud.Item = Astronomy.Class({
    name: 'Item',
    fields: {
      itemName: String,
      type: String,
      owner: 'string'
    }
  }
)

import { Meteor } from 'meteor/meteor';
import { SimpleSchema } from 'meteor/aldeed:simple-schema'
import { Mongo } from 'meteor/mongo';
import { check } from 'meteor/check';

export const Items = new Mongo.Collection("items");

Items.schema = new SimpleSchema({
  name: {type: String},
  type: {type: String},
  ownerId: {type: String},
  createdAt: {type: Date}
})

Items.attachSchema(Items.schema)

Meteor.methods({

  addItem: (instance) => {
    Items.insert(instance);
  },

  editItem: (itemId, instance) => {
    item = Items.update({_id: itemId}, {$set: instance})
  },

  removeItem: (itemId) => {
    Items.remove(itemId);
  }

})

if (Meteor.isServer) {
  Meteor.publish('items', function () {
    if (Roles.userIsInRole(this.userId, 'admin')){
      return Items.find({})
    }
    else if (this.userId) {
      return Items.find({ownerId: this.userId})
    }
  })
}

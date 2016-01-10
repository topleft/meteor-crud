Items = new Mongo.Collection("items")

if (Meteor.isClient) {
  // counter starts at 0
  Session.setDefault('counter', 0);

  Template.body.helpers({
    items: function () {
      return Items.find({});
    }
  });

  Template.body.events({
    'submit .new-item': function (event) {
      event.preventDefault();

      var item = event.target.item.value;
      var type = event.target.type.value;
      Items.insert({name: item, type: type});
      event.target.item.value = "";
      event.target.type.value = "";
      
    }
  });
}

if (Meteor.isServer) {
  Meteor.startup(function () {
    // code to run on server at startup
  });
}

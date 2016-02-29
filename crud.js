Items = new Mongo.Collection("items");

if (Meteor.isClient) {
  Session.setDefault('toggle', false);

  Template.body.helpers({
    items: function () {
      return Items.find({});
    },
    toggle: function () {
      return Session.get("toggle");
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

    },
    'click #edit': function () {
      Session.set('toggle', this.item._id);
    },
    'click #delete': function () {
      Items.remove(this.item._id);
    }
  });

  Template.row.helpers({
    editToggle: function () {
      return 
    },     
    matching: function (a, b) {
      return a === b;
    }
  })
}

if (Meteor.isServer) {
  Meteor.startup(function () {
    // code to run on server at startup
  });
}


if (Meteor.isClient) {
  Session.setDefault('toggle', false);
  Session.setDefault('idToEdit', null);

  Template.crud.helpers({
    items: function () {
      return crud.Items.find({}).fetch();
    },
    toggle: function () {
      return Session.get("toggle");
    },
    idToEdit: function () {
      return Session.get('idToEdit');
    }

  });

  Template.crud.events({
    'submit .new-item': function (event) {
      event.preventDefault();

      var item = event.target.item.value;
      var type = event.target.type.value;
      crud.Items.insert({itemName: item, type: type});
      event.target.item.value = "";
      event.target.type.value = "";
    },
    'click #edit': function () {
      Session.set('idToEdit', this.item._id);
    },
    'click #delete': function () {
      crud.Items.remove(this.item._id);
    },
    'click .toggle-edit': function (e) {
      e.preventDefault()
      Session.set('idToEdit', 'false')
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
    console.log(crud.Items.find({}).fetch());
  });
}

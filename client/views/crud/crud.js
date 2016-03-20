

Session.setDefault('toggle', false);
Session.setDefault('idToEdit', null);


Template.crud.onCreated(() => {
  Tracker.autorun(() => {
    Meteor.subscribe('items')
  })
})

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
  'submit .new-item': function (e) {
    e.preventDefault();
    instance = new crud.Item()
    instance.set('itemName', e.target.item.value)
    instance.set('type', e.target.type.value)
    instance.set('ownerId', Meteor.userId())
    Meteor.call('addItem', instance )

    e.target.item.value = "";
    e.target.type.value = "";

  },

  'click #edit': function () {
    Session.set('idToEdit', this.item._id);
  },

  'click #delete': function () {
    Meteor.call('removeItem', this.item._id)
  },

  'click #cancel-edit': function (e) {
    e.preventDefault()
    Session.set('idToEdit', 'false')
  },

  'click #confirm-edit': function () {
    instance = new crud.Item()
    instance.set('itemName', $('.edit-name').val())
    instance.set('type', $('.edit-type').val())
    Meteor.call('editItem', this.item._id, instance)
    Session.set('idToEdit', 'false')
  }

});

Template.row.helpers({
  matching: function (a, b) {
    return a === b;
  }
});

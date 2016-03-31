

Session.setDefault('toggle', false);
Session.setDefault('idToEdit', null);
Session.setDefault('idToDelete', null);


Template.crud.onCreated(() => {
  Tracker.autorun(() => {
    Meteor.subscribe('items')
  })
})

Template.crud.helpers({
  items: function () {
    return crud.Items.find({}).fetch();
  },
  idToEdit: function () {
    return Session.get('idToEdit');
  },
  idToDelete: function () {
    return Session.get('idToDelete');
  }

});


Template.crud.events({
  'submit .new-item': function (e) {
    e.preventDefault();
    instance = {
      'name': e.target.item.value,
      'type': e.target.type.value,
      'ownerId': Meteor.userId(),
      'createdAt': new Date()
    }
    Meteor.call('addItem', instance )

    e.target.item.value = "";
    e.target.type.value = "";

  },

  'click #edit': function () {
    Session.set('idToEdit', this.item._id);
  },

  // 'click #confirm-edit': function () {
  //   instance = new crud.Item()
  //   'name': $('.edit-name').val(),
  //   'type': $('.edit-type').val(),
  //   Meteor.call('editItem', this.item._id, instance)
  //   Session.set('idToEdit', 'false')
  // },

  'click #delete': function () {
    Session.set('idToDelete', this.item._id);
  },

  'click #confirm-delete': function () {
    Meteor.call('removeItem', this.item._id)
  },

  'click .cancel': function (e) {
    e.preventDefault()
    Session.set('idToEdit', 'false')
    Session.set('idToDelete', 'false')
  }

});

Template.row.helpers({
  matching: function (a, b) {
    return a === b;
  }
});

Template.item.helpers({
  matching: function (a, b) {
    return a === b;
  },

  date: (date) => {
    return moment(date).fromNow()
  }
});

Template.edit.helpers({
  matching: function (a, b) {
    return a === b;
  }
});

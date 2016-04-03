

Session.setDefault('toggle', false);
Session.setDefault('idToEdit', null);
Session.setDefault('idToDelete', null);


Template.crud.onCreated(() => {
  Tracker.autorun(() => {
    Meteor.subscribe('items')
  })
})

Template.crud.helpers({

  items:  () => {
    return crud.Items.find({}).fetch();
  },

  idToEdit:  () => {
    return Session.get('idToEdit');
  },

  idToDelete:  () => {
    return Session.get('idToDelete');
  },

});


Template.crud.events({
  'submit .new-item':  (e) => {
    e.preventDefault();
    const instance = {
      'name': e.target.item.value,
      'type': e.target.type.value,
      'ownerId': Meteor.userId(),
      'createdAt': new Date()
    }
    Meteor.call('addItem', instance)

    e.target.item.value = "";
    e.target.type.value = "";

  },

  'click #edit': () => {
    Session.set('idToEdit', this.item._id);
  },

  'click #confirm-edit': () => {
    const instance = {
      'name': $('.edit-name').val(),
      'type': $('.edit-type').val(),
      'createdAt': new Date()
    }
    Meteor.call('editItem', this.item._id, instance)
    Session.set('idToEdit', 'false')
  },

  'click #delete': () => {
    Session.set('idToDelete', this.item._id);
  },

  'click #confirm-delete': () => {
    Meteor.call('removeItem', this.item._id)
  },

  'click .cancel': (e) => {
    e.preventDefault()
    Session.set('idToEdit', 'false')
    Session.set('idToDelete', 'false')
  }

});

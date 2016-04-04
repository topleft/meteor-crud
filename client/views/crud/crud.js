Template.crud.onCreated(function () {
  Tracker.autorun(() => {
    Meteor.subscribe('items')
  })

  this.toggle = new ReactiveVar(false)
  this.idToEdit = new ReactiveVar(false)
  this.idToDelete = new ReactiveVar(false)
  this.showAll = new ReactiveVar(false)

})

Template.crud.helpers({

  items: () => {
    if (Template.instance().showAll.get()) {
      return crud.Items.find({}).fetch();
    }
    else {
      return crud.Items.find({ownerId: Meteor.userId()})
    }
  },

  idToEdit: () => {
    return Template.instance().idToEdit.get();
  },

  idToDelete: () => {
    return Template.instance().idToDelete.get();
  },

  showAll: () => {
    return Template.instance().showAll.get()
  }

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

  'click #edit': function (e) {
    Template.instance().idToEdit.set(this.item._id);
  },

  'click #confirm-edit': function (e) {
    const instance = {
      'name': $('.edit-name').val(),
      'type': $('.edit-type').val(),
      'createdAt': new Date()
    }
    Meteor.call('editItem', this.item._id, instance)
    Template.instance().idToEdit.set('false')
  },

  'click #delete': function (e) {
    Template.instance().idToDelete.set(this.item._id);
  },

  'click #confirm-delete': function (e) {
    Meteor.call('removeItem', this.item._id)
  },

  'click .cancel': function (e) {
    e.preventDefault()
    Template.instance().idToEdit.set('false')
    Template.instance().idToDelete.set('false')
  },

  'change #showAll': function (e) {
    Template.instance().showAll.set(e.target.checked)
  }

});

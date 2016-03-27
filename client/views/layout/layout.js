Template.mainLayout.helpers({
  username: () => {
    return Meteor.user().username
  }
});

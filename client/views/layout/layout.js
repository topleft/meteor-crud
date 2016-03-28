Template.mainLayout.helpers({
  username: () => {
    if (Meteor.user())
      return Meteor.user().username
  }
});

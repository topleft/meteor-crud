
Template.mainLayout.helpers({
  username: () => {
    user = Meteor.user()
    if (user)
      return user.username
  }
});

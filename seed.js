Meteor.startup( () => {

  console.log('in startup');

  console.log("users?", Meteor.users.find().fetch());

  if (Meteor.users.find().fetch().length < 1) {
    seedUsers()
  }

})


seedUsers = () => {

  users = [
    {username: 'admin', password: 'admin', roles: ['admin']}
  ]

  _.forEach(users, (user) => {

    id = Accounts.createUser({
      username: user.username,
      password: user.password
    })

    Roles.addUsersToRoles(id, user.roles)

    console.log('created user')

  })

}

Template.createAccount.events({
  'click .btn': (e) => {
    e.preventDefault()

    const accountDetails = {
      username: $("[name='username']").val(),
      password: $("[name='password']").val(),
    }
    const confirmPassword = $("[name='confirmPassword']").val()

    if (accountDetails.password === confirmPassword) {
      Accounts.createUser(accountDetails, () => {
        console.log('id and pw in event', Meteor.userId(), accountDetails.password);
        Meteor.call('setPassword', Meteor.userId(), accountDetails.password)
      })
    }

  }
})

Template.login.events({
  'click .btn': (e) => {
    e.preventDefault()
    const loginDetails = {
      username: $("[name='username']").val(),
      password: $("[name='password']").val(),
    };
    console.log('deets', loginDetails);

    Meteor.loginWithPassword(loginDetails.username, loginDetails.password, (err) => {
      console.log(Meteor.user())
      if (err) {
        console.log("err?", err);
        // TODO do somthing to show error
      }
    })
  }

})

Template.mainLayout.events({
  'click #logout': (e) => {
    console.log('logout');
    Meteor.logout(() => {
      FlowRouter.go('/')
    })
  }

})

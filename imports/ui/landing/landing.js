
import { Accounts } from 'meteor/accounts-base';
import { Templates } from 'meteor/templating'
import './createAccount.html'
import './login.html'


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

    Meteor.loginWithPassword(loginDetails.username, loginDetails.password, (err) => {
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

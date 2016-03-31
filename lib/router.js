checkLoggedIn = (ctx, redirect) => {
  if (!Meteor.userId()) {
    redirect('/')
  }
}

// checkIsAdmin = (ctx, redirect) => {
//   if !Roles.userIsInRole(Meteor.userId(), 'admin')
//     redirect('/crud')
// }

FlowRouter.route('/', {
  name: 'login',
  action() {
    BlazeLayout.render('mainLayout', { content: 'login' });
  }
})

FlowRouter.route('/create-account', {
  name: 'createAccount',
  action() {
    BlazeLayout.render('mainLayout', { content: 'createAccount' });
  }
})

FlowRouter.route('/crud', {
  name: 'crud',
  triggersEnter: [checkLoggedIn],
  action() {
    BlazeLayout.render('mainLayout', { content: 'crud', nestedTemplate: 'row'});
  }
})




Accounts.onLogin(function () {
  FlowRouter.go('crud')
})

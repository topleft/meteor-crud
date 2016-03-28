checkLoggedIn = (ctx, redirect) => {
  if (!Meteor.userId()) {
    redirect('/')
  }
}

checkIsAdmin = (ctx, redirect) => {
  userId = Metoer.userId()
  if (!Roles.userIsInRole, userId, ['admin'])
    redirect('/no-access')
}


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
    BlazeLayout.render('mainLayout', { content: 'crud'});
  }
})

FlowRouter.route('/admin', {
  name: 'admin',
  triggersEnter: [checkLoggedIn],
  action() {
    BlazeLayout.render('mainLayout', { content: 'crud'});
  }
})

Accounts.onLogin(function () {
  FlowRouter.go('crud')
})

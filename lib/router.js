checkLoggedIn = (ctx, redirect) => {
  if (!Meteor.userId()) {
    redirect('/')
  }
}


FlowRouter.route('/', {
  name: 'landing',
  action() {
    BlazeLayout.render('mainLayout', { content: 'landing' });
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

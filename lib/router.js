FlowRouter.route('/', {
  name: 'landing',
  action() {
    BlazeLayout.render('mainLayout', { content: 'landing' });
  }
})

FlowRouter.route('/crud', {
  name: 'crud',
  action() {
    BlazeLayout.render('mainLayout', { content: 'crud', nestedTemplate: 'row'});
  }
})

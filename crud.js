
if (Meteor.isClient) {
  Session.setDefault('toggle', false);
  Session.setDefault('idToEdit', null);

  Template.crud.helpers({
    items: function () {
      return crud.Items.find({}).fetch();
    },
    toggle: function () {
      return Session.get("toggle");
    },
    idToEdit: function () {
      return Session.get('idToEdit');
    }

  });

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

  Template.crud.events({
    'submit .new-item': function (e) {
      e.preventDefault();

      var item = e.target.item.value;
      var type = e.target.type.value;
      crud.Items.insert({itemName: item, type: type});
      e.target.item.value = "";
      e.target.type.value = "";
    },
    'click #edit': function () {
      Session.set('idToEdit', this.item._id);
    },
    'click #delete': function () {
      crud.Items.remove(this.item._id);
    },
    'click .toggle-edit': function (e) {
      e.preventDefault()
      Session.set('idToEdit', 'false')
    }
  });

  Template.row.helpers({
    editToggle: function () {
      return
    },
    matching: function (a, b) {
      return a === b;
    }
  });


}

if (Meteor.isServer) {
  Meteor.startup(function () {
    console.log(crud.Items.find({}).fetch());
  });


}


if (Meteor.isClient) {

  Session.setDefault('toggle', false);
  Session.setDefault('idToEdit', null);


  Template.crud.onCreated(() => {
    Tracker.autorun(() => {
      Meteor.subscribe('items', () => {
        console.log(crud.Items.find({}).fetch())
      })
    })
  })

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
      instance = new crud.Item()
      instance.set('itemName', e.target.item.value)
      instance.set('type', e.target.type.value)
      instance.set('ownerId', Meteor.userId())
      Meteor.call('addItem', instance )

      e.target.item.value = "";
      e.target.type.value = "";

    },

    'click #edit': function () {
      Session.set('idToEdit', this.item._id);
    },

    'click #delete': function (itemId) {
      Meteor.call('removeItem', this.item._id)
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
  });


}

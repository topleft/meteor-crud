crud.Users = Meteor.users;
crud.User = Astronomy.Class({
  name: 'User',
  collection: crud.Users,
  fields: {
    username: 'string',
    emails: {
      type: 'array',
      nested: {
        name: '_email',
        fields: {
          address: 'string',
          verified: 'boolean'
        }
      }
    },
    roles: {
      type: 'array',
      tested: 'string',
      default: () => []
    }
  }
})

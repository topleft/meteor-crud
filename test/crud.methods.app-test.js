import { chai } from 'meteor/practicalmeteor:chai'

if (Meteor.isServer) {
  describe('item methods', () => {
    describe('sanity', () => {
      it('should pass', () => {
        chai.expect(true).to.equal(true)
      })
    })
  })
}

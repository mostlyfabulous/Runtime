export const withAccount = withTracker((props) => {
  const user = Meteor.isServer ? null : Meteor.user()
  const userId = Meteor.isServer ? null : Meteor.userId()
  return { account: {
    user,
    userId,
    isLoggedIn: !!userId
  } }
})

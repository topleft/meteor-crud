UI.registerHelper('dateFromNow', (date) => {
  return moment(date).fromNow()
})

UI.registerHelper('matching', (a, b) => {
  return a === b
})

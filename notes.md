### React Thoughts

* `state` is where reactive data should be stored
* `props` are for passing data down into a component
  inside of the component definition props are defined and used to render data to the DOM
  props are passed as attributes in the html


Specific to Meteor + React

Meteor data containers are created to hold subscriptions and to create reactive props based on DB changes. Without these containers updates to document wouldn't trigger re-renders of the component and the UI would get stale

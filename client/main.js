import '../imports/ui/crud/crud'
import '../imports/ui/landing/landing'
// import '../imports/ui/layout/layout'

import {Items} from '../imports/ui/crud/item'

import React, {Component, PropTypes}  from 'react'
import {Meteor} from 'meteor/meteor'
import {render} from 'react-dom'

console.log(document.getElementById('render-items'));

Tracker.afterFlush(() => {
  render(<Items />, document.getElementById('render-items'))
})

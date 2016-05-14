import React, {Component, PropTypes}  from 'react'
import {Meteor} from 'meteor/meteor'
import {render} from 'react-dom'
import { Items } from '../../api/items.js'
import moment from 'moment'



export class ReactItems extends Component {
  getItems() {
    return Items.find({ownerId: Meteor.userId()})
  }

  renderItems() {
    return this.getItems().map((item) => (
        <Item key={item._id} item={item}/>
    ));
  }

  render() {
    return (
      <tbody class="container">
          {this.renderItems()}
      </tbody>
    )
  }

}

export class Item extends Component {
  render() {
    return (
      <tr class='row item'>
        <td class="col-xs-3">
          {this.props.item.name}
        </td>
        <td class="col-xs-3">
          {this.props.item.type}
        </td>
        <td class="col-xs-3">
          {moment(this.props.item.createdAt).fromNow()}
        </td>
        <td class="col-xs-2">
          <button id="edit" class="btn btn-small btn-warning full-width">Edit</button>
        </td>
        <td class="col-xs-2">
            <button id="delete" class="btn btn-small btn-danger full-width">Delete</button>
        </td>
      </tr>
    )
  }
}

Item.PropTypes = {
  item: PropTypes.object.isRequired
}

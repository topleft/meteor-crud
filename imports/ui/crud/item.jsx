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
          <ButtonSet/>
        </td>
        <td class="col-xs-2">
          <ButtonSet/>
        </td>
      </tr>
    )
  }
}

Item.PropTypes = {
  item: PropTypes.object.isRequired
}

export class ButtonSet extends Component {

  constructor(props){
    super(props)
    this.props.editingItem = false
  }

  toggleEdit(){
    console.log("hoppy");
    this.props.editingItem = (!this.props.editingItem)
  }

  render(){
    return (
      <span>{
        (this.props.editingItem) ? (<span><button>X</button><button>0</button></span>) :
          (<button onClick={this.toggleEdit.bind(this)}>Delete</button>)
      }</span>
    )
  }

}

ButtonSet.PropTypes = {
  editingItem: PropTypes.bool.isRequired
}

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
          <ButtonSet itemId={this.props.item._id} method={{label: 'Delete', name:'removeItem'}}/>
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
    this.state = {toggle: false}
  }

  toggle(){
    this.setState({toggle: !this.state.toggle})
  }

  handleClick(){
    Meteor.call(this.props.method.name, this.props.itemId)
  }

  render(){
    return (
      <span>{
        (this.state.toggle) ?
        (<span><button onClick={this.toggle.bind(this)}>X</button><button onClick={this.handleClick.bind(this)}>0</button></span>) :
        (<button onClick={this.toggle.bind(this)}>{this.props.method.label}</button>)
      }</span>
    )
  }

}

ButtonSet.PropTypes = {
  itemId: PropTypes.string.isRequired,
  buttonRef: PropTypes.string.isRequired,
  method: PropTypes.object.isRequired
}

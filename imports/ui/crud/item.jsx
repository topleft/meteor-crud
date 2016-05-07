import React, {Component, PropTypes}  from 'react'
import {Meteor} from 'meteor/meteor'
import {render} from 'react-dom'




export class Items extends Component {
  getItems() {
    return [
      {_id: 1, name: 'stuff', type: 'things', createdAt: new Date(), owner: "Ds7DoFdxbPEhwKZQK" },
      {_id: 2, name: 'table', type: 'wood', createdAt: new Date(), owner: "Ds7DoFdxbPEhwKZQK" }
    ]
  }

  renderItems() {
    return this.getItems().map((item) => (
        <Item key={item._id} item={item}/>
    ));
  }

  render() {
    return (
      <div class="container">
        <ul>
          {this.renderItems()}
        </ul>
      </div>
    )
  }

}

export class Item extends Component {
  render() {
    return (
      <li>{this.props.item.name}</li>
    )
  }
}

Item.PropTypes = {
  item: PropTypes.object.isRequired
}

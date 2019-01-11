import React, { Component } from "react";
import FlipMove from "react-flip-move";

class Items extends Component {
  createItems = item => {
    return (
      <li onClick={() => this.delete(item.key)} key={item.key}>
        {item.text}
      </li>
    );
  };

  delete = key => {
    this.props.delete(key);
  };

  render() {
    return (
      <ul>
        <FlipMove duration={150} easing="ease-out">
          {this.props.items.map(this.createItems)}
        </FlipMove>
      </ul>
    );
  }
}
export default Items;

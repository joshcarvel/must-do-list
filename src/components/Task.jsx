import React, { Component } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Draggable } from "react-beautiful-dnd";
import "../Task.css";

class Task extends Component {
  getTaskClass = snapshot => {
    let c = "task ";
    if (snapshot.isDragging) {
      c += "dragging";
    }
    return c;
  };

  render() {
    return (
      <Draggable draggableId={this.props.id} index={this.props.index}>
        {(provided, snapshot) => (
          <div
            className="item-wrapper"
            {...provided.draggableProps}
            {...provided.dragHandleProps}
            ref={provided.innerRef}
            isDragging={snapshot.isDragging}
          >
            <div className="priority-wrapper">
              <div className="priority">{this.props.index + 1}.</div>
            </div>
            <div className="task-wrapper">
              <div className={this.getTaskClass(snapshot)}>
                {this.props.text}
              </div>
              <button
                onClick={() => this.props.delete(this.props.id)}
                className="delete"
              >
                x
              </button>
            </div>
          </div>
        )}
      </Draggable>
    );
  }
}

export default Task;

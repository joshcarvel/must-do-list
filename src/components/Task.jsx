import React, { Component } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Draggable } from "react-beautiful-dnd";

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
            className={this.getTaskClass(snapshot)}
            {...provided.draggableProps}
            {...provided.dragHandleProps}
            ref={provided.innerRef}
            isDragging={snapshot.isDragging}
          >
            {this.props.text}
          </div>
        )}
      </Draggable>

      /*

    <div className="task">
      <div className="priority-wrapper">
        <div className="priority">{id}.</div>
      </div>
      <div className="task">{text}</div>
      <button onClick={() => props.delete(id)}>x</button>
    </div>
    */
    );
  }
}

export default Task;

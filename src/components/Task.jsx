import React, { Component } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Draggable } from "react-beautiful-dnd";
import "../Task.css";

class Task extends Component {
  getTaskClass = (snapshot, task) => {
    let c = "task ";

    if (snapshot.isDragging) {
      c += "dragging ";
    }

    if (task.isDone) {
      c += "done ";
    }

    return c;
  };

  getItemClass = task => {
    let c = "item ";

    if (task.isHidden) {
      c += "hidden ";
    }

    return c;
  };

  render() {
    const { id, index, task, text, prioritised, setStatus } = this.props;

    return (
      <Draggable draggableId={id} index={index}>
        {(provided, snapshot) => (
          <div
            className={this.getItemClass(task)}
            {...provided.draggableProps}
            {...provided.dragHandleProps}
            ref={provided.innerRef}
            isDragging={snapshot.isDragging}
          >
            <div className="priority-wrapper">
              <div className="priority">{index + 1}.</div>
            </div>
            <div className="task-wrapper">
              <div className={this.getTaskClass(snapshot, task)}>{text}</div>
              <button className="mark-done" onClick={() => setStatus(id)}>
                -
              </button>

              {!prioritised && (
                <button
                  onClick={() => this.props.deleteTask(id)}
                  className="delete"
                >
                  x
                </button>
              )}
            </div>
          </div>
        )}
      </Draggable>
    );
  }
}

export default Task;

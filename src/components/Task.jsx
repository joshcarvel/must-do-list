import React, { Component } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Draggable } from "react-beautiful-dnd";

class Task extends Component {
  getTaskClass = (snapshot, task) => {
    let c = "task p-1 border border-secondary rounded ";

    if (snapshot.isDragging) {
      c += "dragging ";
    }

    if (task.isDone) {
      c += "done ";
    }

    return c;
  };

  getItemClass = task => {
    let c = "justify-content-center align-items-center mb-2 ";

    c += task.isHidden ? "d-none " : "d-flex ";

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
            <div className="priority mr-2">{index + 1}.</div>
            <div className={this.getTaskClass(snapshot, task)}>{text}</div>
            <button
              className="mx-2 btn btn-success py-1"
              onClick={() => setStatus(id)}
            >
              &#x2713;
            </button>

            {!prioritised && (
              <button
                onClick={() => this.props.deleteTask(id)}
                className="btn btn-danger py-1"
              >
                x
              </button>
            )}
          </div>
        )}
      </Draggable>
    );
  }
}

export default Task;

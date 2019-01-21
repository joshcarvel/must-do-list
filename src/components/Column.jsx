import React, { Component } from "react";
import Task from "./Task";
import FlipMove from "react-flip-move";
import { Droppable } from "react-beautiful-dnd";
import "../Column.css";

class Column extends Component {
  render() {
    const { tasks, add, deleteTask, prioritised } = this.props;

    return (
      <section className="could-do">
        {!prioritised && <h2>COULD-DO</h2>}
        {prioritised && <h2>MUST-DO</h2>}
        {!prioritised && (
          <form onSubmit={add}>
            <input
              type="text"
              name="listItem"
              placeholder="enter task"
              autoComplete="off"
            />

            <button type="submit" className="add">
              add
            </button>
          </form>
        )}
        {tasks.length < 2 && (
          <p className="instruction">Please enter at least 2 tasks!</p>
        )}
        {!prioritised && tasks.length >= 2 && (
          <button className="toggle" onClick={this.props.convert}>
            Convert
          </button>
        )}
        {prioritised && (
          <button className="toggle" onClick={this.props.restore}>
            Restore to-do list
          </button>
        )}

        <FlipMove duration={150} easing="ease-out">
          <Droppable droppableId="column">
            {provided => (
              <div
                className="task-list"
                ref={provided.innerRef}
                {...provided.droppableProps}
              >
                {tasks.map((task, index) => (
                  <Task
                    task={task}
                    key={task.id}
                    id={task.id}
                    index={index}
                    text={task.text}
                    deleteTask={deleteTask}
                    prioritised={prioritised}
                  />
                ))}
                {provided.placeholder}
              </div>
            )}
          </Droppable>
        </FlipMove>
      </section>
    );
  }
}
export default Column;

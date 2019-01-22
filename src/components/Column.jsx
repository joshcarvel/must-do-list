import React, { Component } from "react";
import Task from "./Task";
import FlipMove from "react-flip-move";
import { Droppable } from "react-beautiful-dnd";
import "../Column.css";

class Column extends Component {
  render() {
    const {
      tasks,
      add,
      deleteTask,
      prioritised,
      weekly,
      one,
      setStatus
    } = this.props;

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

        <div className="buttons-wrapper">
          {tasks.length > 1 && !one && (
            <button className="toggle" onClick={() => this.props.convert(1)}>
              Get priority!
            </button>
          )}
          {tasks.length > 5 && !weekly && (
            <button className="toggle" onClick={() => this.props.convert(5)}>
              Get weekly list
            </button>
          )}
          {prioritised && (
            <button
              className="toggle"
              onClick={() => this.props.convert(tasks.length)}
            >
              Restore to-do list
            </button>
          )}
        </div>

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
                    setStatus={setStatus}
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

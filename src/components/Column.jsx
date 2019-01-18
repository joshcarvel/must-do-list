import React, { Component } from "react";
import Task from "./Task";
import FlipMove from "react-flip-move";
import { Droppable } from "react-beautiful-dnd";
import "../Column.css";

class Column extends Component {
  render() {
    const { tasks, add } = this.props;

    return (
      <section className="could-do">
        <h2>COULD-DO</h2>
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
        <p className="instruction">Please enter at least 2 tasks!</p>

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
                    key={task.id}
                    id={task.id}
                    index={index}
                    text={task.text}
                    delete={this.props.delete}
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

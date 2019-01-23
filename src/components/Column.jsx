import React, { Component } from "react";
import Task from "./Task";
import FlipMove from "react-flip-move";
import { Droppable } from "react-beautiful-dnd";

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
      <section className="row justify-content-center">
        <div className="col-4 text-center p-2 border border-secondary rounded">
          {!prioritised && (
            <form className="d-flex justify-content-center my-3" onSubmit={add}>
              <input
                className="mr-1 p-1"
                type="text"
                name="listItem"
                placeholder="enter task"
                autoComplete="off"
              />

              <button type="submit" className="btn btn-primary add ml-1">
                add
              </button>
            </form>
          )}

          <div className="d-flex justify-content-center">
            {tasks.length < 2 && (
              <p className="py-1 my-2 border border-white ">
                Please enter at least 2 tasks!
              </p>
            )}
            {tasks.length > 1 && !one && (
              <button
                className="toggle btn btn-warning m-2 py-1 px-2"
                onClick={() => this.props.convert(1)}
              >
                See priority
              </button>
            )}
            {tasks.length > 5 && !weekly && (
              <button
                className="toggle btn btn-info m-2 py-1 px-2"
                onClick={() => this.props.convert(5)}
              >
                See top 5
              </button>
            )}
            {prioritised && (
              <button
                className="toggle btn btn-secondary m-2 py-1 px-2"
                onClick={() => this.props.convert(tasks.length)}
              >
                See to-do list
              </button>
            )}
          </div>

          {tasks.length > 0 && !prioritised && (
            <h2 className="my-2">To-do list</h2>
          )}
          {prioritised && (
            <h2 className="my-2">
              <span className="text-danger">MUST-DO </span>list
            </h2>
          )}

          <Droppable droppableId="column">
            {provided => (
              <div
                className="p-2"
                ref={provided.innerRef}
                {...provided.droppableProps}
              >
                <FlipMove duration={100} easing="ease-out">
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
                </FlipMove>
              </div>
            )}
          </Droppable>
        </div>
      </section>
    );
  }
}
export default Column;

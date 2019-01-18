import React, { Component } from "react";
import Column from "./components/Column";
import "./App.css";
import { DragDropContext } from "react-beautiful-dnd";

class App extends Component {
  state = {
    tasks: []
  };

  addTask = e => {
    e.preventDefault();

    if (e.target.elements.listItem.value !== "") {
      const newTask = {
        text: e.target.elements.listItem.value,
        id: this.state.tasks.length + 1
      };

      const tasks = [...this.state.tasks];
      tasks.push(newTask);

      this.setState({
        tasks
      });
    }

    e.target.elements.listItem.value = "";
  };

  deleteTask = id => {
    const tasks = this.state.tasks.filter(task => task.id !== id);
    this.setState({ tasks });
  };

  onDragEnd = result => {
    const { destination, source } = result;

    if (!destination) {
      return;
    }

    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    )
      return;

    const tasks = [...this.state.tasks];
    tasks.splice(source.index, 1);
    tasks.splice(destination.index, 0, this.state.tasks[source.index]);

    this.setState({
      tasks
    });
  };

  render() {
    return (
      <div className="App">
        <header>
          <h1>THE MUST-DO LIST</h1>
          <h2 className="subtitle">Identify your priorities</h2>
        </header>
        <main>
          <DragDropContext onDragEnd={this.onDragEnd}>
            <Column
              tasks={this.state.tasks}
              delete={this.deleteTask}
              add={this.addTask}
            />
          </DragDropContext>
        </main>
      </div>
    );
  }
}

export default App;

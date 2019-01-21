import React, { Component } from "react";
import Column from "./components/Column";
import "./App.css";
import { DragDropContext } from "react-beautiful-dnd";

class App extends Component {
  state = {
    tasks: [],
    count: 0
  };

  addTask = e => {
    e.preventDefault();

    let count = this.state.count;

    if (e.target.elements.listItem.value !== "") {
      const newTask = {
        text: e.target.elements.listItem.value,
        id: count + 1
      };

      count++;

      const tasks = [...this.state.tasks];
      tasks.push(newTask);

      this.setState({
        tasks,
        count
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

  convert = () => {
    const tasks = [...this.state.tasks];

    if (tasks.length > 1) {
      for (let i = 1; i < tasks.length; i++) {
        tasks[i].isFiltered = true;
      }
    }

    this.setState({ tasks, isPrioritised: true });
  };

  restore = () => {
    const tasks = [...this.state.tasks];

    for (let i = 1; i < tasks.length; i++) {
      tasks[i].isFiltered = false;
    }

    this.setState({ tasks, isPrioritised: false });
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
              deleteTask={this.deleteTask}
              add={this.addTask}
              convert={this.convert}
              restore={this.restore}
              prioritised={this.state.isPrioritised}
            />
          </DragDropContext>
        </main>
      </div>
    );
  }
}

export default App;

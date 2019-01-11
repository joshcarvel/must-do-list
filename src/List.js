import React, { Component } from "react";
import Items from "./Items";
import "./List.css";

class List extends Component {
  state = {
    items: []
  };

  addItem = e => {
    e.preventDefault();

    if (e.target.elements.listItem.value !== "") {
      const newItem = {
        text: e.target.elements.listItem.value,
        key: Date.now()
      };

      const items = [...this.state.items];
      items.push(newItem);

      this.setState({
        items
      });
    }

    e.target.elements.listItem.value = "";
  };

  deleteItem = key => {
    const items = this.state.items.filter(item => item.key !== key);
    this.setState({ items });
  };

  render() {
    return (
      <div className="App">
        <header>
          <h1>THE MUST-DO LIST</h1>
          <h2 className="subtitle">Identify your priorities</h2>
        </header>
        <main>
          <section className="could-do">
            <h2>COULD-DO</h2>
            <form onSubmit={this.addItem}>
              <input
                size="5"
                type="text"
                name="listItem"
                placeholder="enter task"
              />
              <button type="submit">add</button>
            </form>
            <Items items={this.state.items} delete={this.deleteItem} />
          </section>
          <section className="must-do">
            <h2>MUST-DO</h2>
          </section>
        </main>
      </div>
    );
  }
}

export default List;

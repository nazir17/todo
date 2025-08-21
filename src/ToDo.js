import React, { Component } from "react";
import "./ToDo.css";

class ToDo extends Component {
  constructor(props) {
    super(props);
    this.state = {
      todos: [],
      newTodo: "",
      error: "",
    };
  }

  handleChange = (event) => {
    this.setState({ newTodo: event.target.value, error: "" });
  };

  handleAdd = (event) => {
    event.preventDefault();
    const text = this.state.newTodo.trim();
    if (!text) {
      this.setState({ error: "Todo cannot be empty!" });
      return;
    }

    const currentDate = new Date();
    const dateTime = currentDate.toLocaleString();

    const newTodo = {
      id: Date.now(),
      text,
      completed: false,
      isEditing: false,
      dateTime: dateTime
    };
    this.setState((prev) => ({
      todos: [...prev.todos, newTodo],
      newTodo: "",
      error: "",
    }));
  };

  handleToggle = (id) => {
    this.setState((prev) => ({
      todos: prev.todos.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      ),
    }));
  };

  handleDelete = (id) => {
    this.setState((prev) => ({
      todos: prev.todos.filter((todo) => todo.id !== id),
    }));
  };

  handleEditToggle = (id) => {
    this.setState((prev) => ({
      todos: prev.todos.map((todo) =>
        todo.id === id ? { ...todo, isEditing: !todo.isEditing } : todo
      ),
    }));
  };

  handleEditChange = (id, newText) => {
    this.setState((prev) => ({
      todos: prev.todos.map((todo) =>
        todo.id === id ? { ...todo, text: newText } : todo
      ),
    }));
  };

  handleEditSave = (id) => {
    this.setState((prev) => ({
      todos: prev.todos.map((todo) =>
        todo.id === id ? { ...todo, isEditing: false } : todo
      ),
    }));
  };

  formatDate = (date) => {
    return new Date(date).toLocaleString();
  };

  render() {
    const { todos, newTodo, error } = this.state;

    return (
      <div className="app">
        <h1 className="title">Todo App</h1>

        <form className="todo-form" onSubmit={this.handleAdd}>
          <input
            type="text"
            className={`todo-input ${error ? "input-error" : ""}`}
            placeholder="Add a new todo..."
            value={newTodo}
            onChange={this.handleChange}
          />

          <button className="add-btn" type="submit">
            Add
          </button>
        </form>

        {error && <p className="error">{error}</p>}

        {todos.length === 0 ? (
          <p className="empty">No todos yet.</p>
        ) : (
          <ul className="todo-list">
            {todos.map((t) => (
              <li
                key={t.id}
                className={`todo-item ${t.completed ? "completed" : ""}`}
              >
                <div className="todo-left">
                  <input
                    type="checkbox"
                    checked={t.completed}
                    onChange={() => this.handleToggle(t.id)}
                  />
                  {t.isEditing ? (
                    <input
                      type="text"
                      className="edit-input"
                      value={t.text}
                      onChange={(e) =>
                        this.handleEditChange(t.id, e.target.value)
                      }
                    />
                  ) : (
                    <>
                      <span>{t.text}</span>
                      <small className="todo-date">
                        {t.dateTime}
                      </small>
                    </>
                  )}
                </div>

                <div className="actions">
                  {t.isEditing ? (
                    <button
                      className="save-btn"
                      onClick={() => this.handleEditSave(t.id)}
                    >
                      Save
                    </button>
                  ) : (
                    <button
                      className="edit-btn"
                      onClick={() => this.handleEditToggle(t.id)}
                    >
                      Edit
                    </button>
                  )}
                  <button
                    className="delete-btn"
                    onClick={() => this.handleDelete(t.id)}
                  >
                    Delete
                  </button>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    );
  }
}

export default ToDo;

import React, { Component } from "react";
// import "./ToDo.css";

class ToDo extends Component {
    constructor(props) {
        super(props);
        this.state = {
        todos: [],
        newTodo: ""   
        };
    }

    handleChange = (event) => {
        this.setState({ newTodo: event.target.value });
    };

    handleAdd = (event) => {
        event.preventDefault();
        const text = this.state.newTodo.trim();
        if (!text) return;

        const newTodo = { id: Date.now(), text, completed: false };
        this.setState((prev) => ({
        todos: [...prev.todos, newTodo],
        newTodo: ""
        }));
    };

    handleToggle = (id) => {
        this.setState((prev) => ({
        todos: prev.todos.map((todo) =>
            todo.id === id ? { ...todo, completed: !todo.completed } : todo
        )
        }));
    };

    handleDelete = (id) => {
        this.setState((prev) => ({
        todos: prev.todos.filter((todo) => todo.id !== id)
        }));
    };  

    render() {
        const { todos, newTodo } = this.state;

        return (
        <div className="app">
            <h1 className="title">Todo App</h1>

            <form className="todo-form" onSubmit={this.handleAdd}>
            <input
                type="text"
                className="todo-input"
                placeholder="Add a new todo..."
                value={newTodo}
                onChange={this.handleChange}
            />
            
            <button className="add-btn" type="submit">Add</button>
            </form>
                {todos.length === 0 ? (
                    <p className="empty">No todos yet.</p>
                ) : (
            <ul className="todo-list">
                {todos.map((t) => (
                    <li key={t.id} className={`todo-item ${t.completed ? "completed" : ""}`}>
                        <input
                            type="checkbox"
                            checked={t.completed}
                            onChange={() => this.handleToggle(t.id)}
                        />
                        <span>{t.text}</span>
                        <button className="delete-btn" onClick={() => this.handleDelete(t.id)}>
                            x
                        </button>
                </li>
                ))}
            </ul>
            )}
        </div>
        );
    }
}

export default ToDo;

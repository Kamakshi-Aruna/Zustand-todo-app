import React, { useState } from 'react';
import useStore from './store';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

function App() {
  const [newTodo, setNewTodo] = useState('');
  const [editMode, setEditMode] = useState(false);
  const [editTodoId, setEditTodoId] = useState(null);
  const { todos, addTodo, removeTodo, updateTodo } = useStore();

  const handleAddTodo = () => {
    if (newTodo.trim()) {
      const id = Date.now();
      addTodo({ id, text: newTodo });
      setNewTodo('');
    }
  };

  const handleRemoveTodo = (id) => {
    removeTodo(id);
  };

  const handleEditTodo = (id, text) => {
    setEditMode(true);
    setEditTodoId(id);
    setNewTodo(text);
  };

  const handleUpdateTodo = () => {
    if (newTodo.trim()) {
      updateTodo(editTodoId, newTodo);
      setNewTodo('');
      setEditMode(false);
      setEditTodoId(null);
    }
  };

  return (
    <div className="container">
      <h1>To-Do List</h1>

      <div className="d-flex mt-3">
        <input
          type="text"
          className="form-control"
          value={newTodo}
          onChange={(e) => setNewTodo(e.target.value)}
          placeholder="Add a new task"
        />
        <button
          className="btn btn-primary"
          onClick={editMode ? handleUpdateTodo : handleAddTodo}
        >
          {editMode ? 'Update Task' : 'Add Task'}
        </button>
      </div>

      <ul className="list-group mt-4">
        {todos.map((todo) => (
          <li className="list-group-item d-flex justify-content-between align-items-center" key={todo.id}>
            {todo.text}
            <div>
              <button
                className="btn btn-warning btn-sm mr-2"
                onClick={() => handleEditTodo(todo.id, todo.text)}
              >
                Edit
              </button>
              <button
                className="btn btn-danger btn-sm"
                onClick={() => handleRemoveTodo(todo.id)}
              >
                Delete
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;

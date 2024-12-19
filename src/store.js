import { create } from 'zustand';

// Helper function to load data from localStorage
const loadTodosFromLocalStorage = () => {
  const todos = JSON.parse(localStorage.getItem('todos'));
  return todos || [];
};

// Helper function to save data to localStorage
const saveTodosToLocalStorage = (todos) => {
  localStorage.setItem('todos', JSON.stringify(todos));
};

const useStore = create((set) => ({
  todos: loadTodosFromLocalStorage(),
  
  addTodo: (todo) => {
    set((state) => {
      const updatedTodos = [...state.todos, todo];
      saveTodosToLocalStorage(updatedTodos);
      return { todos: updatedTodos };
    });
  },

  removeTodo: (id) => {
    set((state) => {
      const updatedTodos = state.todos.filter((todo) => todo.id !== id);
      saveTodosToLocalStorage(updatedTodos);
      return { todos: updatedTodos };
    });
  },

  updateTodo: (id, updatedText) => {
    set((state) => {
      const updatedTodos = state.todos.map((todo) =>
        todo.id === id ? { ...todo, text: updatedText } : todo
      );
      saveTodosToLocalStorage(updatedTodos);
      return { todos: updatedTodos };
    });
  },
}));

export default useStore;

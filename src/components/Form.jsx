import React, { useState, useEffect, useRef } from "react";
import TodoCreator from "./FormInput.jsx";
import TodoList from "./List.jsx";
import { createTheme } from "@mui/material/styles";

const theme = createTheme({
  palette: {
    primary: { main: "#000000" },
  },
});

const Form = () => {
  const [newTodo, setNewTodo] = useState("");
  const [todos, setTodos] = useState([
    {
      text: "Learn about React",
      isCompleted: false,
      isEditing: false,
      createdAt: new Date(),
    },
    {
      text: "Create A React Project",
      isCompleted: false,
      isEditing: false,
      createdAt: new Date(),
    },
    {
      text: "Build a todo app",
      isCompleted: false,
      isEditing: false,
      createdAt: new Date(),
    },
  ]);
  const inputRef = useRef();
  const noteRef = useRef({});
  const [isInputEmpty, setInputEmpty] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    addTodo(newTodo);
    clearInput();
    inputRef.current.focus();
  };

  const preventSubmit = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
    }
  };

  const addTodo = (text) => {
    if (text.trim() !== "") {
      const newTodo = {
        text: text,
        isCompleted: false,
        isEditing: false,
        createdAt: new Date(),
      };
      const newTodos = [...todos, newTodo];
      setTodos(newTodos);
      clearInput();
    } else {
      setInputEmpty(true);
    }
  };

  const removeTodo = (index) => {
    const newTodos = [...todos.slice(0, index), ...todos.slice(index + 1)];
    setTodos(newTodos);
  };

  const completeTodo = (index) => {
    const newTodos = [...todos];
    newTodos[index] = {
      ...newTodos[index],
      isCompleted: !newTodos[index].isCompleted,
    };
    setTodos(newTodos);
  };

  const editTodo = (index) => {
    const newTodos = [...todos];
    newTodos[index] = {
      ...newTodos[index],
      isEditing: !newTodos[index].isEditing,
    };
    setTodos(newTodos);
  };

  const saveTodo = (index, newText) => {
    const newTodos = [...todos];
    newTodos[index] = {
      ...newTodos[index],
      isEditing: false,
      text: newText,
    };
    setTodos(newTodos);
  };

  const clearInput = () => {
    setNewTodo("");
  };

  const setTodo = (todo) => {
    setInputEmpty(false);
    setNewTodo(todo);
  };

  useEffect(() => {}, [todos]);

  return (
    <form onSubmit={handleSubmit} className="form">
      <TodoCreator
        theme={theme}
        todo={newTodo}
        setTodo={setTodo}
        clearInput={clearInput}
        inputRef={inputRef}
        isInputEmpty={isInputEmpty}
        preventSubmit={preventSubmit}
      />

      <TodoList
        theme={theme}
        todos={todos}
        completeTodo={completeTodo}
        editTodo={editTodo}
        deleteTodo={removeTodo}
        saveTodo={saveTodo}
        noteRef={noteRef}
        preventSubmit={preventSubmit}
        setNewTodo={setNewTodo}
        setTodos={setTodos}
        setInputEmpty={setInputEmpty}
      />
    </form>
  );
};

export default Form;

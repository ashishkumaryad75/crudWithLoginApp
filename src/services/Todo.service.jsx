import { useState, useEffect } from "react";
import axios from "axios";

const BASE_URL = import.meta.env.VITE_BASE_URL;

const useTodoService = () => {
  const [todos, setTodos] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchTodos = async () => {
    setLoading(true);
    try {
      const response = await axios.get(BASE_URL);
      setTodos(response.data);
    } catch (err) {
      setError(err);
    } finally {
      setLoading(false);
    }
  };

  const addTodo = async (todo) => {
    setLoading(true);
    try {
      const response = await axios.post(BASE_URL, todo);
      setTodos([...todos, response?.data]);
    } catch (err) {
      console.log(err);
      setError(err);
    } finally {
      setLoading(false);
    }
  };

  const deleteTodo = async (id) => {
    setLoading(true);
    try {
      await axios.delete(`${BASE_URL}/${id}`);
      setTodos(todos.filter((todo) => todo.id !== id));
    } catch (err) {
      setError(err);
    } finally {
      setLoading(false);
    }
  };

  const updateTodo = async (id, updatedTodo) => {
    setLoading(true);
    try {
      const response = await axios.put(`${BASE_URL}/${id}`, updatedTodo);
      setTodos(
        todos.map((todo) =>
          todo.id === id ? { ...todo, ...response.data } : todo
        )
      );
    } catch (err) {
      setError(err);
    } finally {
      setLoading(false);
    }
  };

  const toggleTodoCompletion = async (id, completed) => {
    setLoading(true);
    try {
      const response = await axios.patch(`${BASE_URL}/${id}`, { completed });
      setTodos(
        todos.map((todo) =>
          todo.id === id ? { ...todo, ...response.data } : todo
        )
      );
    } catch (err) {
      setError(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTodos();
  }, []);

  return {
    todos,
    loading,
    error,
    fetchTodos,
    addTodo,
    deleteTodo,
    updateTodo,
    toggleTodoCompletion,
  };
};

export default useTodoService;

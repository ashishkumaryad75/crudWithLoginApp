import { renderHook, act } from "@testing-library/react-hooks";
import axios from "axios";
import useTodoService from "./Todo.service";
import { describe, it, expect, beforeEach, vi } from "vitest";

vi.mock("axios");

describe("useTodoService", () => {
  beforeEach(() => {
    axios.get.mockReset();
    axios.post.mockReset();
    axios.delete.mockReset();
    axios.put.mockReset();
    axios.patch.mockReset();
  });

  it("should fetch todos", async () => {
    const todos = [{ id: 1, title: "Test Todo", completed: false }];
    axios.get.mockResolvedValue({ data: todos });

    const { result, waitForNextUpdate } = renderHook(() => useTodoService());

    await waitForNextUpdate();

    expect(result.current.todos).toEqual(todos);
    expect(result.current.loading).toBe(false);
    expect(result.current.error).toBe(null);
  });

  it("should add a todo", async () => {
    const newTodo = { id: 2, title: "New Todo", completed: false };
    axios.post.mockResolvedValue({ data: newTodo });

    const { result, waitForNextUpdate } = renderHook(() => useTodoService());

    await waitForNextUpdate();

    await act(async () => {
      await result.current.addTodo({
        title: "New Todo",
        completed: false,
      });
    });
    expect(result.current.todos).toContainEqual(newTodo);
    expect(result.current.loading).toBe(false);
  });

  it("should delete a todo", async () => {
    const todos = [{ id: 1, title: "Test Todo", completed: false }];
    axios.get.mockResolvedValue({ data: todos });
    axios.delete.mockResolvedValue({});

    const { result, waitForNextUpdate } = renderHook(() => useTodoService());

    await waitForNextUpdate();

    await act(async () => {
      await result.current.deleteTodo(1);
    });

    expect(result.current.todos).toEqual([]);
    expect(result.current.loading).toBe(false);
    expect(result.current.error).toBe(null);
  });

  it("should update a todo", async () => {
    const todos = [{ id: 1, title: "Test Todo", completed: false }];
    const updatedTodo = { id: 1, title: "Updated Todo", completed: false };
    axios.get.mockResolvedValue({ data: todos });
    axios.put.mockResolvedValue({ data: updatedTodo });

    const { result, waitForNextUpdate } = renderHook(() => useTodoService());

    await waitForNextUpdate();

    await act(async () => {
      await result.current.updateTodo(1, { title: "Updated Todo" });
    });

    expect(result.current.todos).toContainEqual(updatedTodo);
    expect(result.current.loading).toBe(false);
    expect(result.current.error).toBe(null);
  });

  it("should toggle todo completion", async () => {
    const todos = [{ id: 1, title: "Test Todo", completed: false }];
    const updatedTodo = { id: 1, title: "Test Todo", completed: true };
    axios.get.mockResolvedValue({ data: todos });
    axios.patch.mockResolvedValue({ data: updatedTodo });

    const { result, waitForNextUpdate } = renderHook(() => useTodoService());

    await waitForNextUpdate();

    await act(async () => {
      await result.current.toggleTodoCompletion(1, false);
    });

    expect(result.current.todos).toContainEqual(updatedTodo);
    expect(result.current.loading).toBe(false);
    expect(result.current.error).toBe(null);
  });
});

// // todoService.test.js
// import { test, expect } from "vitest";
// import axios from "axios";
// import {
//   fetchTodos,
//   addTodo,
//   deleteTodo,
//   updateTodo,
//   toggleTodoCompletion,
// } from "./Todo.service";

// test("fetchTodos - success", async () => {
//   // Mock Axios response for fetchTodos
//   const mockTodos = [{ id: 1, title: "Todo 1", completed: false }];
//   const mockAxios = {
//     get: async () => ({ data: mockTodos }),
//     post: async () => {},
//     delete: async () => {},
//     put: async () => {},
//     patch: async () => {},
//   };

//   // Mock axios inside fetchTodos function
//   axios.get = mockAxios.get;

//   const result = await fetchTodos();

//   expect(result.data).toEqual(mockTodos);
// });

// test("addTodo - success", async () => {
//   const newTodo = { title: "New Todo", completed: false };
//   const mockResponse = { data: { ...newTodo, id: 1 } };
//   const mockAxios = {
//     get: async () => {},
//     post: async () => ({ data: mockResponse }),
//     delete: async () => {},
//     put: async () => {},
//     patch: async () => {},
//   };

//   // Mock axios inside addTodo function
//   axios.post = mockAxios.post;

//   const result = await addTodo(newTodo);

//   expect(result.data).toEqual(mockResponse);
// });

// test("deleteTodo - success", async () => {
//   const todoId = 1;
//   const mockAxios = {
//     get: async () => {},
//     post: async () => {},
//     delete: async () => {},
//     put: async () => {},
//     patch: async () => {},
//   };

//   // Mock axios inside deleteTodo function
//   axios.delete = mockAxios.delete;

//   const result = await deleteTodo(todoId);

//   expect(result).toBeUndefined();
// });

// test("updateTodo - success", async () => {
//   const todoId = 1;
//   const updatedTodo = { title: "Updated Todo", completed: true };
//   const mockResponse = { data: updatedTodo };
//   const mockAxios = {
//     get: async () => {},
//     post: async () => {},
//     delete: async () => {},
//     put: async () => ({ data: mockResponse }),
//     patch: async () => {},
//   };

//   // Mock axios inside updateTodo function
//   axios.put = mockAxios.put;

//   const result = await updateTodo(todoId, updatedTodo);

//   expect(result.data).toEqual(mockResponse);
// });

// test("toggleTodoCompletion - success", async () => {
//   const todoId = 1;
//   const completed = false;
//   const mockResponse = { data: { id: 1, completed: !completed } };
//   const mockAxios = {
//     get: async () => {},
//     post: async () => {},
//     delete: async () => {},
//     put: async () => {},
//     patch: async () => ({ data: mockResponse }),
//   };

//   // Mock axios inside toggleTodoCompletion function
//   axios.patch = mockAxios.patch;

//   const result = await toggleTodoCompletion(todoId, completed);

//   expect(result.data).toEqual(mockResponse);
// });

// TodoServiceMock.js

export const fetchTodosMock = () => Promise.resolve({ data: [] });

export const addTodoMock = (todo) =>
  Promise.resolve({ status: 201, data: { ...todo, id: "mockedId" } });

export const deleteTodoMock = (id) => Promise.resolve({ status: 200 });

export const updateTodoMock = (id, todo) => Promise.resolve({ status: 200 });

export const toggleTodoCompletionMock = (id, completed) =>
  Promise.resolve({ status: 200 });

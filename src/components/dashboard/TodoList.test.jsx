import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { vi } from "vitest";
import TodoList from "./TodoList";
import useTodoService from "../../services/Todo.service.jsx";

// Mock the custom hook
vi.mock("../../services/Todo.service.jsx", () => ({
  default: vi.fn(),
}));

// Mock the styles hook
vi.mock("./TodoList.style.jsx", () => ({
  useStyles: () => ({
    addForm: "addForm",
    inputField: "inputField",
    tablestyle: "tablestyle",
    head: "head",
  }),
}));

describe("TodoList", () => {
  let mockUseTodoService;

  beforeEach(() => {
    mockUseTodoService = {
      todos: [],
      loading: false,
      error: null,
      addTodo: vi.fn(),
      deleteTodo: vi.fn(),
      updateTodo: vi.fn(),
      toggleTodoCompletion: vi.fn(),
    };
    useTodoService.mockReturnValue(mockUseTodoService);
  });

  it("renders the component", () => {
    render(<TodoList />);
    // expect(screen.getByText("")).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: /ADD TODO/i })
    ).toBeInTheDocument();
  });

  it("adds a new todo", async () => {
    render(<TodoList />);
    const input = screen.getByTestId("new-todo-input");
    const addButton = screen.getByRole("button", { name: /ADD TODO/i });

    fireEvent.change(input, { target: { value: "New Todo" } });
    fireEvent.click(addButton);

    await waitFor(() => {
      expect(mockUseTodoService.addTodo).toHaveBeenCalledWith({
        title: "New Todo",
        completed: false,
      });
    });
  });

  it("handles errors correctly", () => {
    mockUseTodoService.error = { message: "Failed to fetch" };
    render(<TodoList />);
    expect(screen.getByText("Error: Failed to fetch")).toBeInTheDocument();
  });

  it("displays loading state", () => {
    mockUseTodoService.loading = true;
    render(<TodoList />);
    expect(screen.getByText("Loading...")).toBeInTheDocument();
  });

  it("renders todos in reverse order", () => {
    mockUseTodoService.todos = [
      { id: 1, title: "First Todo", completed: false },
      { id: 2, title: "Second Todo", completed: false },
    ];
    render(<TodoList />);
    const todoItems = screen.getAllByRole("row");
    expect(todoItems[1]).toHaveTextContent("Second Todo");
    expect(todoItems[2]).toHaveTextContent("First Todo");
  });

  it("deletes a todo", async () => {
    mockUseTodoService.todos = [
      { id: 1, title: "First Todo", completed: false },
    ];
    render(<TodoList />);
    const deleteButton = screen.getByTitle("Click to Delete");

    fireEvent.click(deleteButton);

    await waitFor(() => {
      expect(mockUseTodoService.deleteTodo).toHaveBeenCalledWith(1);
    });
  });

  it("edits a todo", async () => {
    mockUseTodoService.todos = [
      { id: 1, title: "First Todo", completed: false },
    ];
    render(<TodoList />);
    const editButton = screen.getByRole("button", { name: /Edit/i });
    fireEvent.click(editButton);

    const input = screen.getByDisplayValue("First Todo");
    fireEvent.change(input, { target: { value: "Updated Todo" } });
    const saveButton = screen.getByRole("button", { name: /Save/i });

    fireEvent.click(saveButton);

    await waitFor(() => {
      expect(mockUseTodoService.updateTodo).toHaveBeenCalledWith(1, {
        title: "Updated Todo",
      });
    });
  });

  it("toggles todo completion", async () => {
    mockUseTodoService.todos = [
      { id: 1, title: "First Todo", completed: false },
    ];
    render(<TodoList />);
    const toggleButton = screen.getByTitle("Click to Mark Done");

    fireEvent.click(toggleButton);

    await waitFor(() => {
      expect(mockUseTodoService.toggleTodoCompletion).toHaveBeenCalledWith(
        1,
        true
      );
    });
  });
});

import React, { Fragment, useState } from "react";
import {
  TableBody,
  TableCell,
  TableContainer,
  Table,
  TableHead,
  TableRow,
} from "@material-ui/core";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import useTodoService from "../../services/Todo.service.jsx";
import { useStyles } from "./TodoList.style.jsx";
import TodoItem from "./TodoItem.jsx";
import AddTodo from "./AddTodo.jsx";

const TodoList = () => {
  const styles = useStyles();
  const {
    todos,
    loading,
    error,
    addTodo,
    deleteTodo,
    updateTodo,
    toggleTodoCompletion,
  } = useTodoService();
  const [editItemId, setEditItemId] = useState(null);
  const [editText, setEditText] = useState("");
  const [newTodoTitle, setNewTodoTitle] = useState("");

  const handleAddTodo = () => {
    if (newTodoTitle.trim()) {
      addTodo({ title: newTodoTitle, completed: false });
      toast.success("Todo Added!", { autoClose: 1200 });
      setNewTodoTitle("");
    }
  };

  const handleEditStart = (id, title) => {
    setEditItemId(id);
    setEditText(title);
  };

  const handleEditSave = (id) => {
    updateTodo(id, { title: editText });
    toast.success("Todo Updated!", { autoClose: 1200 });
    setEditItemId(null);
    setEditText("");
  };

  const handleEditCancel = () => {
    setEditItemId(null);
    setEditText("");
  };

  const handleDeleteTodo = (id) => {
    deleteTodo(id);
    toast.success("Todo Deleted Successfully!", { autoClose: 1200 });
  };

  const handleToggleCompletion = (id, completed) => {
    toggleTodoCompletion(id, !completed);
    !completed
      ? toast.success("Todo Completed!", { autoClose: 1200 })
      : toast.success("Todo Mark Undone!", { autoClose: 1200 });
  };

  if (error) return <p>Error: {error.message}</p>;

  return (
    <Fragment>
      {/* AddTodo Component */}
      <AddTodo
        setNewTodoTitle={setNewTodoTitle}
        newTodoTitle={newTodoTitle}
        handleAddTodo={handleAddTodo}
      />

      <TableContainer className={styles.tablestyle}>
        <Table sx={{ minWidth: 650 }}>
          <TableHead className={styles.head}>
            <TableRow>
              <TableCell>Todo Title</TableCell>
              <TableCell>Mark Complete</TableCell>
              <TableCell>Remove</TableCell>
              <TableCell>Edit</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {todos
              .slice()
              .reverse()
              .map((elem) => (
                <TodoItem
                  todo={elem}
                  key={elem.id}
                  deleteHandler={() => handleDeleteTodo(elem.id)}
                  toggleCompletion={() =>
                    handleToggleCompletion(elem.id, elem.completed)
                  }
                  handleEditStart={handleEditStart}
                  handleEditSave={handleEditSave}
                  handleEditCancel={handleEditCancel}
                  editItemId={editItemId}
                  editText={editText}
                  setEditText={setEditText}
                />
              ))}
          </TableBody>
        </Table>
      </TableContainer>
      {loading && <p>Loading...</p>}
      <ToastContainer />
    </Fragment>
  );
};

export default TodoList;

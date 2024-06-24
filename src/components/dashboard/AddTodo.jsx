import { TextField, Button } from "@material-ui/core";
import { AddCircleOutlineRounded } from "@material-ui/icons";
import { useStyles } from "./TodoList.style.jsx";

const AddTodo = ({ setNewTodoTitle, newTodoTitle, handleAddTodo }) => {
  const styles = useStyles();

  return (
    <>
      <div className={styles.addForm}>
        <TextField
          label="Add New Todo"
          variant="outlined"
          value={newTodoTitle}
          onChange={(e) => setNewTodoTitle(e.target.value)}
          className={styles.inputField}
          data-testid="new-todo-input"
        />
        <Button
          variant="contained"
          color="primary"
          onClick={handleAddTodo}
          startIcon={<AddCircleOutlineRounded />}
        >
          ADD TODO
        </Button>
      </div>
    </>
  );
};

export default AddTodo;

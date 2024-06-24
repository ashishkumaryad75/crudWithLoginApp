import {
  IconButton,
  TableCell,
  TableRow,
  TextField,
  Tooltip,
} from "@material-ui/core";
import { useStyles } from "./TodoList.style.jsx";
import {
  CheckBoxOutlined,
  CheckOutlined,
  ClearOutlined,
  DeleteOutlineOutlined,
  DoneAllTwoTone,
  EditOutlined,
} from "@material-ui/icons";

const TodoItem = ({
  todo,
  deleteHandler,
  toggleCompletion,
  handleEditStart,
  handleEditSave,
  handleEditCancel,
  editItemId,
  editText,
  setEditText,
}) => {
  const styles = useStyles();

  return (
    <>
      <TableRow key={todo.id} className={todo.completed ? styles.complete : ""}>
        <TableCell>
          {editItemId === todo.id ? (
            <TextField
              value={editText}
              onChange={(e) => setEditText(e.target.value)}
              fullWidth
            />
          ) : (
            todo.title
          )}
        </TableCell>
        <TableCell>
          <Tooltip title="Click to Mark Done" placement="top">
            {todo.completed === true ? (
              <IconButton
                color="primary"
                onClick={() => toggleCompletion(todo.id, todo.completed)}
              >
                <DoneAllTwoTone />
              </IconButton>
            ) : (
              <IconButton
                color="primary"
                onClick={() => toggleCompletion(todo.id, todo.completed)}
              >
                <CheckOutlined />
              </IconButton>
            )}
          </Tooltip>{" "}
        </TableCell>
        <TableCell>
          {/* Button For Delete TOdo */}
          <Tooltip title="Click to Delete" placement="top">
            <IconButton
              color="primary"
              onClick={(e) => deleteHandler(e, todo.id)}
            >
              <DeleteOutlineOutlined />
            </IconButton>
          </Tooltip>{" "}
        </TableCell>
        <TableCell>
          {editItemId === todo.id ? (
            // when Edit Mode is ON
            <>
              <Tooltip title="Click to Save" placement="top">
                <IconButton
                  color="primary"
                  onClick={() => handleEditSave(todo.id)}
                >
                  <CheckBoxOutlined />
                </IconButton>
              </Tooltip>

              <Tooltip title="Click to Cancel Edit" placement="top">
                <IconButton color="secondary" onClick={handleEditCancel}>
                  <ClearOutlined />
                </IconButton>
              </Tooltip>
            </>
          ) : (
            // Edit Button when Edit Mode is OFF
            <Tooltip title="Click to Edit" placement="top">
              <IconButton
                color="primary"
                onClick={() => handleEditStart(todo.id, todo.title)}
              >
                <EditOutlined />
              </IconButton>
            </Tooltip>
          )}
        </TableCell>
      </TableRow>
    </>
  );
};

export default TodoItem;

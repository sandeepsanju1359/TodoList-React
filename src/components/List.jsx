import React from "react";
import { styled, ThemeProvider, createTheme } from "@mui/material/styles";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemSecondaryAction from "@mui/material/ListItemSecondaryAction";
import ListItemText from "@mui/material/ListItemText";
import Checkbox from "@mui/material/Checkbox";
import IconButton from "@mui/material/IconButton";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import BookmarkIcon from "@mui/icons-material/Bookmark";
import moment from "moment";

const theme = createTheme();

const RootList = styled(List)({
  width: "100%",
  backgroundColor: "white",
  borderRadius: "10px",
  padding: 0,
});

const TodoListItem = styled(ListItem)(({ theme }) => ({
  border: "1px solid black",
  marginBottom: "10px",
  borderRadius: "10px",
  backgroundColor: "cyan",
  transition: "background-color",
  "&.MuiListItem-root.completed": {
    backgroundColor: theme.palette.action.hover,
  },
}));

const TodoList = ({
  todos,
  completeTodo,
  editTodo,
  deleteTodo,
  saveTodo,
  noteRef,
  preventSubmit,
}) => {
  const handleToggle = (index) => (event) => {
    // Check if the click target is an input element with the class 'form__edit-input'
    const isEditInput = event.target.classList.contains("form__edit-input");

    // If clicking to edit, don't toggle completion
    if (!isEditInput) {
      completeTodo(index);
    }
  };

  const handleSave = (index, newText) => {
    saveTodo(index, newText);
  };

  return (
    <ThemeProvider theme={theme}>
      <RootList>
        {todos.map((todo, index) => {
          const labelId = `list-todo-${todo}`;

          return (
            <TodoListItem
              key={`todo-${index}`}
              role={undefined}
              dense
              button
              className={todo.isCompleted ? "completed" : ""}
              onClick={handleToggle(index)}
            >
              <ListItemIcon>
                <Checkbox
                  color="primary"
                  edge="start"
                  checked={todo.isCompleted}
                  tabIndex={-1}
                  disableRipple
                  inputProps={{ "aria-labelledby": labelId }}
                  onKeyPress={preventSubmit}
                />
              </ListItemIcon>
              {!todo.isEditing ? (
                <>
                  <ListItemText
                    id={labelId}
                    primary={`${todo.text}`}
                    secondary={`${moment(todo.createdAt).format(
                      "MMMM Do YYYY, h:mm:ss a"
                    )}`}
                    style={{
                      textDecoration: todo.isCompleted ? "line-through" : "",
                    }}
                  />
                  <ListItemIcon>
                    <IconButton
                      edge="end"
                      aria-label="edit"
                      onClick={(e) => {
                        e.stopPropagation();
                        editTodo(index);
                      }}
                    >
                      <EditIcon />
                    </IconButton>
                  </ListItemIcon>
                </>
              ) : (
                <>
                  <label htmlFor="task" className="visuallyhidden">
                    {todo.text}
                  </label>
                  <input
                    className="form__edit-input"
                    defaultValue={todo.text}
                    ref={(element) => (noteRef.current[index] = element)}
                    onKeyPress={preventSubmit}
                    id="task"
                  />
                  <ListItemIcon>
                    <IconButton
                      onClick={(e) => {
                        e.stopPropagation();
                        const newText = noteRef.current[index].value;
                        handleSave(index, newText);
                      }}
                      edge="end"
                      aria-label="save"
                    >
                      <BookmarkIcon />
                    </IconButton>
                  </ListItemIcon>
                </>
              )}
              <ListItemSecondaryAction>
                <IconButton
                  onClick={(e) => {
                    e.stopPropagation();
                    deleteTodo(index);
                  }}
                  edge="end"
                  aria-label="delete"
                >
                  <DeleteIcon />
                </IconButton>
              </ListItemSecondaryAction>
            </TodoListItem>
          );
        })}
      </RootList>
    </ThemeProvider>
  );
};

export default TodoList;

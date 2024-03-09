import React from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import FormHelperText from "@mui/material/FormHelperText";
import FormControl from "@mui/material/FormControl";
import { styled } from "@mui/system";

const StyledButton = styled(Button)`
  background: linear-gradient(45deg, lightblue 40%, blue 90%);
  border: 0;
  color: black;
  font-weight: bold;
  height: 30px;
  padding: 0 10px;
  white-space: nowrap;
  margin: 15px 0 0 20px;
`;

const StyledFormControl = styled(FormControl)`
  width: 80%;
`;

const TodoCreator = ({
  theme,
  todo,
  setTodo,
  clearInput,
  inputRef,
  isInputEmpty,
  preventSubmit,
}) => {
  return (
    <div className="form__input">
      <StyledFormControl>
        <TextField
          id="outlined-basic"
          label="Enter Task"
          value={todo}
          variant="outlined"
          onChange={(e) => setTodo(e.target.value)}
          onFocus={clearInput}
          inputRef={inputRef}
          aria-describedby="component-error-text"
          onKeyPress={preventSubmit}
        />
        {!isInputEmpty ? (
          <></>
        ) : (
          <>
            <FormHelperText id="component-error-text">
              Task can't be empty
            </FormHelperText>
          </>
        )}
      </StyledFormControl>
      <StyledButton type="submit" alt="add-note" onKeyPress={preventSubmit}>
        Add task
      </StyledButton>
    </div>
  );
};

export default TodoCreator;

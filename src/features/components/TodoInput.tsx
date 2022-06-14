import React, { useState } from "react";
import styled from "styled-components";
import { useAppDispatch } from "../../app/hooks";
import { addTodo } from "../todoSlice";

const InputContainer = styled.div`
  background-color: #f3f2f1;
  display: flex;
  height: 40px;
  width: 790px;
  place-content: center;
  padding: 1em;
  gap: 1em;
`;
const Input = styled.input`
  height: 70%;
  width: 80%;
  font-size: large;
`;
const AddButton = styled.button`
  height: 80%;
  width: 10%;
  background-color: #0078d7;
  border: #0078d7;
  color: #ffffff;
  cursor: pointer;
`;

const TodoInput: React.FC = () => {
  const [todo, setTodo] = useState<string>("");
  const dispatch = useAppDispatch();

  const handleKeyUp = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && todo.length > 0) {
      dispatch(addTodo(todo));
      setTodo("");
    }
  };
  return (
    <InputContainer>
      <Input
        placeholder="Add Todo.."
        type="text"
        value={todo}
        onChange={(e) => setTodo(e.target.value)}
        onKeyPress={handleKeyUp}
      />
      <AddButton
        onClick={() => {
          if (todo.length > 0) {
            dispatch(addTodo(todo));
            setTodo("");
          }
        }}
      >
        Add Todo
      </AddButton>
    </InputContainer>
  );
};
export default TodoInput;

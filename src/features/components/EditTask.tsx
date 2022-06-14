import React from "react";
import styled from "styled-components";
import { useAppDispatch } from "../../app/hooks";
import { editTodo, Item } from "../todoSlice";

const SubmitButton = styled.button`
  margin-top: 5px;
  align-self: flex-end;
  width: 30%;
  background-color: #0078d7;
  border: #0078d7;
  color: #ffffff;
  padding: 0.2em;
`;
const CancelButton = styled.button`
  margin-top: 5px;
  align-self: flex-end;
  width: 30%;
  background-color: #d07979;
  border: #d07979;
  color: #ffffff;
  padding: 0.2em;
`;
const ButtonGroup = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 0.2em;
`;
const EditInput = styled.textarea`
  resize: none;
`;

type EditTaskProps = {
  edittext: string;
  setEditText: React.Dispatch<React.SetStateAction<string>>;
  edit: Item;
  setIsEdit: React.Dispatch<React.SetStateAction<boolean>>;
};

const EditTask = ({
  edittext,
  setEditText,
  edit,
  setIsEdit,
}: EditTaskProps) => {
  const dispatch = useAppDispatch();
  const handleClick = () => {
    if (edittext.length > 0) {
      dispatch(editTodo({ id: edit.id, text: edittext, done: edit.done }));
      setEditText("");
      setIsEdit(false);
    }
  };
  return (
    <>
      <EditInput
        rows={5}
        value={edittext}
        onChange={(e) => setEditText(e.target.value)}
      />
      <ButtonGroup>
        <SubmitButton onClick={handleClick}>submit</SubmitButton>
        <CancelButton onClick={() => setIsEdit(false)}>cancel</CancelButton>
      </ButtonGroup>
    </>
  );
};
export default EditTask;

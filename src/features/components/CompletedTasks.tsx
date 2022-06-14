import React from "react";
import styled from "styled-components";
import { useAppSelector, useAppDispatch } from "../../app/hooks";
import { selectItems } from "../todoSlice";
import { checkTodo, deleteTodo } from "../todoSlice";

const TaskContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 790px;
  justify-content: flex-start;
  align-items: center;
  padding: 0 1em 0 1em;
  h3 {
    padding-top: 1em;
    margin: 0 0;
    align-self: flex-start;
  }
`;
const TaskList = styled.ul`
  width: 100%;
  padding: 1em;
  list-style: none;
`;
const Task = styled.li`
  display: flex;
  gap: 0.5em;
  justify-content: flex-start;
  border-bottom: 1px solid lightgrey;
  padding: 0 5px 0 5px;
  p {
    text-decoration: line-through 1px;
    padding: 0 1em 0 1em;
    width: 65%;
  }
`;
const ItemCheckbox = styled.input.attrs({
  type: "checkbox",
})`
  height: 1.3em;
  width: 1.3em;
  align-self: center;
`;
const DeleteButton = styled.button`
  padding: 0.4em;
  width: 10%;
  background-color: #d07979;
  border: #d07979;
  color: #ffffff;
  align-self: center;
  cursor: pointer;
`;

const CompletedTasks = () => {
  const items = useAppSelector(selectItems);
  const dispatch = useAppDispatch();

  return (
    <TaskContainer>
      <h3>Completed Tasks</h3>
      <TaskList>
        {items.map((item) => {
          return (
            item.done && (
              <Task key={item.id}>
                <ItemCheckbox
                  checked={item.done}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                    dispatch(
                      checkTodo({
                        id: item.id,
                        text: item.text,
                        done: e.target.checked,
                      })
                    )
                  }
                />
                <p>{item.text}</p>
                <DeleteButton onClick={() => dispatch(deleteTodo(item.id))}>
                  Delete
                </DeleteButton>
              </Task>
            )
          );
        })}
      </TaskList>
    </TaskContainer>
  );
};
export default CompletedTasks;

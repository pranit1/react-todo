import React, { useState } from "react";
import styled from "styled-components";
import { Item } from "../todoSlice";
import TodoInput from "./TodoInput";
import TodoTasks from "./TodoTasks";
import CompletedTasks from "./CompletedTasks";
import EditTask from "./EditTask";

const TodoApp = styled.div`
  display: grid;
  grid-template-columns: 1fr 4fr 1fr;
  width: 100%;
  height: 100vh;
  grid-template-areas:
    "header header  header"
    "nav    content sidebar"
    "nav    content sidebar";
  grid-template-rows: 50px auto auto;
`;
const Header = styled.header`
  grid-area: header;
  background-color: #0078d7;
  display: flex;
  justify-content: center;
  align-items: center;
  h1 {
    font-size: 20px;
    line-height: 100%;
    color: #ffffff;
  }
`;

const Nav = styled.nav`
  grid-area: nav;
  background-color: #f3f2f1;
`;
const Sidebar = styled.aside`
  grid-area: sidebar;
  background-color: #f3f2f1;
  padding: 1em;
  display: flex;
  flex-direction: column;
`;

const Main = styled.main`
  grid-area: content;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  gap: 1em;
  padding: 30px 20px 0px 20px;
`;

const Todo: React.FC = () => {
  const [edittext, setEditText] = useState<string>("");
  const [isEdit, setIsEdit] = useState<boolean>(false);
  const [edit, setEdit] = useState<Item>({
    id: "",
    text: "",
    done: false,
  });

  return (
    <TodoApp>
      <Header>
        <h1>To Do</h1>
      </Header>
      <Sidebar>
        {isEdit && (
          <EditTask
            edittext={edittext}
            setEditText={setEditText}
            edit={edit}
            setIsEdit={setIsEdit}
          />
        )}
      </Sidebar>

      <Main>
        <TodoInput />
        <TodoTasks
          setEdit={setEdit}
          setEditText={setEditText}
          setIsEdit={setIsEdit}
        />
        <CompletedTasks />
      </Main>
      <Nav />
    </TodoApp>
  );
};

export default Todo;

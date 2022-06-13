import React from "react";
import styled from "styled-components";
import { useAppSelector } from '../app/hooks'
//import { addTodo,editTodo } from "../features/todoSlice";
import { selectItems } from "../features/todoSlice";
const TodoApp  = styled.div`
  display: grid;
  grid-template-columns: 1fr 4fr 1fr;
  width: 100%;
  height: 100vh;
    grid-template-areas:
      "header header  header"
      "nav    content sidebar"
      "nav    content sidebar"
      "footer footer  footer";
  
  grid-template-rows: 50px 1fr 0px;
`;
const Header = styled.header`
  grid-area: header;
  background-color:#0078d7;
  display:flex;
  justify-content:center;
  align-items:center;
  h1 {
    font-size:20px;
    line-height: 100%;
    color:#ffffff;
  }
`

const Nav = styled.nav`
  grid-area: nav;
  background-color:#f3f2f1;
`
const Sidebar = styled.aside`
  grid-area: sidebar;
  background-color:#f3f2f1;
`

const Main = styled.main`
  
grid-area: content;
  display:flex;
  flex-direction:column;
  justify-content:flex-start;
  align-items:center;
  gap:1em;
  padding: 30px 20px 0px 20px;
`
const InputContainer = styled.div`
  background-color:#f3f2f1;
  display:flex;
  height:40px;
  width:790px;
  place-content:center;
  padding:1em;
  gap:1em;
`
const Input = styled.input `
  height:70%;
  width:80%;
  font-size:large;
`
const AddButton = styled.button`
  height:80%;
  width:10%;
  background-color:#0078d7;
  border:#0078d7;
  color:#ffffff;
`

const ItemList: React.FC = () => {
  const items = useAppSelector(selectItems);
  console.log(items)
  return (
   <TodoApp>
    <Header><h1>To Do</h1></Header>
    <Sidebar/>
    <Main>
      <InputContainer>
        <Input placeholder="Add Todo.."/>
        <AddButton>Add Todo</AddButton>
      </InputContainer>
      
    </Main>
    <Nav/>
   </TodoApp>
  );
};

export default ItemList;

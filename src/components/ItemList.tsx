import React, {useState} from "react";
import styled from "styled-components";
import { useAppSelector, useAppDispatch } from '../app/hooks'
import { addTodo,editTodo } from "../features/todoSlice";
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
const TaskContainer = styled.div`
  background-color:#f3f2f1;
  display:flex;
  flex-direction:column;
  width:790px;
  justify-content:flex-start;
  align-items:center;
  padding:0 1em 0 1em;
  h3 {
    padding-top:1em;
    margin:0 0;
   align-self:flex-start;
  }
`
const TaskList = styled.ul`
width:100%;
padding:1em;
list-style:none;
`
const Task = styled.li`
display:flex;
justify-content:flex-start;
background-color:lightblue;
border-bottom:1px solid lightgrey;
padding:0 5px 0 5px;
p {
  padding:0 1em 0 1em;
}
input['checkbox'] {
  border-radius: 50%;
}
`
const ItemCheckbox = styled.input.attrs({
  type: "checkbox",
})`
height:1.3em;
width:1.3em;
align-self:center;
`;
const ItemList: React.FC = () => {
  const items = useAppSelector(selectItems);
  const dispatch = useAppDispatch()
  const [todo, setTodo] = useState<string>("");
  return (
   <TodoApp>
    <Header><h1>To Do</h1></Header>
    <Sidebar/>
    <Main>
      <InputContainer>
          <Input placeholder="Add Todo.." 
            type="text"
            onChange={(e) => setTodo(e.target.value)}
            onKeyUp={(e) => {if(e.key === 'Enter') dispatch(addTodo(todo))}}
            />
          <AddButton onClick={() => dispatch(addTodo(todo))}>Add Todo</AddButton>
      </InputContainer> 
      <TaskContainer>
        <h3>
          Tasks
        </h3>
        <TaskList>
          {items.map((item) => {
            return <Task key={item.id}>
             <ItemCheckbox/> 
              <p>{item.text}</p>
            </Task>
          })}
        </TaskList>
      </TaskContainer>
    </Main>
    <Nav/>
   </TodoApp>
  );
};

export default ItemList;

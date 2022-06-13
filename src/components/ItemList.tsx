import React, {useState} from "react";
import styled from "styled-components";
import { useAppSelector, useAppDispatch } from '../app/hooks'
import { addTodo,checkTodo, deleteTodo, editTodo, Item } from "../features/todoSlice";
import { selectItems } from "../features/todoSlice";
const TodoApp  = styled.div`
  display: grid;
  grid-template-columns: 1fr 4fr 1fr;
  width: 100%;
  height: 100vh;
    grid-template-areas:
      "header header  header"
      "nav    content sidebar"
      "nav    content sidebar";
  grid-template-rows:50px auto auto;
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
  padding:1em;
  display:flex;
  flex-direction:column;
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
  cursor:pointer;
`
const TaskContainer = styled.div`
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
gap:0.5em;
justify-content:flex-start;
border-bottom:1px solid lightgrey;
padding:0 5px 0 5px;
p {
  padding:0 1em 0 1em;
  width:65%;
}
`
const ItemCheckbox = styled.input.attrs({
  type: "checkbox",
})`
height:1.3em;
width:1.3em;
align-self:center;
`;
const DeleteButton = styled.button`
padding:0.4em;
width:10%;
background-color:#d07979;
border:#d07979;
color:#ffffff;
align-self:center;
cursor:pointer;
`
const EditButton = styled.button`
padding:0.4em;
width:10%;
background-color:#0078d7;
border:#0078d7;
color:#ffffff;
align-self:center;
cursor:pointer;
`
const SubmitButton = styled.button`
margin-top:5px;
align-self:flex-end;
width:30%;
background-color:#0078d7;
border:#0078d7;
color:#ffffff;
padding:0.2em;
`
const EditInput = styled.textarea`
resize:none;
`
const ItemList: React.FC = () => {
  const items = useAppSelector(selectItems);
  const dispatch = useAppDispatch()
  const [todo, setTodo] = useState<string>("");
  const [edittext, setEditText] = useState<string>("")
  const [isEdit, setIsEdit] = useState(false);
  const [edit, setEdit] = useState<Item>({
    id:'',
    text:'',
    done:false
  });
  const handleKeyUp = (e:any) => {
    if(e.key === 'Enter') 
      {
        dispatch(addTodo(todo))
        setTodo('')
      }
  }
  return (
   <TodoApp>
    <Header><h1>To Do</h1></Header>
    <Sidebar>
      {isEdit &&
      (<>
        <EditInput rows={5} value={edittext} onChange={(e) => setEditText(e.target.value)}></EditInput>
        <SubmitButton onClick={() => {dispatch(editTodo({id:edit.id, text:edittext, done:edit.done}));setEditText('');setIsEdit(false)}}>
          submit
        </SubmitButton>
      </>)}
    </Sidebar>
    
    <Main>
      <InputContainer>
          <Input placeholder="Add Todo.." 
            type="text"
            value={todo}
            onChange={(e) => setTodo(e.target.value)}
            onKeyUp={(e) => {handleKeyUp(e)}}
            />
          <AddButton onClick={() => {dispatch(addTodo(todo));setTodo('')}}>Add Todo</AddButton>
      </InputContainer> 
      <TaskContainer>
        <h3>
          Todo Tasks
        </h3>
        <TaskList>
          {items.map((item) => {
            return (!item.done && <Task key={item.id}>
             <ItemCheckbox onChange={(e:React.ChangeEvent<HTMLInputElement>) => dispatch(checkTodo(
              {
                id:item.id,
                text:item.text,
                done:e.target.checked
              }
              ))}/> 
              <p>{item.text}</p>
              <EditButton onClick={() =>{ setEdit(item);setEditText(item.text);setIsEdit(true)}}>Edit</EditButton>
              <DeleteButton onClick={() => dispatch(deleteTodo(item.id))}>Delete</DeleteButton>
            </Task>)
          })}
        </TaskList>
      </TaskContainer>
      <TaskContainer>
        <h3>
          Completed Tasks
        </h3>
        <TaskList>
          {items.map((item) => {
            return (item.done && <Task key={item.id}>
             <ItemCheckbox 
             checked={item.done}
             onChange={(e:React.ChangeEvent<HTMLInputElement>) => dispatch(checkTodo(
              {
                id:item.id,
                text:item.text,
                done:e.target.checked
              }
              ))}/> 
              <p style={{textDecoration:'line-through 1px'}}>{item.text}</p>
              <DeleteButton onClick={() => dispatch(deleteTodo(item.id))}>Delete</DeleteButton>
            </Task>)
          })}
        </TaskList>
      </TaskContainer>
    </Main>
    <Nav/>
   </TodoApp>
  );
};

export default ItemList;

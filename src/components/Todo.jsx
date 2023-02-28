import { useState, useRef } from "react";
import styled, { css } from "styled-components";

const Todo = () => {
  const [text, setText] = useState("");
  const [todoList, setTodoList] = useState([]);
  const nextId = useRef(1);

  const handleChange = (e) => {
    setText(e.target.value);
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    // form 안에 submit 역할을 하는 버튼을 눌렀어도 새로고침 되지 않게 하고싶을 때 (submit은 작동됨)
    console.log(text);
    const newTodoList = [
      ...todoList,
      { id: nextId.current, text, isDone: false },
    ];
    setTodoList(newTodoList);
    setText("");
    nextId.current += 1;
  };
  const handleDelete = (id) => {
    const newTodoList = todoList.filter((todo) => todo.id !== id);
    setTodoList(newTodoList);
  };

  const handleIsDone = (id, checked) => {
    const newTodoList = todoList.map((todo) =>
      todo.id === id ? { ...todo, isDone: checked } : todo
    );
    setTodoList(newTodoList);
  };

  return (
    <Container>
      <Title>🧸 은지의 To-do List 🧸</Title>
      <form onSubmit={handleSubmit}>
        <InputWrapper>
          <InputText
            placeholder="할 일을 입력하세요."
            onChange={handleChange}
            value={text}
          />
          <BtnSubmit>+</BtnSubmit>
        </InputWrapper>
      </form>
      <List>
        {todoList.map(({ id, text, isDone }, i) => (
          <Item key={i} isDone={isDone}>
            <label>
              <Checkbox
                type="checkbox"
                onChange={(e) => handleIsDone(id, e.target.checked)}
              />
              <Content>{text}</Content>
            </label>
            <BtnDelete onClick={() => handleDelete(id)}>-</BtnDelete>
          </Item>
        ))}
      </List>
    </Container>
  );
};

const Container = styled.div`
  width: 500px;
  margin: 60px auto;
  background: #f1eeee;
  min-height: 500px;
`;
const Title = styled.div`
  text-align: center;
  font-size: 24px;
  font-weight: bold;
  padding: 20px;
  background: #fdc7d0;
  color: #fff;
`;
const InputWrapper = styled.div`
  height: 40px;
  background-color: black;
  display: flex;
`;
const InputText = styled.input`
  flex: 1;
  background-color: #fff;
  color: #000;
`;
const BtnSubmit = styled.button`
  background: gray;
  border: none;
  color: white;
  height: 100%;
  width: 40px;
  font-size: 30px;
`;
const List = styled.ul`
  list-style: none;
  margin: 0;
  padding: 0; // ⭐️ ul을 다룰때 항상 사용해줘야함 ⭐️
`;
const Content = styled.span``;
const Item = styled.li`
  height: 60px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  & + & {
    border-top: 1px solid #ddd;
  }
  background-color: ${({ isDone }) => isDone && "lightgray"};

  ${({ isDone }) =>
    isDone &&
    css`
      ${Content} {
        text-decoration: line-through;
        color: #000;
      }
    `}
`;
const Checkbox = styled.input`
  margin: 20px;
`;
const BtnDelete = styled.button`
  border-radius: 50%;
  border: 2px solid darkgray;
  background: #fff;
  color: darkgray;
  cursor: pointer;
  margin-right: 20px;
`;

export default Todo;

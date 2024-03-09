import React, { useState } from "react";
import "./App.css";

function App() {
  const [list, setList] = useState([]);
  const [input, setInput] = useState("");
  const [time, setTime] = useState("");
  const [id, setId] = useState(1);
  const [completedlist, setCompletedList] = useState([]);

  const addTodo = (todo, todoTime) => {
    const newTodo = {
      id: id,
      todo: todo,
      todoTime: todoTime,
    };
    setList(
      [...list, newTodo].sort(
        (a, b) =>
          new Date("1970-01-01T" + a.todoTime + ":00") -
          new Date("1970-01-01T" + b.todoTime + ":00")
      )
    );
    setId(id + 1);
    setInput("");
    setTime("");
  };

  const completed = (id) => {
    const findlist = list.find((todo) => todo.id == id);
    const newcompletedlist = [...completedlist, findlist].sort(
      (a, b) =>
        new Date("1970-01-01T" + a.todoTime + ":00") -
        new Date("1970-01-01T" + b.todoTime + ":00")
    );
    setCompletedList(newcompletedlist);
    deleteTodo(id);
  };

  const deleteTodo = (id, complete) => {
    if (complete == true) {
      const newList = completedlist.filter((todo) => todo.id !== id);
      setCompletedList(newList);
    } else {
      const newList = list.filter((todo) => todo.id !== id);
      setList(newList);
    }
  };

  const editTodo = (id, updateTodo) => {
    const newList = list.map((todo) => {
      if (todo.id == id) {
        return { ...todo, todo: updateTodo };
      } else {
        return todo;
      }
    });
    setList(newList);
  };
  return (
    <div class="main">
      <h1>To do List</h1>
      <h3>What do you want to do today?</h3>
      <input
        class="input"
        placeholder="What do you want to do?"
        type="text"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        required
      />
      <br></br>
      <input
        type="time"
        value={time}
        onChange={(e) => setTime(e.target.value)}
        required
      />
      <br></br>
      <button onClick={() => addTodo(input, time)}>Add</button>
      {list.length != 0 && (
        <><h2>Not Done : </h2><div class="list">
          <table>
            {list.map((todo) => (
              <tr key={todo.id}>
                <td class="number">&#8226;</td>
                <td class="isi">{todo.todo}</td>
                <td>{todo.todoTime}</td>
                <td class="check">
                  <button onClick={() => completed(todo.id)}>&#10004;</button>
                </td>
                <td class="cross">
                  <button onClick={() => deleteTodo(todo.id, false)}>X</button>
                </td>
                <td class="edit">
                  <button
                    onClick={() => editTodo(todo.id, prompt("Edit your list"))}
                  >
                    Edit
                  </button>
                </td>
              </tr>
            ))}
          </table>
        </div></>
      )}
      
        {completedlist.length != 0 && (
        <><h2>Done : </h2>
        <div class="list">
          <table>
            {completedlist.map((todo) => (
              <tr key={todo.id}>
                <td class="number">&#8226;</td>
                <td class="isi">{todo.todo}</td>
                <td>{todo.todoTime}</td>
                <td class="cross">
                  <button onClick={() => deleteTodo(todo.id, true)}>X</button>
                </td>
              </tr>
            ))}
          </table>
        </div></>
        )}
    </div>
  );
}

export default App;

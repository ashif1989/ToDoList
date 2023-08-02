import "./styles.css";
import { useState, useEffect } from "react";

export default function App() {
  const [todo, setTodo] = useState([]);
  const [displayTodo, setDisplayTodo] = useState(null);

  useEffect(() => {
    let getJSON = async () => {
      let response = await fetch("https://jsonplaceholder.typicode.com/todos");
      let data = await response.json();
      setTodo(data);
    };
    getJSON();
  }, []);

  // let filteredTodo = todo.filter((a) => a.id <= 10);

  let handleDelete = (id) => {
    console.log(id);
    let filteredTodo = todo.filter((a) => a.id !== id);
    let dispTodo = todo.filter((a) => a.id === id);
    setTodo(filteredTodo);
    setDisplayTodo(dispTodo);
  };

  let handleAdd = (list) => {
    let addTodo = [...todo];
    addTodo.push(list);
    setTodo(addTodo);
    console.log("list", list);
    console.log("todo", todo);
    let dispTodo = displayTodo.filter((a) => a.id !== list.id);
    if (dispTodo.length === 0) {
      setDisplayTodo(null);
    } else {
      setDisplayTodo(dispTodo);
    }
  };

  return (
    <div className="App">
      <h1>TodoList</h1>
      {displayTodo
        ? displayTodo.map((t) => (
            <ul>
              <li key={t.id}>{t.title}</li>
              <button onClick={(e) => handleAdd(t)}>Add</button>
            </ul>
          ))
        : todo.map((t) => (
            <ul>
              <li key={t.id}>{t.title}</li>
              <button onClick={(e) => handleDelete(t.id)}>Delete</button>
            </ul>
          ))}
    </div>
  );
}

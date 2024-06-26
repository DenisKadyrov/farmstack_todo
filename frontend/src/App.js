import './App.css';
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css'
import TodoView from './components/TodoListView';

function App() {
  const [todoList, setTodoList] = useState([]);
  const [title, setTitle] = useState('');
  const [desc, setDesc] = useState('');
  
  useEffect(() => {
    axios.get('http://localhost:8000/api/todo')
      .then(res => {
        console.log(res)
        setTodoList(res.data)
      })
  });

  const addTodoHandler = () => {
    if (title && desc) {
      axios.post('http://localhost:8000/api/todo', {'title': title, "description": desc})
        .then(res => console.log(res))
    } else {
      alert("Enter title and description")
    }
  };

  return (
    <div className="App">
      FARM STACK
      <div 
        className="App list-group-item justify-content-center align-items-center mx-auto"
        style={{
          "width": "400px",
          "backgroundColor": "white",
          "marginTop": "15px"
        }}
      >
        <h1
          className='card text-white bg-primary mb-1'
          styleName="max-width: 20rem;"
        >
          Task Manager
        </h1>
        <h6
          className='card text-white bg-primary mb-3'
          styleName="max-width: 20rem;"
        >
          FastAPI - React - MongoDB
        </h6>
        <div className="card-body">
          <h5 className='card text-white bg-dark mb-3'>
            Add your task
          </h5>
          <span className='card-text'>
            <input 
              className='mb-2 form-control titleIn'
              placeholder='Title'
              onChange={e => setTitle(e.target.value)}
            />
            <input 
              className='mb-2 form-control destIn'
              placeholder='Description'
              onChange={e => setDesc(e.target.value)}
            />
            <button
              className='btn btn-outline-primary mb-2 mx-3'
              style={{
                'borderRadius': '50px',
                "fontWeight": "bold"
              }}
              onClick={addTodoHandler}
            >
              Add task
            </button>
          </span>

          <h5 className='card text-white bg-dark mb-3'>Your Tasks</h5>
          <div>
              { todoList ? <TodoView todoList={todoList}/> : ""}
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;

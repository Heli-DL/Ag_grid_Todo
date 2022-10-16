import React, { useState } from 'react';
import './App.css';
import { AgGridReact } from'ag-grid-react'
import'ag-grid-community/dist/styles/ag-grid.css'
import'ag-grid-community/dist/styles/ag-theme-material.css';
import { useRef } from 'react';

function App() {
    const [todo, setTodo] = useState({description: '', date: '', priority:''});
    const [todos, setTodos] = useState([]);
    const gridRef = useRef();
  
    const inputChanged = (event) => {
      setTodo({...todo, [event.target.name]: event.target.value});
    }
  
    const addTodo = (event) => {
      event.preventDefault();
      setTodos([...todos, todo]);
    }

    const deleteTodo = () => {       
      if (gridRef.current.getSelectedNodes().length > 0) {  
        setTodos(todos.filter((todo, index) =>    
          index !== gridRef.current.getSelectedNodes()[0].childIndex))
      } else {
        alert('Select row first');
      }
    } 

    const columns = [
      {headerName: 'Description', field: 'description', sortable: true, filter: true, floatingFilter: true},
      {headerName: 'Date', field: 'date', sortable: true, filter: true, floatingFilter: true}, 
      {headerName: 'Priority', field: 'priority', sortable: true, filter: true, floatingFilter: true,
       cellStyle: params => params.value === "High" ? {color: 'red'} : {color: 'black'} }
    ]

    return (
      <div>
        <input type="text" onChange={inputChanged} placeholder="Description" name="description" value={todo.description}/>
        <input type="date" onChange={inputChanged} placeholder="Date" name="date" value={todo.date}/>
        <input type="text" onChange={inputChanged} placeholder="Priority" name="priority" value={todo.priority}/>
        <button onClick={addTodo}>Add</button>
        <button onClick={deleteTodo}>Delete</button>
        <div className="ag-theme-material"
            style={{height: '700px', width: '80%', margin: 'auto'}}>
          <AgGridReact
            ref={gridRef}
            onGridReady={ params => gridRef.current = params.api}
            rowSelection="single"
            columnDefs={columns}
            rowData={todos}
            animateRows={true}
          >
          </AgGridReact>
        </div>
      </div>
    );
  };

export default App;

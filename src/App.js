import React, { useState } from 'react';
import './App.css';
import { AgGridReact } from'ag-grid-react'
import'ag-grid-community/dist/styles/ag-grid.css'
import'ag-grid-community/dist/styles/ag-theme-material.css';
import { useRef } from 'react';
import Button from'@mui/material/Button';
import TextField from'@mui/material/TextField';
import Stack from'@mui/material/Stack';
import { AdapterMoment  } from '@mui/x-date-pickers/AdapterMoment';
import { DatePicker } from '@mui/x-date-pickers';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import Tabs from'@mui/material/Tabs';
import Tab from'@mui/material/Tab';


function App() {
    const [todo, setTodo] = useState({description: '', date: null, priority:''});
    const [todos, setTodos] = useState([]);
    const [value, setValue] = useState('one');
    const gridRef = useRef();
    
    const handleChange = (event, value) => {  
      setValue(value);
    }

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
      {headerName: 'Description', field: 'description', sortable: true, filter: true, floatingFilter: true, resizable: true},
      {headerName: 'Date', field: 'date', sortable: true, filter: true, floatingFilter: true, resizable: true}, 
      {headerName: 'Priority', field: 'priority', sortable: true, filter: true, floatingFilter: true, resizable: true,
       cellStyle: params => params.value === "High" ? {color: 'red'} : {color: 'black'} }
    ]

    return (
      <div>
        <Tabs value={value} onChange={handleChange} className="tabs">
          <Tab label="Home" value="one"/>
          <Tab label="Todos" value="two"/>
        </Tabs>
        {value === 'one' && <div>
          <h1>Welcome to the Homepage</h1>
        </div>}
        {value === 'two' && <div>
          <Stack direction="row" spacing={2} justifyContent="center" alignItems="center">
            <TextField onChange={inputChanged} label="Description" name="description" value={todo.description} variant="standard"/>
            <LocalizationProvider dateAdapter={AdapterMoment}>
            <DatePicker inputFormat="DD/MM/YYYY" onChange={date => setTodo({...todo, date})} label="Date" name="date" value={todo.date} renderInput={(params) => <TextField {...params} />}/>
            </LocalizationProvider>
            <TextField onChange={inputChanged} label="Priority" name="priority" value={todo.priority} variant="standard"/>
            <Button onClick={addTodo} variant="outlined">Add</Button>
            <Button onClick={deleteTodo} variant="outlined" color="error">Delete</Button>
          </Stack> 
          <div className="ag-theme-material"
              style={{height: '700px', width: '70%', margin: '1em auto'}}>
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
        </div>}
      </div>
    );
  };

export default App;

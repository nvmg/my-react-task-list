import Header from "./components/Header";
import { TaskList } from "./components/TaskList";
import React, {useEffect, useState} from "react";


function App() {
  const [items, setItems] = useState([]);
  const [value, setValue] = useState('');

  function handleChange(event){
    setValue(event.target.value);
  }

  function handleSubmit(event){
    event.preventDefault();
    let tasks = [...items];
    if(!tasks.includes(value)){
      setItems([...tasks, {name: value}]);
      setValue('');
    }
    setItems(tasks);
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }

  useEffect(()=>{
    const localStorageTasks = localStorage.getItem('tasks');
    const storedTasks = JSON.parse(localStorageTasks);
    if(storedTasks!==null){
      setItems(storedTasks);
    }
  })

  function handleDeleteAll(){
    localStorage.clear();
    setItems([]);
  }

  function handleDeleteItem(itemToDelete){
    const newList = items.filter(item => item.name !== itemToDelete);
    localStorage.setItem('tasks',JSON.stringify(newList));
    setItems(newList);
  }

  return (
    <div className="App">
     <Header />
     <form onSubmit = {handleSubmit}>
      <input type="text" value={value} onChange={handleChange}></input>
      <button type="submit">Agregar</button>
     </form>
     <TaskList list={items} onDeleteTask={handleDeleteItem}/>
     <button onClick={handleDeleteAll}>Delete All</button>
    </div>
  )
}

export default App;
import Header from "./components/Header"
import { TaskList } from "./components/TaskList";
import React, {useState, useEffect} from "react";


function App() {
  const [items, setItems] = useState([]);
  const [value, setValue] = useState('');
  
  function handleChange(event) {
    setValue(event.target.value);
  }

  function handleSubmit(event){
    event.preventDefault();
    let tasks = [...items]
    if(!tasks.includes(value)){
      tasks = [...tasks,{ name: value}]
      setValue('')
    }
    setItems(tasks)
    localStorage.setItem('tasks',JSON.stringify(tasks));
  }

  useEffect(()=>{
    const localStorageTasks = localStorage.getItem('tasks');
    const storedTasks = JSON.parse(localStorageTasks);
    if(storedTasks!==null){
      setItems(storedTasks)
    }
  },[])

  function handleDeleteAll(){
    localStorage.clear()
    setItems([]);
  }

  function handleDeleteItem(itemToDelete){
    const newList = items.filter(item => item.name !== itemToDelete);
    localStorage.setItem('tasks',JSON.stringify(newList))
    setItems(newList)
  }

  return(
    <div className="App">
      <Header />
      <form onSubmit={handleSubmit}>
        <input placeholder="Add your new todo" type= "text" value = {value} onChange={handleChange}></input>
        <button style={{color: 'blue'}} type="submit">+</button>
      </form>
      <TaskList list={items} onDeleteTask={handleDeleteItem}/>
      <button style={{color: 'red'}} onClick={handleDeleteAll}>Delete All 🗑️</button>
    </div>
  );
}

export default App
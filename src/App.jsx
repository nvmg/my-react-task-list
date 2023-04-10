import Header from "./components/Header";
import { TaskList } from "./components/TaskList";
import React, {useState} from "react";


function App() {
  const [item, setItem] = useState([]);
  const [value, setValue] = useState('');

  function handleChange(event){
    setValue(event.target.value);
  }

  function handleSubmit(event){
    event.preventDefault();
    setItem([...item, {name: value}]);
    setValue('');
  }

  function handleDeleteAll(){
    setItem([]);
  }

  function handleDeleteItem(itemToDelete){
    const newList = item.filter(item => item.name !== itemToDelete);
    setItem(newList);
  }

  return (
    <div className="App">
     <Header />
     <form onSubmit = {handleSubmit}>
      <input type="text" value={value} onChange={handleChange}></input>
      <button type="submit">Agregar</button>
     </form>
     <TaskList list={item} onDeleteTask={handleDeleteItem}/>
     <button onClick={handleDeleteAll}>Delete All</button>
    </div>
  )
}

export default App;
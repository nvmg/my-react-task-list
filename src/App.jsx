import Header from "./components/Header"
import { TaskList } from "./components/TaskList"
import { useState } from "react";

import { useManageTasks, useTaskList } from "./hooks/useTaskList";

function App() {
  const [initialTasks, addTask, deleteTask, deleteAllTasks, changeStateTask] = useManageTasks();
  const [value, setValue] = useState("");
  const [pending, calculatePending, sumOne, minusOne, reset] = useTaskList();

  const handleAdd = () => {
    addTask(value);
    sumOne();
    setValue("");
  }

  const handleDeleteAll = () => {
    deleteAllTasks();
    reset();
  }

  const handleDeleteOne = (item)=>{
    deleteTask(item);
    minusOne();
  }

  const handleChangeState = (title, newIschecked) => {
    calculatePending(newIschecked);
    changeStateTask(title, newIschecked);
  }

  const newValue = (event) =>{
    setValue(event.target.value);
  }

  return (
    <div className="App">
      <Header />
      <form onSubmit={handleAdd}>
        <input placeholder="Add your new todo" type="text" id = "newTask" onChange={newValue} value={value}></input>
        <button style={{color: 'blue'}} type="submit">+</button>
      </form>
      <TaskList list={initialTasks} onDeleteOne={handleDeleteOne} onChangeState={handleChangeState}/>
      <div>
        <label>You have {pending} pending tasks</label>
        <button style={{color: 'red'}} onClick={handleDeleteAll}>Delete All 🗑️</button>
      </div>
      
    </div>
  );
}

export default App;
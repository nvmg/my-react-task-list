import Header from "./components/Header"
import { TaskList } from "./components/TaskList"
import { useState } from "react";

import { useManageTasks, useTaskList } from "./hooks/useTaskList";

function App() {
  const [initialTasks, addTask, deleteTask, deleteAllTasks, changeStateTask] = useManageTasks();
  const [value, setValue] = useState("");
  const [pending, calculatePending, sumOne, minusOne, reset] = useTaskList();
  const [formValidation, setFormValidation] = useState({task:undefined})

  function handleChange(event) {
    const val = event.target.value;
    setFormValidation({
      ...formValidation,
      task:val.length < 3? "task is too short":"",
    })
    setValue(val);

  }

  const handleAdd = () => {
    addTask(value);
    sumOne();
    setValue("");
    handleCloseModal();
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
    const val = event.target.value;
    setFormValidation({
      ...formValidation,
      task:val.length < 3? "task is too short":"",
    })
    setValue(val);
  }

  const handleCloseModal = () => {
    setFormValidation({task:undefined,description:undefined})
    setIsOpen(false);
  };

  const isValid = Object.keys(formValidation).every(key=>formValidation[key]==="")

  return (
    <div className="App">
      <Header />
      <form onSubmit={handleAdd}>
        <input placeholder="Add your new todo" type="text" id = "newTask" onChange={newValue} value={value}></input>
        <span role = "alert" style={{color:"red"}}>{formValidation.task}</span>
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
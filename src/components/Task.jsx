import React, {useState} from "react";

export const Task = (props) =>{
    const {name, onDelete, isTaskChecked, isCompleted} = props;

    const [isChecked, setIsChecked] = useState(isCompleted);

  function handleCheckboxChange() {
    setIsChecked(!isChecked);
    isTaskChecked(isChecked,name);
  }

  const handleDeleteItem= ()=>{
    onDelete(name);
  }


    return(
        <li>
        <article>
        <input type="checkbox" checked={isChecked} onChange={handleCheckboxChange}/>
        <label htmlFor="myCheckbox" style={{textDecoration: isChecked ? "line-through" : ''}}> {name} </label>
          <button style={{color: 'red'}} onClick={handleDeleteItem}>Delete 🗑️</button>
        </article>
      </li>
    )

}
import React, {useState} from "react";

export const Task = (props) =>{
    const {name, onDelete} = props;
    const [isChecked, setIsChecked] = useState(false);
    
    function handleCheckBoxChange(){
        setIsChecked(!isChecked);
    }

    const handleDeleteItem = ()=>{
        onDelete(name);
    }

    return(
        <li>
        <article>
        <input type="checkBox" checked={isChecked} onChange={handleCheckBoxChange}/>
        <label htmlFor="myCheckBox" style={{textDecoration: isChecked ? "line-through": ''}}> {name} </label>
        <button onClick={handleDeleteItem}>Delete</button>
        </article>
        </li>
    )
}
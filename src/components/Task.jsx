import { useState } from "react";
import { useTaskList } from "../hooks/useTaskList";

export const Task = (props)=>{
    const {title, isPending, onDelete, onChangeState} = props;
    const [isChecked, setIsChecked] = useState(isPending);

    const handleDelete = ( ) => {
        onDelete(title);
    }

    const handleChangeState = () => {
        const newIschecked = !isChecked;
        setIsChecked(newIschecked);
        onChangeState(title, newIschecked);
    }

    return(
        <li>
            <article>
                <div>
                    <input type="checkbox" checked={isChecked} onChange={handleChangeState} />
                    <label id="{title}" style={isChecked ? { textDecoration: "line-through" } : {}}> {title} </label>
                    <button style={{color: 'red'}} onClick={handleDelete}>Delete 🗑️</button>
                </div>
            </article>
        </li>
    )
}
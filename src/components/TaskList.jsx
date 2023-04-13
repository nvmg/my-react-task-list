import { useEffect, useState } from "react";
import { Task } from "./Task";

export const TaskList = (props) => {
    const {list, onDeleteTask} = props
    const [completed, setCompleted] = useState([]);


    const handleDelete = (nameTask) =>{
        const newList = completed.filter(item => nameTask !== item);
        localStorage.setItem('completed',JSON.stringify(newList))
        onDeleteTask(nameTask)
    }

    const handleChecked = (boolean,nameTask) =>{

        let newCompleted = [...completed]

        if(!completed.includes(nameTask) && !boolean){
            newCompleted = [...newCompleted,nameTask]
        }else{
            newCompleted = newCompleted.filter(task => nameTask != task)
        }

        setCompleted(newCompleted)
        localStorage.setItem('completed',JSON.stringify(newCompleted));
    }

    useEffect(()=>{
        const localStorageData = localStorage.getItem('completed');
        const storedCompleted = JSON.parse(localStorageData);
        if(storedCompleted!=null){
            setCompleted(storedCompleted)
        }
    },[])

    console.log(completed)
    return(
        <ul>
            {list.map((task)=>(
                <Task name = {task.name} onDelete={handleDelete}
                isTaskChecked = {handleChecked}
                isCompleted = {completed.includes(task.name)}
                />
            ))}
        </ul>
    );
};
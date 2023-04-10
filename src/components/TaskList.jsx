import { Task } from "./Task";

export const TaskList = (props) => {
    const {list, onDeleteTask} = props;

    const handleDelete = (nameTask) => {
        onDeleteTask(nameTask);
    }

    return(
        <ul>
            {list.map((task)=>(
                <Task name = {task.name} onDelete={handleDelete}/>
            ))}
        </ul>
    )
}
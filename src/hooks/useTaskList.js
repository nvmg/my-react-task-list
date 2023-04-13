import { useEffect, useState } from "react"

export function useTaskList(){

    const [pending, setPending] = useState(0);

    useEffect(()=>{
        const localPendingTasks = localStorage.getItem('pending');
    
        if(localPendingTasks !== null){
          setPending(localPendingTasks);
        }
      },[])

    function calculatePending(newState) {
        var pendings = localStorage.getItem('pending');
        pendings = parseInt(pendings);
        if(newState){
        pendings -= 1;
        }else{
        pendings += 1;
        }

        localStorage.setItem('pending', pendings);
        setPending(pendings);
    }

    function sumOne(){
        const newPending = parseInt(pending) + 1;
        setPending(newPending);
        localStorage.setItem('pending', newPending);
    }

    function minusOne(){
        const localStorageTasks = localStorage.getItem('tasks');
        const newTasks = JSON.parse(localStorageTasks);
        var newPending = 0;
        console.log(newTasks);
        newTasks.map((task)=>{
        if (!task.isChecked){
            console.log(task.isChecked);
            newPending+=1;
        }
        })

        setPending(newPending);
        localStorage.setItem('pending',newPending);
    }

    function reset(){
        setPending(0);
        localStorage.setItem('pending',0);
    }

    return [pending, calculatePending, sumOne, minusOne, reset]
}

export function useManageTasks(){
    
    const [initialTasks, setInitialTasks] = useState([]);

    useEffect(()=>{
        const localStorageTasks = localStorage.getItem('tasks');
        const storedTasks = JSON.parse(localStorageTasks);
    
        if(storedTasks!==null){
          setInitialTasks(storedTasks);
        }
      },[])

    function addTask(value){
        const newTasks = [...initialTasks, {title:value,isChecked:false}]
        setInitialTasks(newTasks);
        localStorage.setItem('tasks',JSON.stringify(newTasks));
    }

    function deleteTask(item){
        var newTasks = initialTasks.filter(task => task.title !== item);
        setInitialTasks(newTasks);
        localStorage.setItem('tasks',JSON.stringify(newTasks));
    }

    function deleteAllTasks(){
        setInitialTasks([]);
        localStorage.setItem('tasks',[]);
    }

    function changeStateTask(title, newState){
        const newTasksValue = [...initialTasks];
        newTasksValue.map((task) =>{
        if(task.title === title){
            task.isChecked = newState;
        }
        })
        localStorage.setItem('tasks', JSON.stringify(newTasksValue));
        setInitialTasks(newTasksValue);
    }

    return [initialTasks, addTask, deleteTask, deleteAllTasks, changeStateTask]
}
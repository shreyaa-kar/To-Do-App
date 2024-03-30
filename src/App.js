import addIcon from './add-img.png';
import "./App.css";
import React, { useEffect, useState } from 'react';
import TaskCard from './components/TaskCard/TaskCard';


function App() {
    const [tasks, setTask] = useState([]);
    const [newTask, setNewTask] = useState('');
    const [error, setError] = useState('');
    const [category, setCategory] = useState('');

    const saveTaskToLS = (taskToSave)=>{
        localStorage.setItem('tasks',JSON.stringify(taskToSave));
    }

    const addTask = () => {
        if(newTask==''){
            setError("First enter a task");
            return
        }
        else if(newTask.length < 5){
            setError("Please enter more than 5 words");
            return
        }
        else{
            setError([''])
        }

        const newTasks = [
            {
                title: newTask,
                category: category,
            }, 
            ...tasks
        ]
        saveTaskToLS(newTasks);

        setTask(newTasks);
        setNewTask('');
    }

    const deleteTask = (index) => {
        const newTask = tasks;
        newTask.splice(index, 1);
        setTask([...newTask]);

        saveTaskToLS(newTask);
    }

    useEffect(()=>{
        const tasks = localStorage.getItem('tasks');
        if(tasks){
            setTask(JSON.parse(tasks));
        }
    }, [])

    return (
        <div>
            <div className='container'>
                <div className='box w-40 bg-dark-subtle mx-auto my-5 shadow px-4 rounded-5 border border-dark'>
                    <h1 className='text-center m-2'>Todo App</h1><hr/>
                    <div className='task-container px-2'>
                        {
                            tasks.map((task, i)=>{
                                const {title, category} = task;
                                return (<TaskCard 
                                            title={title} 
                                            category={category}
                                            key={i} 
                                            delFunction={deleteTask} 
                                            index={i}
                                        />)
                            })
                        }
                    </div>
                    <p className='text-center war text-danger'>{error}</p>
                    <div className='input-container d-flex justify-content-between align-items-center px-1 m-2'>
                        <input type='text' 
                            placeholder='Add a new task' 
                            className='py-2 px-3 rounded-5 border border-dark fs-5 w-100'
                            value={newTask}
                            onChange={(e)=>{
                                setNewTask(e.target.value)
                            }}/>

                        <select className='p-1 rounded-5 border border-dark w-30 ms-2'
                                value={category}
                                onChange={(e)=>{
                                    setCategory(e.target.value)
                                }}>
                            <option>Select</option>
                            <option value='🎓 College'>🎓 College</option>
                            <option value='📖 Study'>📖 Study</option>
                            <option value='🏡 Home'>🏡 Home</option>
                            <option value='📽️ RTC'>📽️ RTC</option>
                            <option value='🎨 Hobby'>🎨 Hobby</option>
                        </select>

                        <img 
                            src={addIcon} alt='add' 
                            className='add-icon'
                            onClick={addTask} />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default App
import React, { useState } from 'react';
import './App.css';
import TodoList, { TaskType } from "./TodoList";
import { v1 } from "uuid";
import { AddTodolistItem } from './AddTodolistItem';

type TodolistType = {
    id: string
    title: string
    filter: FilterValuesType
}
type TaskStateType = {
    [todoListId: string]: TaskType[]
}
export type FilterValuesType = "all" | "active" | "completed"

function App() {
    const todoListId_1 = v1();
    const todoListId_2 = v1();

    const [todolistsSt, setTodoListSt] = useState<TodolistType[]>([
        { id: todoListId_1, title: 'what to learn', filter: 'all' },
        { id: todoListId_2, title: 'what to read', filter: 'all' }
    ])

    const [tasksSt, setTasksSt] = useState<TaskStateType>({
        [todoListId_1]: [
            { id: v1(), title: 'css', isDone: false },
            { id: v1(), title: 'html', isDone: false },
            { id: v1(), title: 'js', isDone: false },
        ],
        [todoListId_2]: [
            { id: v1(), title: 'milk', isDone: false },
            { id: v1(), title: 'bread', isDone: false },
            { id: v1(), title: 'meat', isDone: false },
        ],
    })

    const removeTask = (taskId: string, todoListId: string) => {
        const updatedTasks = tasksSt[todoListId].filter(t => t.id !== taskId)
        setTasksSt({ ...tasksSt, [todoListId]: updatedTasks })
    }
    const addTask = (title: string, todoListId: string) => {
        const newTask: TaskType = {
            id: v1(),
            title: title,
            isDone: false
        }
        const updatedTasks = [...tasksSt[todoListId], newTask]
        setTasksSt({ ...tasksSt, [todoListId]: updatedTasks })
    }
    const changeTaskStatus = (taskId: string, newIsDoneValue: boolean, todoListId: string) => {
        setTasksSt({ ...tasksSt, [todoListId]: tasksSt[todoListId].map(el => el.id === taskId ? { ...el, isDone: newIsDoneValue } : el) })
    }
    const changeTaskTitle = (taskId: string, newTitleValue: string, todoListId: string) => {
        setTasksSt({ ...tasksSt, [todoListId]: tasksSt[todoListId].map(el => el.id === taskId ? { ...el, title: newTitleValue } : el) })
    }
    const changeTodolistFilter = (nextFilter: FilterValuesType, todoListId: string) => {
        setTodoListSt(todolistsSt.map(el => el.id === todoListId ? { ...el, filter: nextFilter } : el))
    }
    const removeTodolist = (todoListId: string) => {
        setTodoListSt(todolistsSt.filter(el => el.id !== todoListId));
        delete tasksSt[todoListId];
    }
    const changeTodolistTitle = (newTodolistValue: string, todoListId: string) => {
        setTodoListSt(todolistsSt.map(el => el.id === todoListId ? {...el, title:newTodolistValue}:el));
    }
    const getTasksForMe = (tasks: Array<TaskType>, filterValue: FilterValuesType) => {
        switch (filterValue) {
            case "active":
                return tasks.filter(t => !t.isDone)
            case "completed":
                return tasks.filter(t => t.isDone)
            default:
                return tasks
        }
    }

    const AddTodolist = (title: string) => {
        const temp = v1();
        setTodoListSt([...todolistsSt, { id: temp, title, filter: 'all' }]);
        setTasksSt({ ...tasksSt, [temp]: [] })
    }
    return (
        <div className="App">
            <AddTodolistItem AddTodolist={AddTodolist} />
            {todolistsSt.map(el => {
                const tasksWhatIWantToSee = getTasksForMe(tasksSt[el.id], el.filter)

                return (<li key={el.id}>
                    <TodoList
                        filter={el.filter}
                        title={el.title}
                        tasks={tasksWhatIWantToSee}
                        todoListId={el.id}

                        addTask={addTask}
                        removeTask={removeTask}
                        changeTaskStatus={changeTaskStatus}
                        changeTaskTitle={changeTaskTitle}

                        changeTodolistFilter={changeTodolistFilter}
                        removeTodolist={removeTodolist}
                        changeTodolistTitle={changeTodolistTitle}
                    /></li>)
            })}
        </div>
    );
}

export default App;


/** 04.05.2023
 * import React, { useState } from 'react';
import './App.css';
import TodoList, { TaskType } from "./TodoList";
import { v1 } from "uuid";


//CRUD
//C-create
//R-read (filter, search, sort)
//U-update
//D-delete
type TodolistType = {
    id: string
    title: string
    filter: FilterValuesType
}
type TaskStateType = {
    [todoListId: string]: TaskType[]
}
export type FilterValuesType = "all" | "active" | "completed"

function App() {
    const todoListId_1 = v1();
    const todoListId_2 = v1();

    const [todolistsSt, setTodoListSt] = useState<TodolistType[]>([
        { id: todoListId_1, title: 'what to learn', filter: 'all' },
        { id: todoListId_2, title: 'what to read', filter: 'all' }
    ])

    const [tasksSt, setTasksSt] = useState<TaskStateType>({
        [todoListId_1]: [
            { id: v1(), title: 'css', isDone: false },
            { id: v1(), title: 'html', isDone: false },
            { id: v1(), title: 'js', isDone: false },
        ],
        [todoListId_2]: [
            { id: v1(), title: 'milk', isDone: false },
            { id: v1(), title: 'bread', isDone: false },
            { id: v1(), title: 'meat', isDone: false },
        ],
    })

    // const todoListTitle: string = "What to learn"
    // const [tasks, setTasks] = useState<Array<TaskType>>([
    //     {id: v1(), title: "HTML&CSS", isDone: false},
    //     {id: v1(), title: "JS/ES6&TS", isDone: true},
    //     {id: v1(), title: "REACT/REDUX", isDone: false},
    // ])
    const removeTask = (taskId: string, todoListId: string) => {
        // const updatedTasks = tasks.filter(t => t.id !== taskId)
        // setTasks(updatedTasks)
        const updatedTasks = tasksSt[todoListId].filter(t => t.id !== taskId)
        setTasksSt({ ...tasksSt, [todoListId]: updatedTasks })
    }
    const addTask = (title: string, todoListId: string) => {
        const newTask: TaskType = {
            id: v1(),
            title: title,
            isDone: false
        }
        // setTasks([newTask, ...tasks])
        const updatedTasks = [...tasksSt[todoListId], newTask]
        setTasksSt({ ...tasksSt, [todoListId]: updatedTasks })
    }
    const changeTaskStatus = (taskId: string, newIsDoneValue: boolean, todoListId: string) => {
        //setTasks(tasks.map(t => t.id === taskId ? {...t, isDone: newIsDoneValue} : t))
        // const updatedTasks = tasksSt[todoListId].filter(t => t.id !== taskId)
        setTasksSt({ ...tasksSt, [todoListId]: tasksSt[todoListId].map(el => el.id === taskId ? { ...el, isDone: newIsDoneValue } : el) })
        //setTasksSt({...tasksSt,})
    }



    // const[filter, setFilter] = useState<FilterValuesType>("all")
    // const changeFilter = (nextFilter: FilterValuesType) => {
    //     setFilter(nextFilter)
    // }

    const changeTodolistFilter = (nextFilter: FilterValuesType, todoListId: string) => {
        // setFilter(nextFilter)
        setTodoListSt(todolistsSt.map(el=>el.id===todoListId?{...el,filter:nextFilter}:el))
    }

    const removeTodolist = (todoListId: string) => {
        setTodoListSt(todolistsSt.filter(el => el.id !== todoListId));
        delete tasksSt[todoListId];
    }

    const getTasksForMe = (tasks: Array<TaskType>, filterValue: FilterValuesType) => {
        switch (filterValue) {
            case "active":
                return tasks.filter(t => !t.isDone)
            case "completed":
                return tasks.filter(t => t.isDone)
            default:
                return tasks
        }
    }

    // const tasksWhatIWantToSee = getTasksForMe(tasks, filter)

    return (
        <div className="App">
            {todolistsSt.map(el=>{
                const tasksWhatIWantToSee = getTasksForMe(tasksSt[el.id], el.filter)

                return (<li>
                <TodoList
                    filter={el.filter}
                    title={el.title}
                    tasks={tasksWhatIWantToSee}                    
                    todoListId={el.id}

                    addTask={addTask}
                    removeTask={removeTask}
                    changeTaskStatus={changeTaskStatus}

                    changeTodolistFilter={changeTodolistFilter}
                    removeTodolist={removeTodolist}
                /></li>)})}
            </div>
            );
        }
        
        export default App;
        
 */
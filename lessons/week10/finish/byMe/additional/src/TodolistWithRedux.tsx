import React, { ChangeEvent } from 'react';
import { FilterValuesType, TasksStateType } from './App';
import { AddItemForm } from './AddItemForm';
import { EditableSpan } from './EditableSpan';
import IconButton from "@mui/material/IconButton/IconButton";
import { Delete } from "@mui/icons-material";
import { Button, Checkbox } from "@mui/material";
import { useSelector } from 'react-redux';
import { AppRootStateType } from './state/store';
import { useDispatch } from 'react-redux';
import { addTaskAC, changeTaskStatusAC, changeTaskTitleAC, removeTaskAC } from './state/tasks-reducer';
import { TodolistType } from './AppWithRedux';
import { changeTodolistFilterAC, changeTodolistTitleAC, removeTodolistAC } from './state/todolists-reducer';


export type TaskType = {
    id: string
    title: string
    isDone: boolean
}

type PropsType = {
    id: string
    title: string
    // tasks: Array<TaskType>
    // removeTask: (taskId: string, todolistId: string) => void
    // changeFilter: (value: FilterValuesType, todolistId: string) => void
    // addTask: (title: string, todolistId: string) => void
    // changeTaskStatus: (id: string, isDone: boolean, todolistId: string) => void
    // removeTodolist: (id: string) => void
    // changeTodolistTitle: (id: string, newTitle: string) => void
    filter: FilterValuesType
    // changeTaskTitle: (taskId: string, newTitle: string, todolistId: string) => void
}

export function TodolistWithRedux(props: PropsType) {
    // let todolists=useSelector<AppRootStateType,Array<TodolistType>>(state=>state.todolists)
    let tasks = useSelector<AppRootStateType, TaskType[]>(state => state.tasks[props.id])
    const dispatch = useDispatch();

    if (props.filter === "active") {
        tasks = tasks.filter(t => t.isDone === false);
    }
    if (props.filter === "completed") {
        tasks = tasks.filter(t => t.isDone === true);
    }

    const addTask = (title: string) => {
        // props.addTask(title, props.id);
        dispatch(addTaskAC(title,props.id))//?
    }

    const removeTodolist = () => {
        // props.removeTodolist(props.id);
        dispatch(removeTodolistAC(props.id));
    }
    const changeTodolistTitle = (title: string) => {
        dispatch(changeTodolistTitleAC(props.id,title));
    }

    const onAllClickHandler = () => dispatch(changeTodolistFilterAC(props.id,"all"))
    const onActiveClickHandler = () => dispatch(changeTodolistFilterAC(props.id,"active"))
    const onCompletedClickHandler = () => dispatch(changeTodolistFilterAC(props.id,"completed"))

    return <div>
        <h3> <EditableSpan value={props.title} onChange={changeTodolistTitle} />
            <IconButton onClick={removeTodolist}>
                <Delete />
            </IconButton>
        </h3>
        <AddItemForm addItem={addTask} />
        <div>
            {
                tasks.map(t => {
                    const onClickHandler = () => dispatch(removeTaskAC(t.id, props.id))
                    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
                        let newIsDoneValue = e.currentTarget.checked;
                        dispatch(changeTaskStatusAC(t.id, newIsDoneValue, props.id));
                    }
                    const onTitleChangeHandler = (newValue: string) => {
                        dispatch(changeTaskTitleAC(t.id, newValue, props.id));
                    }


                    return <div key={t.id} className={t.isDone ? "is-done" : ""}>
                        <Checkbox
                            checked={t.isDone}
                            color="primary"
                            onChange={onChangeHandler}
                        />

                        <EditableSpan value={t.title} onChange={onTitleChangeHandler} />
                        <IconButton onClick={onClickHandler}>
                            <Delete />
                        </IconButton>
                    </div>
                })
            }
        </div>
        <div>
            <Button variant={props.filter === 'all' ? 'outlined' : 'text'}
                onClick={onAllClickHandler}
                color={'inherit'}
            >All
            </Button>
            <Button variant={props.filter === 'active' ? 'outlined' : 'text'}
                onClick={onActiveClickHandler}
                color={'primary'}>Active
            </Button>
            <Button variant={props.filter === 'completed' ? 'outlined' : 'text'}
                onClick={onCompletedClickHandler}
                color={'secondary'}>Completed
            </Button>
        </div>
    </div>
}



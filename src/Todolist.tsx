import * as React from 'react';
import { Button, SvgIcon, Typography } from '@mui/material';
import { makeStyles } from '@mui/styles';
import { useCallback } from 'react';
import { AddItemForm } from './AddItemForm';
import { EditableSpan } from './EditableSpan';
import ClearIcon from '@mui/icons-material/Clear';
import { Task } from './Task';
import { useDispatch, useSelector } from 'react-redux';
import { changeTodolistFilterAC, changeTodolistTitleAC, removeTodolistAC } from './state/reducers/todolist-reducer';
import { addTaskAC, changeTaskStatusAC, changeTaskTitleAC, removeTaskAC } from './state/reducers/tasks-reducer';
import { FilterValuesType } from './AppWithRedux';
import { AppStateType } from './state/store';


export const useStyles = makeStyles({
    checkbox: {
        // color: green[800],
        // '&.Mui-checked': {
        //     color: green[600],
        // }
    },
    title: {
        padding: '10px',
    },
    buttons: {
        padding: '10px',
        paddingTop: '25px',
    },
});

export type TaskType = {
    id: string
    title: string
    isDone: boolean
}

type TodolistType = {
    todolistId: string
    title: string
    filter: FilterValuesType
}

export const Todolist: React.FC<TodolistType> = React.memo((props) => {
    const classes = useStyles();
    const dispatch = useDispatch();
    const tasks = useSelector<AppStateType, Array<TaskType>>(state => state.tasks[props.todolistId])

    ///tasks filter
    let allTodolistTasks = tasks;
    let tasksForTodolist = allTodolistTasks;

    if (props.filter === "active") {
        tasksForTodolist = allTodolistTasks.filter(t => t.isDone === false);
    }
    if (props.filter === "completed") {
        tasksForTodolist = allTodolistTasks.filter(t => t.isDone === true);
    }
    ///tasks filter


    const removeTask = useCallback((id: string, todolistId: string) => {
        dispatch(removeTaskAC(id, todolistId))
    }, [dispatch])
    const changeStatus = useCallback((taskId: string, isDone: boolean, todolistId: string) => {
        dispatch(changeTaskStatusAC(taskId, isDone, todolistId))
    }, [dispatch])
    const changeSpanValue = useCallback((newTitle: string, taskId: string, todolistId: string) => {
        dispatch(changeTaskTitleAC(taskId, newTitle, todolistId))
    }, [dispatch])

    
    const changeFilter = useCallback((filter: FilterValuesType, todolistId: string) => {
        dispatch(changeTodolistFilterAC(filter, todolistId))
    }, [dispatch])

    const onAllClickHandler = useCallback(() => changeFilter("all", props.todolistId), [props.todolistId]);
    const onActiveClickHandler = useCallback(() => changeFilter("active", props.todolistId), [props.todolistId]);
    const onCompletedClickHandler = useCallback(() => changeFilter("completed", props.todolistId), [props.todolistId]);


    const removeTodoList = () => {
        let isConfirmed = window.confirm('Are you sure you want to delete this Todolist?');
        if (isConfirmed) {
            dispatch(removeTodolistAC(props.todolistId))
        } else return
    }
    const addTask = useCallback((title: string) => {
        dispatch(addTaskAC(title, props.todolistId))
    }, [dispatch, props.todolistId])

    const changeTodolistTitle = useCallback((title: string) => {
        dispatch(changeTodolistTitleAC(title, props.todolistId))
    }, [dispatch, props.todolistId])


    return <div>
        <SvgIcon onClick={removeTodoList} fontSize='large' >
            <ClearIcon></ClearIcon>
        </SvgIcon>
        <div className={classes.title}>
            <Typography variant="h5" align="center" color='primary'>
                <EditableSpan title={props.title} onChange={changeTodolistTitle} />
            </Typography>
        </div>


        <AddItemForm addItem={addTask} label="Add your item" />

        {
            tasksForTodolist.map(t =>
                <Task tasks={tasksForTodolist} todolistId={props.todolistId} removeTask={removeTask} changeTaskStatus={changeStatus} changeSpanValue={changeSpanValue} task={t} />)
        }

        <div className={classes.buttons}>
            <Button variant={props.filter === 'all' ? "contained" : "text"} color='primary' className={props.filter === 'all' ? "active-filter" : ""}
                onClick={onAllClickHandler}>All</Button>
            <Button variant={props.filter === 'active' ? "contained" : "text"} color='primary' className={props.filter === 'active' ? "active-filter" : ""}
                onClick={onActiveClickHandler}>Active</Button>
            <Button variant={props.filter === 'completed' ? "contained" : "text"} color='primary' className={props.filter === 'completed' ? "active-filter" : ""}
                onClick={onCompletedClickHandler}>Completed</Button>
        </div>
    </div >
})

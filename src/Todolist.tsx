import * as React from 'react';
import { Button, SvgIcon, Typography } from '@mui/material';
import { makeStyles } from '@mui/styles';
import { useCallback } from 'react';
import { AddItemForm } from './AddItemForm';
import { EditableSpan } from './EditableSpan';
import ClearIcon from '@mui/icons-material/Clear';
import { Task } from './Task';
import { useDispatch } from 'react-redux';
import { changeTodolistFilterAC, changeTodolistTitleAC, removeTodolistAC } from './state/reducers/todolist-reducer';
import { addTaskAC, changeTaskStatusAC, changeTaskTitleAC, removeTaskAC } from './state/reducers/tasks-reducer';
import { FilterValuesType } from './AppWithRedux';


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
    todolist_id: string
    title: string
    tasks: Array<TaskType>
    filter: FilterValuesType
}

export const Todolist = React.memo((props: TodolistType) => {
    const classes = useStyles();
    const dispatch = useDispatch();


    const removeTask = useCallback((id: string, todolist_id: string) => {
        dispatch(removeTaskAC(id, todolist_id))
    }, [dispatch])
    const changeStatus = useCallback((taskId: string, isDone: boolean, todolist_id: string) => {
        dispatch(changeTaskStatusAC(taskId, isDone, todolist_id))
    }, [dispatch])
    const changeSpanValue = useCallback((newTitle: string, taskId: string, todolist_id: string) => {
        dispatch(changeTaskTitleAC(taskId, newTitle, todolist_id))
    }, [dispatch])

    
    const changeFilter = useCallback((filter: FilterValuesType, todolist_id: string) => {
        dispatch(changeTodolistFilterAC(filter, todolist_id))
    }, [dispatch])

    const onAllClickHandler = useCallback(() => changeFilter("all", props.todolist_id), [props.todolist_id]);
    const onActiveClickHandler = useCallback(() => changeFilter("active", props.todolist_id), [props.todolist_id]);
    const onCompletedClickHandler = useCallback(() => changeFilter("completed", props.todolist_id), [props.todolist_id]);


    const removeTodoList = () => {
        let isConfirmed = window.confirm('Are you sure you want to delete this Todolist?');
        if (isConfirmed) {
            dispatch(removeTodolistAC(props.todolist_id))
        } else return
    }
    const addTask = useCallback((title: string) => {
        dispatch(addTaskAC(title, props.todolist_id))
    }, [dispatch, props.todolist_id])

    const changeTodolistTitle = useCallback((title: string) => {
        dispatch(changeTodolistTitleAC(title, props.todolist_id))
    }, [dispatch, props.todolist_id])


    ///tasks filter
    let tasksForTodolist = props.tasks;

    if (props.filter === "active") {
        tasksForTodolist = props.tasks.filter(t => t.isDone === false);
    }
    if (props.filter === "completed") {
        tasksForTodolist = props.tasks.filter(t => t.isDone === true);
    }
    ///tasks filter



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
            props.tasks.map(t =>
                <Task tasks={props.tasks} todolist_id={props.todolist_id} removeTask={removeTask} changeTaskStatus={changeStatus} changeSpanValue={changeSpanValue} task={t} />)
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

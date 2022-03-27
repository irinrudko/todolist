import * as React from 'react';
import { Button, SvgIcon, Typography } from '@mui/material';
import { makeStyles } from '@mui/styles';
import { useCallback } from 'react';
import { AddItemForm } from './AddItemForm';
import { FilterValuesType } from './App';
import { EditableSpan } from './EditableSpan';
import ClearIcon from '@mui/icons-material/Clear';
import { Task } from './Task';


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
    removeTask: (taskId: string, todolist_id: string) => void
    changeFilter: (value: FilterValuesType, todolist_id: string) => void
    addTask: (title: string, todolist_id: string) => void
    filter: FilterValuesType
    changeTaskStatus: (taskId: string, isDone: boolean, todolist_id: string) => void
    removeTodoList: (todolistId: string) => void
    changeSpanValue: (newTitle: string, taskId: string, todolist_id: string) => void
    changeTodolistTitle: (newTitle: string, todolist_id: string) => void
}

export const Todolist = React.memo((props: TodolistType) => {
    const classes = useStyles();


    const onAllClickHandler = useCallback(() => props.changeFilter("all", props.todolist_id), [props.changeFilter, props.todolist_id]);
    const onActiveClickHandler = useCallback(() => props.changeFilter("active", props.todolist_id), [props.changeFilter, props.todolist_id]);
    const onCompletedClickHandler = useCallback(() => props.changeFilter("completed", props.todolist_id), [props.changeFilter, props.todolist_id]);


    const removeTodoList = () => {
        let isConfirmed = window.confirm('Are you sure you want to delete this Todolist?');
        if (isConfirmed) {
            props.removeTodoList(props.todolist_id)
        } else return
    }
    const addTask = useCallback((title: string) => {
        props.addTask(title, props.todolist_id)
    }, [props.addTask, props.todolist_id])
    const changeTodolistTitle = useCallback((title: string) => {
        props.changeTodolistTitle(title, props.todolist_id)
    }, [props.changeTodolistTitle, props.todolist_id])


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
                <Task tasks={props.tasks} todolist_id={props.todolist_id} removeTask={props.removeTask} changeTaskStatus={props.changeTaskStatus} changeSpanValue={props.changeSpanValue} task={t} />)
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

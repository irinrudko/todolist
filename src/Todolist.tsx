import * as React from 'react';
import { Button, Checkbox, IconButton, SvgIcon, Typography } from '@mui/material';
import { makeStyles } from '@mui/styles';
import { ChangeEvent } from 'react';
import { AddItemForm } from './AddItemForm';
import { FilterValuesType } from './App';
import { EditableSpan } from './EditableSpan';
import ClearIcon from '@mui/icons-material/Clear';
import RemoveIcon from '@mui/icons-material/Remove';

const useStyles = makeStyles({
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
    changeTaskStatus: (taskId: string, isDone: boolean, todolist_id: string) => void
    filter: FilterValuesType
    removeTodoList: (todolistId: string) => void
    changeSpanValue: (newTitle: string, taskId: string, todolist_id: string) => void
    changeTodolistTitle: (newTitle: string, todolist_id: string) => void
}

export function Todolist(props: TodolistType) {
    const classes = useStyles();

    const onAllClickHandler = () => props.changeFilter("all", props.todolist_id);
    const onActiveClickHandler = () => props.changeFilter("active", props.todolist_id);
    const onCompletedClickHandler = () => props.changeFilter("completed", props.todolist_id);
    const removeTodoList = () => {
        let isConfirmed = window.confirm('Are you sure you want to delete this Todolist?');
        if (isConfirmed) {
            props.removeTodoList(props.todolist_id)
        } else return
    }
    const addTask = (title: string) => {
        props.addTask(title, props.todolist_id)
    }
    const changeTodolistTitle = (title: string) => {
        props.changeTodolistTitle(title, props.todolist_id)
    }

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
        <div>
            {
                props.tasks.map(t => {
                    const onClickHandler = () => props.removeTask(t.id, props.todolist_id)
                    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
                        props.changeTaskStatus(t.id, e.currentTarget.checked, props.todolist_id);
                    }
                    const changeSpan = (newTitle: string) => {
                        props.changeSpanValue(newTitle, t.id, props.todolist_id)
                    }

                    return <div key={t.id} className={t.isDone ? "is-done" : ""}>
                        <div>
                            <Checkbox className={classes.checkbox}
                                onChange={onChangeHandler}
                                checked={t.isDone}
                                sx={{
                                    '& .MuiSvgIcon-root': { fontSize: 30 }
                                }}
                            />
                            <EditableSpan title={t.title} onChange={changeSpan} isDone={t.isDone} />
                            <IconButton onClick={onClickHandler} aria-label="delete" >
                                <RemoveIcon />
                            </IconButton>
                        </div>
                    </div>
                })
            }
        </div>
        <div className={classes.buttons}>
            <Button variant={props.filter === 'all' ? "contained" : "text"} color='primary' className={props.filter === 'all' ? "active-filter" : ""}
                onClick={onAllClickHandler}>All</Button>
            <Button variant={props.filter === 'active' ? "contained" : "text"} color='primary' className={props.filter === 'active' ? "active-filter" : ""}
                onClick={onActiveClickHandler}>Active</Button>
            <Button variant={props.filter === 'completed' ? "contained" : "text"} color='primary' className={props.filter === 'completed' ? "active-filter" : ""}
                onClick={onCompletedClickHandler}>Completed</Button>
        </div>
    </div>
}



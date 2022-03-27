import * as React from 'react';
import { Checkbox, IconButton } from '@mui/material';
import { ChangeEvent } from 'react';
import { EditableSpan } from './EditableSpan';
import RemoveIcon from '@mui/icons-material/Remove';
import { TaskType, useStyles } from './Todolist';
import { useCallback } from 'react';

type TaskPropsType = {
    task: TaskType
    tasks: Array<TaskType>
    todolist_id: string
    removeTask: (taskId: string, todolist_id: string) => void
    changeTaskStatus: (taskId: string, isDone: boolean, todolist_id: string) => void
    changeSpanValue: (newTitle: string, taskId: string, todolist_id: string) => void
};

export const Task: React.FC<TaskPropsType> = (props) => {
    const classes = useStyles();

    const onClickHandler = () => props.removeTask(props.task.id, props.todolist_id);
    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        props.changeTaskStatus(props.task.id, e.currentTarget.checked, props.todolist_id);
    };
    const changeSpan = useCallback((newTitle: string) => {
        props.changeSpanValue(newTitle, props.task.id, props.todolist_id);
    }, [props.changeSpanValue, props.task.id, props.todolist_id]);

    return <>
        <div key={props.task.id} className={props.task.isDone ? "is-done" : ""}>
            <div>
                <Checkbox className={classes.checkbox}
                    onChange={onChangeHandler}
                    checked={props.task.isDone}
                    sx={{
                        '& .MuiSvgIcon-root': { fontSize: 30 }
                    }} />
                <EditableSpan title={props.task.title} onChange={changeSpan} isDone={props.task.isDone} />
                <IconButton onClick={onClickHandler} aria-label="delete">
                    <RemoveIcon />
                </IconButton>
            </div>
        </div>
    </>

};

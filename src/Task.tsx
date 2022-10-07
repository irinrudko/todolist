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
    todolistId: string
    removeTask: (taskId: string, todolistId: string) => void
    changeTaskStatus: (taskId: string, isDone: boolean, todolistId: string) => void
    changeSpanValue: (newTitle: string, taskId: string, todolistId: string) => void
};

export const Task: React.FC<TaskPropsType> = React.memo( (props) => {
    const classes = useStyles();

    const onClickHandler = () => props.removeTask(props.task.id, props.todolistId);
    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        props.changeTaskStatus(props.task.id, e.currentTarget.checked, props.todolistId);
    };
    const changeSpan = useCallback((newTitle: string) => {
        props.changeSpanValue(newTitle, props.task.id, props.todolistId);
    }, [props.changeSpanValue, props.task.id, props.todolistId]);

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

});

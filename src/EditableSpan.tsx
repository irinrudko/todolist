import { TextField } from '@mui/material';
import React, { ChangeEvent } from 'react';
import { useState } from 'react';


type EditableSpanType = {
    title: string
    onChange: (title: string) => void
    isDone?: boolean
}

export const EditableSpan: React.FC<EditableSpanType> = (props) => {
    const [editMode, setEditMode] = useState(false)
    let [title, setTitle] = useState('')


    const enableEditMode = () => {
        if (!props.isDone) {
            setEditMode(true)
            setTitle(props.title)
        }
    }


    const disableEditMode = () => {
        setEditMode(false)
        props.onChange(title)
    }

    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setTitle(e.currentTarget.value)
    }

    return editMode
        ? <TextField value={title} onChange={onChangeHandler} onBlur={disableEditMode}
            color='primary'
            variant={'standard'}
            autoFocus />
        : <span onDoubleClick={enableEditMode}>{props.title}</span>

};

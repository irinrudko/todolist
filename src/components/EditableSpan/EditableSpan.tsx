import { TextField } from '@mui/material'
import React, { ChangeEvent } from 'react'
import { useState } from 'react'

type EditableSpanType = {
	title: string
	onChange: (title: string) => void
	// isDone?: boolean
	//если есть необязательный параметр, то React.memo не работает
}

//TODO сделать окончание редактирования на onEnter

export const EditableSpan: React.FC<EditableSpanType> = React.memo((props) => {
	const [editMode, setEditMode] = useState(false)
	let [title, setTitle] = useState('')
	let [error, setError] = useState<string | null>(null)

	const enableEditMode = () => {
		setEditMode(true)
		setTitle(props.title)
	}

	const disableEditMode = () => {
		setEditMode(false)
		props.onChange(title)
	}

	const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
		const changedTitle = e.currentTarget.value
		if (changedTitle.length <= 30) {
			setTitle(changedTitle)
		} else {
			setError('Title cannot be more than 30 symbols')
		}
	}

	return editMode ? (
		<TextField
			value={title}
			onChange={onChangeHandler}
			onBlur={disableEditMode}
			error={!!error}
			helperText={error}
			color="primary"
			variant={'standard'}
			autoFocus
		/>
	) : (
		<span onDoubleClick={enableEditMode}>{props.title}</span>
	)
})

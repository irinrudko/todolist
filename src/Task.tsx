import * as React from 'react'
import { Checkbox, IconButton } from '@mui/material'
import { ChangeEvent } from 'react'
import { EditableSpan } from './EditableSpan'
import RemoveIcon from '@mui/icons-material/Remove'
import { useStyles } from './Todolist'
import { useCallback } from 'react'
import { TaskType } from './state/reducers/tasks-reducer'
import { TaskStatuses } from './API/api'

type TaskPropsType = {
	task: TaskType
	tasks: Array<TaskType>
	todolistId: string
	removeTask: (taskId: string, todolistId: string) => void
	changeTaskStatus: (taskId: string, status: TaskStatuses, todolistId: string) => void
	changeSpanValue: (newTitle: string, taskId: string, todolistId: string) => void
}

export const Task: React.FC<TaskPropsType> = React.memo((props) => {
	const classes = useStyles()

	const onClickHandler = () => props.removeTask(props.task.id, props.todolistId)
	const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
		props.changeTaskStatus(
			props.task.id,
			e.currentTarget.checked ? TaskStatuses.Completed : TaskStatuses.New,
			props.todolistId
		)
	}
	const changeSpan = useCallback(
		(newTitle: string) => {
			props.changeSpanValue(newTitle, props.task.id, props.todolistId)
		},
		[props.changeSpanValue, props.task.id, props.todolistId]
	)

	return (
		<>
			<div key={props.task.id} className={props.task.completed ? 'is-done' : ''}>
				<div>
					<Checkbox
						className={classes.checkbox}
						onChange={onChangeHandler}
						checked={!!props.task.status}
						sx={{
							'& .MuiSvgIcon-root': { fontSize: 30 },
						}}
					/>
					<EditableSpan title={props.task.title} onChange={changeSpan} />
					<IconButton onClick={onClickHandler} aria-label="delete">
						<RemoveIcon />
					</IconButton>
				</div>
			</div>
		</>
	)
})

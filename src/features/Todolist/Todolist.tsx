import * as React from 'react'
import { Button, SvgIcon, Typography } from '@mui/material'
import { makeStyles } from '@mui/styles'
import { useCallback, useEffect } from 'react'
import { AddItemForm } from '../../components/AddItemForm/AddItemForm'
import { EditableSpan } from '../../components/EditableSpan/EditableSpan'
import ClearIcon from '@mui/icons-material/Clear'
import { Task } from './Task/Task'
import {
	changeTodolistFilterAC,
	changeTodolistTitleTH,
	removeTodolistTC,
	TodolistType,
} from '../../state/reducers/todolists-reducer'
import { addTaskTC, fetchTasksTC, removeTaskTC, updateTaskTC } from '../../state/reducers/tasks-reducer'
import { FilterValuesType } from '../../app/App'
import { useAppDispatch, useAppSelector } from '../../state/store'
import { TaskStatuses } from '../../API/todolists-api'

export const useStyles = makeStyles({
	checkbox: {},
	title: {
		padding: '10px',
	},
	buttons: {
		padding: '10px',
		paddingTop: '25px',
	},
})

export const Todolist: React.FC<TodolistType> = React.memo((props) => {
	useEffect(() => {
		dispatch(fetchTasksTC(props.id))
	}, [props.id])

	const classes = useStyles()
	const dispatch = useAppDispatch()
	const tasks = useAppSelector((state) => state.tasks[props.id])

	///tasks filter
	let allTodolistTasks = tasks
	let tasksForTodolist = allTodolistTasks

	if (props.filter === 'active') {
		tasksForTodolist = allTodolistTasks.filter((t) => t.status === TaskStatuses.New)
	}
	if (props.filter === 'completed') {
		tasksForTodolist = allTodolistTasks.filter((t) => t.status === TaskStatuses.Completed)
	}
	///tasks filter
	const onAllClickHandler = useCallback(() => changeFilter('all', props.id), [props.id])
	const onActiveClickHandler = useCallback(() => changeFilter('active', props.id), [props.id])
	const onCompletedClickHandler = useCallback(() => changeFilter('completed', props.id), [props.id])

	const removeTodoList = () => {
		let isConfirmed = window.confirm('Are you sure you want to delete this Todolist?')
		if (isConfirmed) {
			dispatch(removeTodolistTC(props.id))
		} else return
	}
	const changeTodolistTitle = useCallback(
		(title: string) => {
			dispatch(changeTodolistTitleTH(props.id, title))
		},
		[dispatch, props.id]
	)
	const changeFilter = useCallback(
		(filter: FilterValuesType, todolistId: string) => {
			debugger
			dispatch(changeTodolistFilterAC(filter, todolistId))
		},
		[dispatch]
	)

	const addTask = useCallback(
		(title: string) => {
			dispatch(addTaskTC(title, props.id))
		},
		[dispatch, props.id]
	)
	const removeTask = useCallback(
		(id: string, todolistId: string) => {
			dispatch(removeTaskTC(id, todolistId))
		},
		[dispatch]
	)
	const changeTaskStatus = useCallback(
		(id: string, status: TaskStatuses, todolistId: string) => {
			dispatch(updateTaskTC(id, { status }, todolistId))
		},
		[dispatch]
	)
	const changeSpanValue = useCallback(
		(title: string, taskId: string, todolistId: string) => {
			dispatch(updateTaskTC(taskId, { title }, todolistId))
		},
		[dispatch]
	)

	return (
		<div>
			<SvgIcon onClick={removeTodoList} fontSize="large">
				<ClearIcon sx={{ cursor: 'pointer' }}></ClearIcon>
			</SvgIcon>
			<div className={classes.title}>
				<Typography variant="h5" align="center" color="primary">
					<EditableSpan title={props.title} onChange={changeTodolistTitle} />
				</Typography>
			</div>

			<AddItemForm addItem={addTask} label="Add your item" />

			{tasksForTodolist.map((t) => (
				<Task
					tasks={tasksForTodolist}
					todolistId={props.id}
					removeTask={removeTask}
					changeTaskStatus={changeTaskStatus}
					changeSpanValue={changeSpanValue}
					task={t}
					key={t.id}
				/>
			))}

			<div className={classes.buttons}>
				<Button
					variant={props.filter === 'all' ? 'contained' : 'text'}
					color="primary"
					className={props.filter === 'all' ? 'active-filter' : ''}
					onClick={onAllClickHandler}
				>
					All
				</Button>
				<Button
					variant={props.filter === 'active' ? 'contained' : 'text'}
					color="primary"
					className={props.filter === 'active' ? 'active-filter' : ''}
					onClick={onActiveClickHandler}
				>
					Active
				</Button>
				<Button
					variant={props.filter === 'completed' ? 'contained' : 'text'}
					color="primary"
					className={props.filter === 'completed' ? 'active-filter' : ''}
					onClick={onCompletedClickHandler}
				>
					Completed
				</Button>
			</div>
		</div>
	)
})

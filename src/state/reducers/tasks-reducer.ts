import { AppStateType, AppThunk } from './../store'
import { TaskPriorities, tasksAPI, TaskStatuses, UpdateTaskModel } from '../../API/todolists-api'
import { TasksStateType } from '../../app/App'
import { addTodolistAC, removeTodolistAC, setTodolistsAC } from './todolists-reducer'
import { setAppStatusAC } from './app-reducer'
import { handleServerNetworkError } from '../../utils/error-utils'
import { createSlice, PayloadAction } from '@reduxjs/toolkit'

const initialState: TasksStateType = {}

const slice = createSlice({
	name: 'tasks',
	initialState,
	reducers: {
		removeTaskAC(state, action: PayloadAction<{ id: string; todolistId: string }>) {
			const tasks = state[action.payload.todolistId]

			const index = tasks.findIndex((t) => t.id === action.payload.id)
			if (index !== -1) tasks.splice(index, 1)
		},
		addTaskAC(state, action: PayloadAction<{ task: TaskType }>) {
			const tasks = state[action.payload.task.todoListId]
			tasks.unshift(action.payload.task)
		},
		updateTaskAC(state, action: PayloadAction<{ id: string; model: UpdateDomainTaskModelType; todolistId: string }>) {
			const tasks = state[action.payload.todolistId]
			const index = tasks.findIndex((task) => task.id === action.payload.id)
			tasks[index] = { ...tasks[index], ...action.payload.model }
		},
		setTasksAC(state, action: PayloadAction<{ tasks: Array<TaskType>; todolistId: string }>) {
			state[action.payload.todolistId] = action.payload.tasks
		},
		clearTasks() {
			return {}
		},
	},
	extraReducers: (builder) => {
		builder.addCase(addTodolistAC, (state, action) => {
			state[action.payload.todolist.id] = []
		})
		builder.addCase(removeTodolistAC, (state, action) => {
			delete state[action.payload.id]
		})
		builder.addCase(setTodolistsAC, (state, action) => {
			action.payload.todolists.forEach((tl) => {
				state[tl.id] = []
			})
		})
	},
})

export const tasksReducer = slice.reducer
export const { removeTaskAC, addTaskAC, updateTaskAC, setTasksAC, clearTasks } = slice.actions

export const fetchTasksTC = (todolistId: string): AppThunk => {
	return (dispatch) => {
		dispatch(setAppStatusAC({ status: 'loading' }))

		tasksAPI
			.getTasks(todolistId)
			.then((res) => {
				let tasks = res.items
				dispatch(setTasksAC({ tasks, todolistId }))
				dispatch(setAppStatusAC({ status: 'success' }))
			})
			.catch((error) => {
				handleServerNetworkError(error, dispatch)
			})
	}
}
export const removeTaskTC = (id: string, todolistId: string): AppThunk => {
	return (dispatch) => {
		dispatch(setAppStatusAC({ status: 'loading' }))

		tasksAPI
			.deleteTask(todolistId, id)
			.then(() => {
				dispatch(removeTaskAC({ id, todolistId }))
				dispatch(setAppStatusAC({ status: 'success' }))
			})
			.catch((error) => {
				handleServerNetworkError(error, dispatch)
			})
	}
}
export const addTaskTC = (title: string, todolistId: string): AppThunk => {
	return (dispatch) => {
		dispatch(setAppStatusAC({ status: 'loading' }))

		tasksAPI
			.createTask(todolistId, title)
			.then((res) => {
				let task = res.data.item
				dispatch(addTaskAC({ task }))
				dispatch(setAppStatusAC({ status: 'success' }))
			})
			.catch((error) => {
				handleServerNetworkError(error, dispatch)
			})
	}
}
export const updateTaskTC = (taskId: string, domainModel: UpdateDomainTaskModelType, todolistId: string): AppThunk => {
	return (dispatch, getState: () => AppStateType) => {
		dispatch(setAppStatusAC({ status: 'loading' }))

		const state = getState()
		const task = state.tasks[todolistId].find((t) => t.id === taskId)

		if (task) {
			const apiModel: UpdateTaskModel = {
				status: task.status,
				title: task.title,
				description: task.description,
				priority: task.priority,
				startDate: task.startDate,
				deadline: task.deadline,
				completed: task.completed,
				...domainModel,
			}

			tasksAPI
				.updateTask(todolistId, taskId, apiModel)
				.then(() => {
					dispatch(updateTaskAC({ id: taskId, model: domainModel, todolistId }))
					dispatch(setAppStatusAC({ status: 'success' }))
				})
				.catch((error) => {
					handleServerNetworkError(error, dispatch)
				})
		}
	}
}

export type TaskType = {
	title: string
	id: string
	status: TaskStatuses
	completed: boolean
	todoListId: string
	description: string
	priority: TaskPriorities
	startDate: string
	deadline: string
	order: number
	addedDate: string
}
export type UpdateDomainTaskModelType = {
	title?: string
	description?: string
	status?: TaskStatuses
	priority?: TaskPriorities
	startDate?: string
	deadline?: string
}
export type TasksActionType =
	| ReturnType<typeof removeTaskAC>
	| ReturnType<typeof addTaskAC>
	| ReturnType<typeof updateTaskAC>
	| ReturnType<typeof removeTodolistAC>
	| ReturnType<typeof setTodolistsAC>
	| ReturnType<typeof setTasksAC>

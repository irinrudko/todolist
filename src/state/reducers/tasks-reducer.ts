import { AppStateType, AppThunk } from './../store'
import { TaskPriorities, tasksAPI, TaskStatuses, UpdateTaskModel } from '../../API/todolists-api'
import { TasksStateType } from '../../app/App'
import { handleServerNetworkError } from '../../utils/error-utils'
import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { appActions } from './app-reducer'
import { todolistsActions } from './todolists-reducer'
import { createAppAsyncThunk } from '../../utils/create-app-async-thunk'

const initialState: TasksStateType = {}

const fetchTasks = createAppAsyncThunk<{ tasks: TaskType[]; todolistId: string }, string>(
	'tasks/fetchTasksTC',
	async (todolistId, thunkAPI) => {
		const { dispatch, rejectWithValue } = thunkAPI

		try {
			dispatch(appActions.setAppStatusAC({ status: 'loading' }))
			const res = await tasksAPI.getTasks(todolistId)
			const tasks = res.items

			dispatch(appActions.setAppStatusAC({ status: 'success' }))
			return { tasks, todolistId }
		} catch (e) {
			handleServerNetworkError(e, dispatch)
			return rejectWithValue(null)
		}
	}
)

const addTask = createAppAsyncThunk<{ task: TaskType }, { title: string; todolistId: string }>(
	'tasks/addTask',
	async (arg, thunkAPI) => {
		const { dispatch, rejectWithValue } = thunkAPI

		try {
			dispatch(appActions.setAppStatusAC({ status: 'loading' }))
			const response = await tasksAPI.createTask(arg.todolistId, arg.title)
			const task = response.data.item

			dispatch(appActions.setAppStatusAC({ status: 'success' }))
			return { task }
		} catch (e) {
			handleServerNetworkError(e, dispatch)
			return rejectWithValue(null)
		}
	}
)

const removeTask = createAppAsyncThunk<{ id: string; todolistId: string }, { id: string; todolistId: string }>(
	'tasks/removeTask',
	async (arg, thunkAPI) => {
		const { dispatch, rejectWithValue } = thunkAPI

		try {
			dispatch(appActions.setAppStatusAC({ status: 'loading' }))
			const res = await tasksAPI.deleteTask(arg.todolistId, arg.id)
			dispatch(appActions.setAppStatusAC({ status: 'success' }))
			return arg
		} catch (e) {
			handleServerNetworkError(e, dispatch)
			return rejectWithValue(null)
		}
	}
)

const slice = createSlice({
	name: 'tasks',
	initialState,
	reducers: {
		updateTaskAC(state, action: PayloadAction<{ id: string; model: UpdateDomainTaskModelType; todolistId: string }>) {
			const tasks = state[action.payload.todolistId]
			const index = tasks.findIndex((task) => task.id === action.payload.id)
			tasks[index] = { ...tasks[index], ...action.payload.model }
		},
		clearTasks() {
			return {}
		},
	},
	extraReducers: (builder) => {
		builder.addCase(fetchTasks.fulfilled, (state, action) => {
			state[action.payload.todolistId] = action.payload.tasks
		})
		builder.addCase(addTask.fulfilled, (state, action) => {
			const tasks = state[action.payload.task.todoListId]
			tasks.unshift(action.payload.task)
		})
		builder.addCase(removeTask.fulfilled, (state, action) => {
			const tasks = state[action.payload.todolistId]

			const index = tasks.findIndex((t) => t.id === action.payload.id)
			if (index !== -1) tasks.splice(index, 1)
		})
		builder.addCase(todolistsActions.addTodolistAC, (state, action) => {
			state[action.payload.todolist.id] = []
		})
		builder.addCase(todolistsActions.removeTodolistAC, (state, action) => {
			delete state[action.payload.id]
		})
		builder.addCase(todolistsActions.setTodolistsAC, (state, action) => {
			action.payload.todolists.forEach((tl) => {
				state[tl.id] = []
			})
		})
	},
})

export const tasksReducer = slice.reducer
export const tasksActions = slice.actions
export const tasksThunks = { fetchTasks, addTask, removeTask }

export const updateTaskTC = (taskId: string, domainModel: UpdateDomainTaskModelType, todolistId: string): AppThunk => {
	return (dispatch, getState: () => AppStateType) => {
		dispatch(appActions.setAppStatusAC({ status: 'loading' }))

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
					dispatch(tasksActions.updateTaskAC({ id: taskId, model: domainModel, todolistId }))
					dispatch(appActions.setAppStatusAC({ status: 'success' }))
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

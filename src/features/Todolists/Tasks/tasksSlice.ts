import { TaskPriorities, tasksAPI, TaskStatuses, UpdateTaskModel } from '../../../common/API/todolists-api'
import { TasksStateType } from '../../../app/App'
import { handleServerNetworkError } from '../../../common/utils/error-utils'
import { createSlice } from '@reduxjs/toolkit'
import { appActions } from '../../../app/appSlice'
import { todolistsThunks } from '../todolistsSlice'
import { createAppAsyncThunk } from '../../../common/utils/create-app-async-thunk'
import { clearTasksAndTodolists } from '../../../common/actions/common-actions'

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
const updateTask = createAppAsyncThunk<UpdateTaskArgType, UpdateTaskArgType>('tasks/updateTask', async (arg, thunkAPI) => {
	const { dispatch, rejectWithValue, getState } = thunkAPI
	const state = getState()
	const task = state.tasks[arg.todolistId].find((t) => t.id === arg.id)

	try {
		dispatch(appActions.setAppStatusAC({ status: 'loading' }))

		if (task) {
			const apiModel: UpdateTaskModel = {
				status: task.status,
				title: task.title,
				description: task.description,
				priority: task.priority,
				startDate: task.startDate,
				deadline: task.deadline,
				completed: task.completed,
				...arg.model,
			}
			await tasksAPI.updateTask(arg.todolistId, arg.id, apiModel)

			dispatch(appActions.setAppStatusAC({ status: 'success' }))
		}

		return arg
	} catch (e) {
		handleServerNetworkError(e, dispatch)
		return rejectWithValue(null)
	}
})
const removeTask = createAppAsyncThunk<RemoveTaskArgType, RemoveTaskArgType>('tasks/removeTask', async (arg, thunkAPI) => {
	const { dispatch, rejectWithValue } = thunkAPI
	try {
		dispatch(appActions.setAppStatusAC({ status: 'loading' }))
		await tasksAPI.deleteTask(arg)

		dispatch(appActions.setAppStatusAC({ status: 'success' }))
		return arg
	} catch (e) {
		handleServerNetworkError(e, dispatch)
		return rejectWithValue(null)
	}
})

const slice = createSlice({
	name: 'tasks',
	initialState,
	reducers: {},
	extraReducers: (builder) => {
		builder.addCase(fetchTasks.fulfilled, (state, action) => {
			state[action.payload.todolistId] = action.payload.tasks
		})
		builder.addCase(addTask.fulfilled, (state, action) => {
			const tasks = state[action.payload.task.todoListId]
			tasks.unshift(action.payload.task)
		})
		builder.addCase(updateTask.fulfilled, (state, action) => {
			const tasks = state[action.payload.todolistId]
			const index = tasks.findIndex((task) => task.id === action.payload.id)
			tasks[index] = { ...tasks[index], ...action.payload.model }
		})
		builder.addCase(removeTask.fulfilled, (state, action) => {
			const tasks = state[action.payload.todolistId]

			const index = tasks.findIndex((t) => t.id === action.payload.id)
			if (index !== -1) tasks.splice(index, 1)
		})
		builder.addCase(todolistsThunks.fetchTodoliststs.fulfilled, (state, action) => {
			action.payload.todolists.forEach((tl) => {
				state[tl.id] = []
			})
		})
		builder.addCase(todolistsThunks.addTodolist.fulfilled, (state, action) => {
			state[action.payload.todolist.id] = []
		})
		builder.addCase(todolistsThunks.removeTodolist.fulfilled, (state, action) => {
			delete state[action.payload.id]
		})
		builder.addCase(clearTasksAndTodolists, (state, action) => {
			return {}
		})
	},
})

export const tasksSlice = slice.reducer
export const tasksActions = slice.actions
export const tasksThunks = { fetchTasks, addTask, removeTask, updateTask }

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
export type RemoveTaskArgType = {
	id: string
	todolistId: string
}
export type UpdateTaskArgType = {
	id: string
	model: UpdateDomainTaskModelType
	todolistId: string
}

import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { todolistsAPI } from '../../common/API/todolists-api'
import { FilterValuesType } from '../../app/App'
import { handleServerNetworkError } from '../../common/utils/error-utils'
import { AppThunk } from '../../app/store'
import { appActions } from '../../app/appSlice'
import { clearTasksAndTodolists } from '../../common/actions/common-actions'
import { createAppAsyncThunk } from '../../common/utils/create-app-async-thunk'

const initialState: Array<TodolistType> = []

const fetchTodoliststs = createAppAsyncThunk<{ todolists: TodolistType[] }>('todolists/fetchTodoliststs', async (_, thunkAPI) => {
	const { dispatch, rejectWithValue } = thunkAPI
	try {
		dispatch(appActions.setAppStatusAC({ status: 'loading' }))
		const response = await todolistsAPI.getTodolists()
		dispatch(appActions.setAppStatusAC({ status: 'success' }))
		return { todolists: response }
	} catch (e) {
		handleServerNetworkError(e, dispatch)
		return rejectWithValue(null)
	}
})

const removeTodolist = createAppAsyncThunk<{ id: string }, string>('todo/removeTodolist', async (id, thunkAPI) => {
	const { dispatch, rejectWithValue } = thunkAPI

	try {
		dispatch(appActions.setAppStatusAC({ status: 'loading' }))
		todolistsAPI.deleteTodolist(id)
		dispatch(appActions.setAppStatusAC({ status: 'success' }))
		return { id }
	} catch (e) {
		handleServerNetworkError(e, dispatch)
		return rejectWithValue(null)
	}
})

const slice = createSlice({
	name: 'todolists',
	initialState,
	reducers: {
		addTodolistAC(state, action: PayloadAction<{ todolist: TodolistType }>) {
			state.unshift({
				...action.payload.todolist,
				id: action.payload.todolist.id,
				title: action.payload.todolist.title,
				filter: 'all',
				addedDate: action.payload.todolist.addedDate,
				order: action.payload.todolist.order,
			})
		},
		changeTodolistTitleAC(state, action: PayloadAction<{ id: string; title: string }>) {
			const index = state.findIndex((tl) => tl.id === action.payload.id)
			state[index].title = action.payload.title
		},
		changeTodolistFilterAC(state, action: PayloadAction<{ filter: FilterValuesType; id: string }>) {
			const index = state.findIndex((tl) => tl.id === action.payload.id)
			state[index].filter = action.payload.filter
		},
	},
	extraReducers: (builder) => {
		builder.addCase(clearTasksAndTodolists, (state, action) => {
			return []
		})
		builder.addCase(fetchTodoliststs.fulfilled, (state, action) => {
			return action.payload.todolists.map((tl) => ({
				...tl,
				filter: 'all',
			}))
		})
		builder.addCase(removeTodolist.fulfilled, (state, action) => {
			const index = state.findIndex((tl) => tl.id === action.payload.id)
			if (index !== -1) state.splice(index, 1)
		})
	},
})

export const todolistsSlice = slice.reducer
export const todolistsActions = slice.actions
export const todolistsThunks = { fetchTodoliststs, removeTodolist }

export const addTodolistTC = (title: string): AppThunk => {
	return (dispatch) => {
		dispatch(appActions.setAppStatusAC({ status: 'loading' }))

		todolistsAPI
			.createTodolist(title)
			.then((res) => {
				let todolist = res.data.item
				dispatch(todolistsActions.addTodolistAC({ todolist }))
				dispatch(appActions.setAppStatusAC({ status: 'success' }))
			})
			.catch((error) => {
				handleServerNetworkError(error, dispatch)
			})
	}
}
export const changeTodolistTitleTH = (id: string, title: string): AppThunk => {
	return (dispatch) => {
		dispatch(appActions.setAppStatusAC({ status: 'loading' }))

		todolistsAPI
			.updateTodolist(id, title)
			.then(() => {
				dispatch(todolistsActions.changeTodolistTitleAC({ id, title }))
				dispatch(appActions.setAppStatusAC({ status: 'success' }))
			})
			.catch((error) => {
				handleServerNetworkError(error, dispatch)
			})
	}
}

type TodolistResponseType = {
	id: string
	title: string
	order?: number
	addedDate?: string
}
export type TodolistType = TodolistResponseType & {
	filter: FilterValuesType
}

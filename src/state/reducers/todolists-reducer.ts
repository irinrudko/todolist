import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { todolistsAPI } from '../../API/todolists-api'
import { FilterValuesType } from '../../app/App'
import { handleServerNetworkError } from '../../utils/error-utils'
import { AppThunk } from '../store'
import { appActions } from './app-reducer'

const initialState: Array<TodolistType> = []

const slice = createSlice({
	name: 'todolists',
	initialState,
	reducers: {
		setTodolistsAC(state, action: PayloadAction<{ todolists: Array<TodolistType> }>) {
			return action.payload.todolists.map((tl) => ({
				...tl,
				filter: 'all',
			}))
		},
		removeTodolistAC(state, action: PayloadAction<{ id: string }>) {
			const index = state.findIndex((tl) => tl.id === action.payload.id)
			if (index !== -1) state.splice(index, 1)
		},
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
		clearTodolists() {
			return []
		},
	},
})

export const todolistsReducer = slice.reducer
export const todolistsActions = slice.actions

export const { setTodolistsAC, removeTodolistAC, addTodolistAC, changeTodolistTitleAC, changeTodolistFilterAC, clearTodolists } =
	slice.actions

export const fetchTodoliststTC = (): AppThunk => {
	return (dispatch) => {
		dispatch(appActions.setAppStatusAC({ status: 'loading' }))

		todolistsAPI
			.getTodolists()
			.then((todolists) => {
				dispatch(setTodolistsAC({ todolists }))
				dispatch(appActions.setAppStatusAC({ status: 'success' }))
			})
			.catch((error) => {
				handleServerNetworkError(error, dispatch)
			})
	}
}
export const removeTodolistTC = (id: string): AppThunk => {
	return (dispatch) => {
		dispatch(appActions.setAppStatusAC({ status: 'loading' }))

		todolistsAPI
			.deleteTodolist(id)
			.then(() => {
				dispatch(removeTodolistAC({ id }))
				dispatch(appActions.setAppStatusAC({ status: 'success' }))
			})
			.catch((error) => {
				handleServerNetworkError(error, dispatch)
			})
	}
}
export const addTodolistTC = (title: string): AppThunk => {
	return (dispatch) => {
		dispatch(appActions.setAppStatusAC({ status: 'loading' }))

		todolistsAPI
			.createTodolist(title)
			.then((res) => {
				let todolist = res.data.item
				dispatch(addTodolistAC({ todolist }))
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
				dispatch(changeTodolistTitleAC({ id, title }))
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

export type TodolistsActionTypes =
	| ReturnType<typeof removeTodolistAC>
	| ReturnType<typeof addTodolistAC>
	| ReturnType<typeof changeTodolistTitleAC>
	| ReturnType<typeof changeTodolistFilterAC>
	| ReturnType<typeof setTodolistsAC>

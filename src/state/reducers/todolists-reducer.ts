import { todolistsAPI } from '../../API/todolists-api'
import { FilterValuesType } from '../../app/App'
import { handleServerNetworkError } from '../../utils/error-utils'
import { AppThunk } from '../store'
import { setAppStatusAC } from './app-reducer'
import { addTodolistAC } from './todolists-tasks-reducer'

const initialState: Array<TodolistType> = []

export const todolistsReducer = (
	state: Array<TodolistType> = initialState,
	action: TodolistsActionTypes
): Array<TodolistType> => {
	switch (action.type) {
		case 'SET-TODOLISTS': {
			return action.todolists.map((tl) => ({
				...tl,
				filter: 'all',
			}))
		}
		case 'REMOVE-TODOLIST': {
			return state.filter((t) => t.id !== action.id)
		}
		case 'ADD-TODOLIST': {
			return [
				...state,
				{
					id: action.todolist.id,
					title: action.todolist.title,
					filter: 'all',
					addedDate: action.todolist.addedDate,
					order: action.todolist.order,
				},
			]
		}
		case 'CHANGE-TODOLIST-TITLE': {
			const todolist = state.find((tl) => tl.id === action.id)
			if (todolist) {
				todolist.title = action.title
			}
			return [...state]
		}
		case 'CHANGE-TODOLIST-FILTER': {
			const todolist = state.find((tl) => tl.id === action.id)
			if (todolist) {
				todolist.filter = action.filter
			}
			return [...state]
		}
		default:
			return state
	}
}

export const setTodolistsAC = (todolists: Array<TodolistType>) => {
	return {
		type: 'SET-TODOLISTS',
		todolists,
	} as const
}
export const removeTodolistAC = (id: string) => {
	return {
		type: 'REMOVE-TODOLIST',
		id,
	} as const
}
export const changeTodolistTitleAC = (id: string, title: string) => {
	return {
		type: 'CHANGE-TODOLIST-TITLE',
		id,
		title,
	} as const
}
export const changeTodolistFilterAC = (filter: FilterValuesType, id: string) => {
	return {
		type: 'CHANGE-TODOLIST-FILTER',
		filter,
		id,
	} as const
}

export const fetchTodoliststTC = (): AppThunk => {
	return (dispatch) => {
		dispatch(setAppStatusAC({ status: 'loading' }))

		todolistsAPI
			.getTodolists()
			.then((todolists) => {
				dispatch(setTodolistsAC(todolists))
				dispatch(setAppStatusAC({ status: 'success' }))
			})
			.catch((error) => {
				handleServerNetworkError(error, dispatch)
			})
	}
}
export const removeTodolistTC = (id: string): AppThunk => {
	return (dispatch) => {
		dispatch(setAppStatusAC({ status: 'loading' }))

		todolistsAPI
			.deleteTodolist(id)
			.then(() => {
				dispatch(removeTodolistAC(id))
				dispatch(setAppStatusAC({ status: 'success' }))
			})
			.catch((error) => {
				handleServerNetworkError(error, dispatch)
			})
	}
}
export const addTodolistTC = (title: string): AppThunk => {
	return (dispatch) => {
		dispatch(setAppStatusAC({ status: 'loading' }))

		todolistsAPI
			.createTodolist(title)
			.then((res) => {
				let todolist = res.data.item
				dispatch(addTodolistAC(todolist))
				dispatch(setAppStatusAC({ status: 'success' }))
			})
			.catch((error) => {
				handleServerNetworkError(error, dispatch)
			})
	}
}
export const changeTodolistTitleTH = (id: string, title: string): AppThunk => {
	return (dispatch) => {
		dispatch(setAppStatusAC({ status: 'loading' }))

		todolistsAPI
			.updateTodolist(id, title)
			.then(() => {
				dispatch(changeTodolistTitleAC(id, title))
				dispatch(setAppStatusAC({ status: 'success' }))
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

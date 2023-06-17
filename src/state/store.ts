import { authReducer } from './reducers/auth-reducer'
import { AnyAction, combineReducers } from 'redux'
import thunk, { ThunkAction, ThunkDispatch } from 'redux-thunk'
import { TasksActionType, tasksReducer } from './reducers/tasks-reducer'
import { TodolistsActionTypes, todolistsReducer } from './reducers/todolists-reducer'
import { appReducer, AppReducerActionsType } from './reducers/app-reducer'
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux'
import { configureStore } from '@reduxjs/toolkit'

export const rootReducer = combineReducers({
	todolists: todolistsReducer,
	tasks: tasksReducer,
	auth: authReducer,
	app: appReducer,
})

export type AppStateType = ReturnType<typeof rootReducer>
export type AppDispatch = ThunkDispatch<AppStateType, unknown, AnyAction>
export const useAppDispatch = () => useDispatch<AppDispatch>()
export const useAppSelector: TypedUseSelectorHook<AppStateType> = useSelector
export type AppThunk<ReturnType = void> = ThunkAction<ReturnType, AppStateType, unknown, AnyAction>
export type AppRootActionType = TodolistsActionTypes | TasksActionType | AppReducerActionsType

export const store = configureStore({
	reducer: rootReducer,
	middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(thunk),
})

//@ts-ignore
window.store = store

import { authReducer } from '../features/auth/authSlice'
import { AnyAction, combineReducers } from 'redux'
import thunk, { ThunkAction, ThunkDispatch } from 'redux-thunk'
import { tasksReducer } from '../features/Todolists/Tasks/tasksSlice'
import { todolistsReducer } from '../features/Todolists/todolistsSlice'
import { appReducer } from './app-reducer'
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

export const store = configureStore({
	reducer: rootReducer,
	middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(thunk),
})

//@ts-ignore
window.store = store
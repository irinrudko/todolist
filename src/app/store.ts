import { AnyAction, combineReducers } from 'redux'
import thunk, { ThunkAction, ThunkDispatch } from 'redux-thunk'
import { configureStore } from '@reduxjs/toolkit'
import { useDispatch, TypedUseSelectorHook, useSelector } from 'react-redux'
import { tasksSlice } from '../features/Todolists/Tasks/tasksSlice'
import { todolistsSlice } from '../features/Todolists/todolistsSlice'
import { authSlice } from '../features/auth/authSlice'
import { appSlice } from './appSlice'

export const rootReducer = combineReducers({
	todolists: todolistsSlice,
	tasks: tasksSlice,
	auth: authSlice,
	app: appSlice,
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

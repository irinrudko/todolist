import { AuthActionsType, authReducer } from './reducers/auth-reducer'
import { AnyAction, applyMiddleware, combineReducers, legacy_createStore } from 'redux'
import thunk, { ThunkAction, ThunkDispatch } from 'redux-thunk'
import { TasksActionType, tasksReducer } from './reducers/tasks-reducer'
import { TodolistsActionTypes, todolistsReducer } from './reducers/todolists-reducer'
import { appReducer, AppReducerActionsType } from './reducers/app-reducer'
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux'

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
export type AppThunk<ReturnType = void> = ThunkAction<ReturnType, AppStateType, unknown, AppRootActionType>
export type AppRootActionType = TodolistsActionTypes | TasksActionType | AuthActionsType | AppReducerActionsType

export const store = legacy_createStore(rootReducer, applyMiddleware(thunk))

//@ts-ignore
window.store = store

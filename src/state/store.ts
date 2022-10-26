import { AuthActionsType, authReducer } from './reducers/auth-reducer'
import { AnyAction, applyMiddleware, combineReducers, createStore } from 'redux'
import thunk, { ThunkAction, ThunkDispatch } from 'redux-thunk'
import { TasksActionType, tasksReducer } from './reducers/tasks-reducer'
import { TodolistsActionTypes, todolistsReducer } from './reducers/todolist-reducer'
import { appReducer, AppReducerActionsType } from '../app/app-reducer'
import { useDispatch } from 'react-redux'

export const rootReducer = combineReducers({
	todolists: todolistsReducer,
	tasks: tasksReducer,
	auth: authReducer,
	app: appReducer,
})

export type AppStateType = ReturnType<typeof rootReducer>
export type AppDispatch = ThunkDispatch<AppStateType, unknown, AnyAction>
export const useAppDispatch = () => useDispatch<AppDispatch>()
export type AppThunk<ReturnType = void> = ThunkAction<ReturnType, AppStateType, unknown, AppRootActionType>
export type AppRootActionType = TodolistsActionTypes | TasksActionType | AuthActionsType | AppReducerActionsType

export const store = createStore(rootReducer, applyMiddleware(thunk))

//@ts-ignore
window.store = store

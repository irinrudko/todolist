import { applyMiddleware, combineReducers, createStore } from 'redux'
import thunk from 'redux-thunk'
import { tasksReducer } from './reducers/tasks-reducer'
import { todolistsReducer } from './reducers/todolist-reducer'

export const rootReducer = combineReducers({
	todolists: todolistsReducer,
	tasks: tasksReducer,
})

export type AppStateType = ReturnType<typeof rootReducer>

export const store = createStore(rootReducer, applyMiddleware(thunk))

//@ts-ignore
window.store = store

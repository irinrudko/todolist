import { combineReducers, createStore } from "redux";
import { tasksReducer } from "./reducers/tasks-reducer";
import { todolistsReducer } from "./reducers/todolist-reducer";

const rootReducers = combineReducers({
    todolists: todolistsReducer,
    tasks: tasksReducer
})

export type AppStateType = ReturnType<typeof rootReducers>

export const store = createStore(rootReducers)

//@ts-ignore
window.store = store;
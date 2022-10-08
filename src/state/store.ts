import { combineReducers, createStore } from "redux";
import { tasksReducer } from "./reducers/tasks-reducer";
import { todolistsReducer } from "./reducers/todolist-reducer";

const rootReducer = combineReducers({
    todolists: todolistsReducer,
    tasks: tasksReducer
})

export type AppStateType = ReturnType<typeof rootReducer>

export const store = createStore(rootReducer)

//@ts-ignore
window.store = store;
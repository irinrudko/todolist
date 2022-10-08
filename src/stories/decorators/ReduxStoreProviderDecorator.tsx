import React from "react"
import { Provider } from "react-redux"
import { combineReducers, createStore } from "redux"
import { tasksReducer } from "../../state/reducers/tasks-reducer"
import { todolistsReducer } from "../../state/reducers/todolist-reducer"
import { AppStateType } from "../../state/store"

const initialStore = {
    todolists:
    [
        { id: "todolistId1", title: "What to learn", filter: "all" },
        { id: "todolistId2", title: "What to buy", filter: "all" }
    ],
    tasks: {
        ["todolistId1"]: [
            { id: '1', title: "HTML&CSS", isDone: true },
            { id: '2', title: "JS", isDone: true },
            { id: '3', title: "Jest", isDone: true },
            { id: '4', title: "Storybook", isDone: false },
        ],
        ["todolistId2"]: [
            { id: '1', title: "Water", isDone: true },
            { id: '2', title: "React Book", isDone: true },
            { id: '3', title: "Clean code book", isDone: false },
        ]
    }
}

const rootReducer = combineReducers({
    tasks: tasksReducer,
    todolists: todolistsReducer
 })
 

export const storybookStore = createStore(rootReducer, initialStore as AppStateType )

export const ReduxStoreProviderDecorator = (storyFn: any) => {
    return <Provider store={storybookStore}>{storyFn()}</Provider>
}
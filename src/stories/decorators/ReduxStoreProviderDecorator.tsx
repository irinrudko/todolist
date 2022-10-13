import React from "react"
import { Provider } from "react-redux"
import { combineReducers, createStore } from "redux"
import { tasksReducer } from "../../state/reducers/tasks-reducer"
import { todolistsReducer } from "../../state/reducers/todolist-reducer"
import { AppStateType } from "../../state/store"

const initialStore: AppStateType = {
    todolists:
    [
        { id: "todolistId1", title: "What to learn", filter: "all", addedDate: '', order: 0  },
        { id: "todolistId2", title: "What to buy", filter: "all", addedDate: '', order: 1 }
    ],
    tasks: {
        ["todolistId1"]: [
            { id: '1', title: "HTML&CSS", completed: true, addedDate: '', deadline: '', description: '', order: 0, priority: '', startDate: '', status: '', todoListId: "todolistId1"  },
            { id: '2', title: "JS", completed: false, addedDate: '', deadline: '', description: '', order: 1, priority: '', startDate: '', status: '', todoListId: "todolistId1"  },
            { id: '3', title: "React", completed: true, addedDate: '', deadline: '', description: '', order: 2, priority: '', startDate: '', status: '', todoListId: "todolistId1"  },
            { id: '4', title: "Postman", completed: false, addedDate: '', deadline: '', description: '', order: 3, priority: '', startDate: '', status: '', todoListId: "todolistId1"  }
        ],
        ["todolistId2"]: [
            { id: '1', title: "Water", completed: true, addedDate: '', deadline: '', description: '', order: 0, priority: '', startDate: '', status: '', todoListId: "todolistId2"  },
            { id: '2', title: "Clean code book", completed: true, addedDate: '', deadline: '', description: '', order: 1, priority: '', startDate: '', status: '', todoListId: "todolistId2"  },
            { id: '3', title: "Apples", completed: false, addedDate: '', deadline: '', description: '', order: 2, priority: '', startDate: '', status: '', todoListId: "todolistId2"  }
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
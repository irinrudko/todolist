import { v1 } from "uuid";
import { FilterValuesType, TodolistType } from "../App";


type ActionsType = ReturnType<typeof removeTodolistAC> | ReturnType<typeof addTodolistAC> | ReturnType<typeof changeTodolistTitleAC> | ReturnType<typeof changeTodolistTitleAC> | ReturnType<typeof changeTodolistFilterAC>

export const removeTodolistAC = (todolist_id: string) => {
    return {
        type: 'REMOVE-TODOLIST',
        id: todolist_id
    } as const
}
export const addTodolistAC = (title: string) => {
    return {
        type: 'ADD-TODOLIST',
        title: title
    } as const
}
export const changeTodolistTitleAC = (todolist_id: string, title: string) => {
    return {
        type: 'CHANGE-TODOLIST-TITLE',
        id: todolist_id,
        title: title
    } as const
}
export const changeTodolistFilterAC = (todolist_id: string, filter: FilterValuesType) => {
    return {
        type: 'CHANGE-TODOLIST-FILTER',
        id: todolist_id,
        filter: filter
    } as const
}

export const todolistsReducer = (state: Array<TodolistType>, action: ActionsType):
    Array<TodolistType> => {
    switch (action.type) {
        case 'REMOVE-TODOLIST':
            return state.filter(tl => tl.id !== action.id)

        case 'ADD-TODOLIST':
            return [...state, {
                id: v1(),
                title: action.title,
                filter: "active"
            }]

        case 'CHANGE-TODOLIST-TITLE':
            const todolist = state.find(tl => tl.id === action.id)
            if (todolist) {
                todolist.title = action.title
            }
            return [...state]

        case 'CHANGE-TODOLIST-FILTER':
            const todolist1 = state.find(tl => tl.id === action.id)
            if (todolist1) {
                todolist1.filter = action.filter;
            }
            return [...state]

        default:
            throw new Error('ooops!')
    }
}
import { Dispatch } from "redux";
import { v1 } from "uuid";
import { todolistsAPI } from "../../API/api";
import { FilterValuesType} from "../../AppWithRedux";
import { addTodolistAC } from "../reducers/todolists-tasks-reducer";

export const todolistId1 = v1();
export const todolistId2 = v1();

const initialState: Array<TodolistType> = []


export const todolistsReducer = (state: Array<TodolistType> = initialState, action: TodolistsActionTypes): Array<TodolistType> => {
    switch (action.type) {
        case 'REMOVE-TODOLIST': {
            return state.filter(t => t.id !== action.id);
        }
        case 'ADD-TODOLIST': {
            return [
                ...state,
                {
                    id: action.todolistId,
                    title: action.title,
                    filter: 'all',
                    addedDate: '',
                    order: 0
                }]
        }
        case 'CHANGE-TODOLIST-TITLE': {
            const todolist = state.find(tl => tl.id === action.id);
            if (todolist) {
                todolist.title = action.title
            }
            return [...state];
        }
        case 'CHANGE-TODOLIST-FILTER': {
            const todolist = state.find(tl => tl.id === action.id);
            if (todolist) {
                todolist.filter = action.filter;
            }
            return [...state]
        }
        case 'SET-TODOLISTS': {
            return action.todolists.map(tl => ({
                ...tl,
                filter: 'all'
            }))
        }
        default: return state
    }
}

export const fetchTodoliststTC = () => {
    return (dispatch: Dispatch) => {
        todolistsAPI.getTodolists()
            .then((todolists)=> {
                    dispatch(setTodolistsAC(todolists))
                })
    }
}


export const removeTodolistAC = (id: string) => {
    return {
        type: 'REMOVE-TODOLIST',
        id
    } as const
}
export const changeTodolistTitleAC = (id: string, title: string) => {
    return {
        type: 'CHANGE-TODOLIST-TITLE',
        id,
        title
    } as const
}
export const changeTodolistFilterAC = (filter: FilterValuesType, id: string) => {
    return {
        type: 'CHANGE-TODOLIST-FILTER',
        filter,
        id
    } as const
}
export const setTodolistsAC = (todolists: Array<TodolistType>)  => {
    return {
        type: 'SET-TODOLISTS',
        todolists       
    } as const
}



type TodolistResponseType = {
    id: string
    title: string
    order: number
    addedDate: string
}
type TodolistType = TodolistResponseType & {
    filter: FilterValuesType
}
export type TodolistsActionTypes = 
ReturnType<typeof removeTodolistAC> 
| ReturnType<typeof addTodolistAC>
| ReturnType<typeof changeTodolistTitleAC>
| ReturnType<typeof changeTodolistFilterAC>
| ReturnType<typeof setTodolistsAC> 

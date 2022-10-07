import { v1 } from "uuid";
import { TasksStateType } from "../../AppWithRedux";
import { addTodolistAC } from "../reducers/todolists-tasks-reducer";
import { removeTodolistAC, todolistId1, todolistId2 } from "./todolist-reducer";

const initialState: TasksStateType = {
    [todolistId1]: [
        { id: v1(), title: "HTML&CSS", isDone: true },
        { id: v1(), title: "JS", isDone: true }
    ],
    [todolistId2]: [
        { id: v1(), title: "Milk", isDone: true },
        { id: v1(), title: "React Book", isDone: true }
    ]
}

export const removeTaskAC = (id: string, todolistId: string) => {
    return {
        type: 'REMOVE-TASK',
        id,
        todolistId
    } as const
}
export const addTaskAC = (title: string, todolistId: string) => {
    return {
        type: 'ADD-TASK',
        title,
        todolistId
    } as const
}
export const changeTaskStatusAC = (id: string, isDone: boolean, todolistId: string) => {
    return {
        type: 'CHANGE-TASK-STATUS',
        id,
        isDone,
        todolistId
    } as const
}
export const changeTaskTitleAC = (id: string, newTitle: string, todolistId: string) => {
    return {
        type: 'CHANGE-TASK-TITLE',
        id,
        newTitle,
        todolistId
    } as const
}

type TasksActionType = ReturnType<typeof removeTaskAC> | ReturnType<typeof addTaskAC> | ReturnType<typeof changeTaskStatusAC> | ReturnType<typeof changeTaskTitleAC> | ReturnType<typeof addTodolistAC> | ReturnType<typeof removeTodolistAC>

export const tasksReducer = (state: TasksStateType = initialState, action: TasksActionType): TasksStateType => {
    switch (action.type) {
        case 'REMOVE-TASK': {
            let todolistTasks = state[action.todolistId];
            state[action.todolistId] = todolistTasks.filter(t => t.id !== action.id)
            return {
                ...state
            }
        }
        case 'ADD-TASK': {
            let task = { id: v1(), title: action.title, isDone: false };
            let todolistTasks = state[action.todolistId];
            state[action.todolistId] = [task, ...todolistTasks]
            return {
                ...state
            }
        }
        case 'CHANGE-TASK-STATUS': {
            let todolistTasks = state[action.todolistId];
            state[action.todolistId] = todolistTasks
                .map(t => t.id === action.id
                    ? { ...t, isDone: action.isDone }
                    : t);
            return { ...state }
        }
        case 'CHANGE-TASK-TITLE': {
            let todolistTasks = state[action.todolistId];
            state[action.todolistId] = todolistTasks
                .map(t => t.id === action.id
                    ? { ...t, title: action.newTitle }
                    : t);
            return { ...state }
        }
        case 'ADD-TODOLIST': {

            let todolist = action.todolistId;
            return { ...state, [todolist]: [] }
        }
        case 'REMOVE-TODOLIST': 
            delete state[action.id]
            return {...state}

        default: return state
    }
}


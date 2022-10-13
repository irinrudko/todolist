import { tasksAPI } from './../../API/api';
import { Dispatch } from "redux";
import { TasksStateType } from "../../AppWithRedux";
import { addTodolistAC } from "../reducers/todolists-tasks-reducer";
import { removeTodolistAC, setTodolistsAC } from "./todolist-reducer";

export type TaskType = {
    title: string
    id: string
    completed: boolean
    todoListId: string
    description: string
    status: string
    priority: string
    startDate: string
    deadline: string
    order: number
    addedDate: string
}

const initialState: TasksStateType = {}

export const removeTaskAC = (id: string, todolistId: string) => {
    return {
        type: 'REMOVE-TASK',
        id,
        todolistId
    } as const
}
export const addTaskAC = (task: TaskType) => {
    return {
        type: 'ADD-TASK',
        task
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
export const setTasksAC = (tasks: Array<TaskType>, todolistId: string)  => {
    return {
        type: 'SET-TASKS',
        tasks, 
        todolistId
    } as const
}


type TasksActionType = ReturnType<typeof removeTaskAC> | ReturnType<typeof addTaskAC> | ReturnType<typeof changeTaskStatusAC> | ReturnType<typeof changeTaskTitleAC> | ReturnType<typeof addTodolistAC> | ReturnType<typeof removeTodolistAC> | ReturnType<typeof setTodolistsAC> | ReturnType<typeof setTasksAC>

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
            const stateCopy = {...state}
            let newTask = action.task

            const tasks = stateCopy[newTask.todoListId];
            const newTasks = [newTask, ...tasks];
            stateCopy[newTask.todoListId] = newTasks;
            return stateCopy;
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
        case 'REMOVE-TODOLIST': {
            delete state[action.id]
            return {...state}
        }
        case 'SET-TODOLISTS': {
            const stateCopy = {...state}
            action.todolists.forEach((tl) => {
                stateCopy[tl.id] = []
            })
            return stateCopy;
        }
        case 'SET-TASKS': {
            const stateCopy = {...state}
            stateCopy[action.todolistId] = action.tasks
            return stateCopy;
        }
        default: return state
    }
}


export const fetchTasksTC = (todolistId: string) => {
    return (dispatch: Dispatch) => {
        tasksAPI.getTasks(todolistId)
            .then((res) => {
                let tasks = res.items
                dispatch(setTasksAC(tasks, todolistId))
            })
    }
}

export const removeTaskTC = (id: string, todolistId: string) => {
    return (dispatch: Dispatch) => {
        tasksAPI.deleteTask(todolistId, id)
            .then(() => {
                dispatch(removeTaskAC(id, todolistId))
            })
    }
}
export const addTaskTC = (title: string, todolistId: string) => {
    return (dispatch: Dispatch) => {
        tasksAPI.createTask(todolistId, title)
            .then((res) => {
                let task = res.data.item
                dispatch(addTaskAC(task))
            })
    }
}

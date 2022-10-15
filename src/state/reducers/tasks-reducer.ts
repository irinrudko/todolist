import { AppStateType } from './../store'
import { TaskPriorities, tasksAPI, TaskStatuses, UpdateTaskModel } from './../../API/api'
import { Dispatch } from 'redux'
import { TasksStateType } from '../../AppWithRedux'
import { addTodolistAC } from '../reducers/todolists-tasks-reducer'
import { removeTodolistAC, setTodolistsAC } from './todolist-reducer'

const initialState: TasksStateType = {}

export const tasksReducer = (state: TasksStateType = initialState, action: TasksActionType): TasksStateType => {
	switch (action.type) {
		case 'REMOVE-TASK': {
			let todolistTasks = state[action.todolistId]
			state[action.todolistId] = todolistTasks.filter((t) => t.id !== action.id)
			return {
				...state,
			}
		}
		case 'ADD-TASK': {
			const stateCopy = { ...state }
			let newTask = action.task

			const tasks = stateCopy[newTask.todoListId]
			const newTasks = [newTask, ...tasks]
			stateCopy[newTask.todoListId] = newTasks
			return stateCopy
		}
		case 'UPDATE-TASK': {
			return {
				...state,
				[action.todolistId]: state[action.todolistId].map((t) => (t.id === action.id ? { ...t, ...action.model } : t)),
			}
		}
		case 'ADD-TODOLIST': {
			let todolist = action.todolist.id
			return { ...state, [todolist]: [] }
		}
		case 'REMOVE-TODOLIST': {
			delete state[action.id]
			return { ...state }
		}
		case 'SET-TODOLISTS': {
			const stateCopy = { ...state }
			action.todolists.forEach((tl) => {
				stateCopy[tl.id] = []
			})
			return stateCopy
		}
		case 'SET-TASKS': {
			const stateCopy = { ...state }
			stateCopy[action.todolistId] = action.tasks
			return stateCopy
		}
		default:
			return state
	}
}

export const removeTaskAC = (id: string, todolistId: string) => {
	return {
		type: 'REMOVE-TASK',
		id,
		todolistId,
	} as const
}
export const addTaskAC = (task: TaskType) => {
	return {
		type: 'ADD-TASK',
		task,
	} as const
}
export const updateTaskAC = (id: string, model: UpdateDomainTaskModelType, todolistId: string) => {
	return {
		type: 'UPDATE-TASK',
		id,
		model,
		todolistId,
	} as const
}
export const changeTaskTitleAC = (id: string, newTitle: string, todolistId: string) => {
	return {
		type: 'CHANGE-TASK-TITLE',
		id,
		newTitle,
		todolistId,
	} as const
}
export const setTasksAC = (tasks: Array<TaskType>, todolistId: string) => {
	return {
		type: 'SET-TASKS',
		tasks,
		todolistId,
	} as const
}

export const fetchTasksTC = (todolistId: string) => {
	return (dispatch: Dispatch) => {
		tasksAPI.getTasks(todolistId).then((res) => {
			let tasks = res.items
			dispatch(setTasksAC(tasks, todolistId))
		})
	}
}
export const removeTaskTC = (id: string, todolistId: string) => {
	return (dispatch: Dispatch) => {
		tasksAPI.deleteTask(todolistId, id).then(() => {
			dispatch(removeTaskAC(id, todolistId))
		})
	}
}
export const addTaskTC = (title: string, todolistId: string) => {
	return (dispatch: Dispatch) => {
		tasksAPI.createTask(todolistId, title).then((res) => {
			let task = res.data.item
			dispatch(addTaskAC(task))
		})
	}
}
export const updateTaskTC = (taskId: string, domainModel: UpdateDomainTaskModelType, todolistId: string) => {
	return (dispatch: Dispatch, getState: () => AppStateType) => {
		const state = getState()
		const task = state.tasks[todolistId].find((t) => t.id === taskId)

		if (task) {
			const apiModel: UpdateTaskModel = {
				status: task.status,
				title: task.title,
				description: task.description,
				priority: task.priority,
				startDate: task.startDate,
				deadline: task.deadline,
				completed: task.completed,
				...domainModel,
			}

			tasksAPI.updateTask(todolistId, taskId, apiModel).then(() => {
				dispatch(updateTaskAC(taskId, domainModel, todolistId))
			})
		}
	}
}

export type TaskType = {
	title: string
	id: string
	status: TaskStatuses
	completed: boolean
	todoListId: string
	description: string
	priority: TaskPriorities
	startDate: string
	deadline: string
	order: number
	addedDate: string
}
export type UpdateDomainTaskModelType = {
	title?: string
	description?: string
	status?: TaskStatuses
	priority?: TaskPriorities
	startDate?: string
	deadline?: string
}
type TasksActionType =
	| ReturnType<typeof removeTaskAC>
	| ReturnType<typeof addTaskAC>
	| ReturnType<typeof updateTaskAC>
	| ReturnType<typeof changeTaskTitleAC>
	| ReturnType<typeof addTodolistAC>
	| ReturnType<typeof removeTodolistAC>
	| ReturnType<typeof setTodolistsAC>
	| ReturnType<typeof setTasksAC>

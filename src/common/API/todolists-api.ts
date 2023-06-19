import { RemoveTaskArgType } from '../../features/Todolists/Tasks/tasksSlice'
import { ChangeTodolistArgType } from '../../features/Todolists/todolistsSlice'
import { instance } from './instance'

export const todolistsAPI = {
	getTodolists() {
		return instance.get('todo-lists').then((response) => response.data)
	},
	createTodolist(title: string) {
		return instance.post('todo-lists', { title }).then((response) => response.data)
	},
	updateTodolist(arg: ChangeTodolistArgType) {
		return instance.put(`todo-lists/${arg.id}`, { title: arg.title }).then((response) => response.data)
	},
	deleteTodolist(id: string) {
		return instance.delete(`todo-lists/${id}`).then((response) => response.data)
	},
}
export const tasksAPI = {
	getTasks(todolistId: string) {
		return instance.get(`todo-lists/${todolistId}/tasks`).then((response) => response.data)
	},
	createTask(todolistId: string, title: string) {
		return instance.post(`todo-lists/${todolistId}/tasks`, { title }).then((response) => response.data)
	},
	updateTask(todolistId: string, id: string, model: UpdateTaskModel) {
		return instance.put(`todo-lists/${todolistId}/tasks/${id}`, model)
	},
	deleteTask(arg: RemoveTaskArgType) {
		return instance.delete(`todo-lists/${arg.todolistId}/tasks/${arg.id}`).then((response) => response.data)
	},
}

//types
export type UpdateTaskModel = {
	title: string
	status: TaskStatuses
	description: string
	priority: TaskPriorities
	startDate: string
	deadline: string
	completed: boolean
}

export enum TaskStatuses {
	New = 0,
	InProgress = 1,
	Completed = 2,
	Draft = 3,
}

export enum TaskPriorities {
	Low = 0,
	Middle = 1,
	Hi = 2,
	Urgently = 3,
	Later = 4,
}

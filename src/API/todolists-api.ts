import axios from 'axios'

const instance = axios.create({
	baseURL: 'https://social-network.samuraijs.com/api/1.1/',
	withCredentials: true,
	headers: { 'API-KEY': 'dcfcafd7-85ce-4812-a7da-28eb32543b9d' },
})

export const todolistsAPI = {
	getTodolists() {
		return instance.get('todo-lists').then((response) => response.data)
	},
	createTodolist(title: string) {
		return instance.post('todo-lists', { title }).then((response) => response.data)
	},
	updateTodolist(id: string, title: string) {
		return instance.put(`todo-lists/${id}`, { title }).then((response) => response.data)
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
	deleteTask(todolistId: string, id: string) {
		return instance.delete(`todo-lists/${todolistId}/tasks/${id}`).then((response) => response.data)
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

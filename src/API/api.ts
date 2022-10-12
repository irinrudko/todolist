import axios from "axios"


const instance = axios.create({
    baseURL: 'https://social-network.samuraijs.com/api/1.1/',
    withCredentials: true,
    headers: { 'API-KEY': 'dcfcafd7-85ce-4812-a7da-28eb32543b9d' }
})

export const todolistsAPI = {
    getTodolists() {
        return instance.get('todo-lists').then(response => response.data)
    },
    createTodolist(title: string) {
        return instance.post('todo-lists', {title}).then(response => response.data)
    },
    updateTodolist(id: string, title: string) {
        return instance.put(`todo-lists/${id}`, {title}).then(response => response.data)
    },
    deleteTodolist(id: string) {
        return instance.delete(`todo-lists/${id}`).then(response => response.data)
    }
}
export const tasksAPI = {
    getTasks(todolistId: string) {
        return instance.get(`todo-lists/${todolistId}/tasks`).then(response => response.data)
    },
    createTask(todolistId: string, title: string) {
        return instance.post(`todo-lists/${todolistId}/tasks`, {title}).then(response => response.data)
    },
    updateTask(todolistId: string, id: string, title: string, isDone: boolean) {
        return instance.put(`todo-lists/${todolistId}/tasks/${id}`, {title, isDone}).then(response => response.data)
    },
    deleteTask(todolistId: string, id: string) {
        return instance.delete(`todo-lists/${todolistId}/tasks/${id}`).then(response => response.data)
    }
    //check the route
}

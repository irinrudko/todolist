import { TodolistType } from './todolists-reducer'

export const addTodolistAC = (todolist: TodolistType) => {
	return {
		type: 'ADD-TODOLIST',
		todolist,
	} as const
}

import { v1 } from 'uuid'
import { changeTodolistFilterAC, changeTodolistTitleAC, todolistsReducer, TodolistType } from './todolists-reducer'

let todolistId1: string
let todolistId2: string
let startState: Array<TodolistType> = []

beforeEach(() => {
	todolistId1 = v1()
	todolistId2 = v1()

	startState = [
		{ id: todolistId1, title: 'What to learn', filter: 'all' },
		{ id: todolistId2, title: 'What to buy', filter: 'all' },
	]
})

test('correct todolist should be removed', () => {
	const endState = todolistsReducer(startState, { type: 'REMOVE-TODOLIST', id: todolistId1 })

	expect(endState.length).toBe(1)
	expect(endState[0].id).toBe(todolistId2)
})

test('correct todolist should change its name', () => {
	const endState = todolistsReducer(startState, changeTodolistTitleAC(todolistId2, 'newTodolistTitle'))

	expect(endState[0].title).toBe('What to learn')
	expect(endState[1].title).toBe('newTodolistTitle')
})

test('correct filter of todolist should be changed', () => {
	const endState = todolistsReducer(startState, changeTodolistFilterAC('completed', todolistId2))

	expect(endState[0].filter).toBe('all')
	expect(endState[1].filter).toBe('completed')
})

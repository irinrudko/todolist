import { v1 } from 'uuid'
import { TodolistType, todolistsSlice, todolistsActions } from './todolistsSlice'

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

it('should remove correct todolist', () => {
	const endState = todolistsSlice(startState, todolistsActions.removeTodolistAC({ id: todolistId1 }))

	expect(endState.length).toBe(1)
	expect(endState[0].id).toBe(todolistId2)
})

test('should change todolist title', () => {
	const endState = todolistsSlice(
		startState,
		todolistsActions.changeTodolistTitleAC({ id: todolistId2, title: 'newTodolistTitle' })
	)

	expect(endState[0].title).toBe('What to learn')
	expect(endState[1].title).toBe('newTodolistTitle')
})

it('should change todolist filter', () => {
	const endState = todolistsSlice(startState, todolistsActions.changeTodolistFilterAC({ filter: 'completed', id: todolistId2 }))

	expect(endState[0].filter).toBe('all')
	expect(endState[1].filter).toBe('completed')
})

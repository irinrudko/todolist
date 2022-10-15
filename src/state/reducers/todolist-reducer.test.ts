import { v1 } from 'uuid'
import { FilterValuesType, TodolistType } from '../../AppWithRedux'
import { addTodolistAC } from '../reducers/todolists-tasks-reducer'
import { changeTodolistFilterAC, changeTodolistTitleAC, todolistsReducer } from './todolist-reducer'

test('correct todolist should be removed', () => {
	let todolistId1 = v1()
	let todolistId2 = v1()

	const startState: Array<TodolistType> = [
		{ id: todolistId1, title: 'What to learn', filter: 'all' },
		{ id: todolistId2, title: 'What to buy', filter: 'all' },
	]

	const endState = todolistsReducer(startState, { type: 'REMOVE-TODOLIST', id: todolistId1 })

	expect(endState.length).toBe(1)
	expect(endState[0].id).toBe(todolistId2)
})

test('correct todolist should be added', () => {
	let todolistId1 = v1()
	let todolistId2 = v1()

	let newTodolistTitle = 'New Todolist'

	const startState: Array<TodolistType> = [
		{ id: todolistId1, title: 'What to learn', filter: 'all' },
		{ id: todolistId2, title: 'What to buy', filter: 'all' },
	]

	const endState = todolistsReducer(startState, addTodolistAC(newTodolistTitle))

	expect(endState.length).toBe(3)
	expect(endState[2].title).toBe(newTodolistTitle)
})

test('correct todolist should change its name', () => {
	let todolistId1 = v1()
	let todolistId2 = v1()

	let newTodolistTitle = 'New Todolist'

	const startState: Array<TodolistType> = [
		{ id: todolistId1, title: 'What to learn', filter: 'all' },
		{ id: todolistId2, title: 'What to buy', filter: 'all' },
	]

	const endState = todolistsReducer(startState, changeTodolistTitleAC(todolistId2, newTodolistTitle))

	expect(endState[0].title).toBe('What to learn')
	expect(endState[1].title).toBe(newTodolistTitle)
})

test('correct filter of todolist should be changed', () => {
	let todolistId1 = v1()
	let todolistId2 = v1()

	let newFilter: FilterValuesType = 'completed'

	const startState: Array<TodolistType> = [
		{ id: todolistId1, title: 'What to learn', filter: 'all' },
		{ id: todolistId2, title: 'What to buy', filter: 'all' },
	]

	const endState = todolistsReducer(startState, changeTodolistFilterAC(newFilter, todolistId2))

	expect(endState[0].filter).toBe('all')
	expect(endState[1].filter).toBe(newFilter)
})

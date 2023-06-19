import { v1 } from 'uuid'
import { TasksStateType } from '../../../app/App'
import { TaskType, tasksSlice, tasksThunks } from './tasksSlice'

//TODO:
//add tests for new reducers

let todolistId1: string
let todolistId2: string
let startState: TasksStateType = {}

beforeEach(() => {
	todolistId1 = v1()
	todolistId2 = v1()

	startState = {
		[todolistId1]: [
			{
				id: 'id',
				title: 'React',
				completed: true,
				addedDate: '',
				deadline: '',
				description: '',
				order: 0,
				priority: 2,
				startDate: '',
				status: 1,
				todoListId: todolistId1,
			},
			{
				id: '1',
				title: 'JS',
				completed: true,
				addedDate: '',
				deadline: '',
				description: '',
				order: 0,
				priority: 2,
				startDate: '',
				status: 1,
				todoListId: todolistId1,
			},
			{
				id: '2',
				title: 'HTML&CSS',
				completed: true,
				addedDate: '',
				deadline: '',
				description: '',
				order: 0,
				priority: 2,
				startDate: '',
				status: 2,
				todoListId: todolistId1,
			},
		],
		[todolistId2]: [
			{
				id: 'taskToUpdateId',
				title: 'Water',
				completed: true,
				addedDate: '',
				deadline: '',
				description: '',
				order: 0,
				priority: 1,
				startDate: '',
				status: 3,
				todoListId: todolistId2,
			},
			{
				id: '2',
				title: 'Clean code book',
				completed: true,
				addedDate: '',
				deadline: '',
				description: '',
				order: 1,
				priority: 2,
				startDate: '',
				status: 1,
				todoListId: todolistId2,
			},
			{
				id: '3',
				title: 'Apples',
				completed: false,
				addedDate: '',
				deadline: '',
				description: '',
				order: 2,
				priority: 0,
				startDate: '',
				status: 3,
				todoListId: todolistId2,
			},
		],
	}
})

it('should remove the correct task', () => {
	const args = { id: 'id', todolistId: todolistId1 }
	const endState = tasksSlice(startState, tasksThunks.removeTask.fulfilled(args, 'requestId', args))

	expect(endState[todolistId1].every((t) => t.id !== 'id')).toBeTruthy()
	expect(endState[todolistId1].length).toBe(2)
	expect(endState[todolistId2].length).toBe(3)
})

it('should add a task to the correct todolist', () => {
	let title = "hey, I'm a new task :) "
	const task: TaskType = {
		id: '0',
		title: title,
		completed: false,
		addedDate: '',
		deadline: '',
		description: '',
		order: 0,
		priority: 2,
		startDate: '',
		status: 1,
		todoListId: todolistId1,
	}

	const endState = tasksSlice(
		startState,
		tasksThunks.addTask.fulfilled({ task }, 'requestId', { title, todolistId: todolistId1 })
	)

	expect(endState[todolistId1].length).toBe(4)
	expect(endState[todolistId1][0].title).toBe(title)
	expect(endState[todolistId1][0].id).toBeDefined()
	expect(endState[todolistId1][0].completed).toBeFalsy()
	expect(endState[todolistId2].length).toBe(3)
})

it('should update the task status to not completed', () => {
	const task = { id: 'taskToUpdateId', model: { status: 0 }, todolistId: todolistId2 }
	const endState = tasksSlice(startState, tasksThunks.updateTask.fulfilled(task, 'requestId', task))

	expect(endState[todolistId2][0].status).toBe(0)
	expect(endState[todolistId2][0].id).toBe('taskToUpdateId')
})
it('should change the correct task title', () => {
	const task = { id: 'taskToUpdateId', model: { title: 'changedTitle' }, todolistId: todolistId2 }
	const endState = tasksSlice(startState, tasksThunks.updateTask.fulfilled(task, 'requestId', task))

	expect(endState[todolistId2][0].title).toBe('changedTitle')
	expect(endState[todolistId2][0].id).toBe('taskToUpdateId')
})

// TODO
//test status (checked / not checked)
//delete todolist + tasks

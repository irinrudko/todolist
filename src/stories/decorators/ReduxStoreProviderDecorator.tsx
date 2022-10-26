import React from 'react'
import { Provider } from 'react-redux'
import { applyMiddleware, combineReducers, createStore } from 'redux'
import thunk from 'redux-thunk'
import { tasksReducer } from '../../state/reducers/tasks-reducer'
import { todolistsReducer } from '../../state/reducers/todolist-reducer'

type StorybookStoreType = ReturnType<typeof storybookRootReducer>

const initialStore = {
	todolists: [
		{ id: 'todolistId1', title: 'What to learn', filter: 'all', addedDate: '', order: 0 },
		{ id: 'todolistId2', title: 'What to buy', filter: 'all', addedDate: '', order: 1 },
	],
	tasks: {
		['todolistId1']: [
			{
				id: '1',
				title: 'HTML&CSS',
				completed: true,
				addedDate: '',
				deadline: '',
				description: '',
				order: 0,
				priority: 1,
				startDate: '',
				status: 1,
				todoListId: 'todolistId1',
			},
			{
				id: '2',
				title: 'JS',
				completed: false,
				addedDate: '',
				deadline: '',
				description: '',
				order: 1,
				priority: 5,
				startDate: '',
				status: 2,
				todoListId: 'todolistId1',
			},
			{
				id: '3',
				title: 'React',
				completed: true,
				addedDate: '',
				deadline: '',
				description: '',
				order: 2,
				priority: 5,
				startDate: '',
				status: 3,
				todoListId: 'todolistId1',
			},
			{
				id: '4',
				title: 'Postman',
				completed: false,
				addedDate: '',
				deadline: '',
				description: '',
				order: 3,
				priority: 5,
				startDate: '',
				status: 1,
				todoListId: 'todolistId1',
			},
		],
		['todolistId2']: [
			{
				id: '1',
				title: 'Water',
				completed: true,
				addedDate: '',
				deadline: '',
				description: '',
				order: 0,
				priority: 3,
				startDate: '',
				status: 1,
				todoListId: 'todolistId2',
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
				status: 2,
				todoListId: 'todolistId2',
			},
			{
				id: '3',
				title: 'Apples',
				completed: false,
				addedDate: '',
				deadline: '',
				description: '',
				order: 2,
				priority: 3,
				startDate: '',
				status: 1,
				todoListId: 'todolistId2',
			},
		],
	},
}

const storybookRootReducer = combineReducers({
	tasks: tasksReducer,
	todolists: todolistsReducer,
})

export const storybookStore = createStore(storybookRootReducer, initialStore as StorybookStoreType, applyMiddleware(thunk))

export const ReduxStoreProviderDecorator = (storyFn: any) => {
	return <Provider store={storybookStore}>{storyFn()}</Provider>
}

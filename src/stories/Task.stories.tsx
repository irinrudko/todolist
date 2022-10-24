import React from 'react'
import { ComponentStory, ComponentMeta } from '@storybook/react'
import { Task } from '../features/Todolist/Task/Task'
import { action } from '@storybook/addon-actions'

export default {
	title: 'Todolist/Task',
	component: Task,
} as ComponentMeta<typeof Task>

const removeTaskCallback = action('task should be removed')
const changeTaskStatusCallback = action('task status should be changed')
const changeSpanValueCallback = action('task title should be changed to this value:')

const callbackProps = {
	removeTask: removeTaskCallback,
	changeTaskStatus: changeTaskStatusCallback,
	changeSpanValue: changeSpanValueCallback,
}

const Template: ComponentStory<typeof Task> = (args) => <Task {...args} />

export const TaskIsCompleted = Template.bind({})
TaskIsCompleted.args = {
	...callbackProps,
	task: {
		id: '5',
		title: 'isCompleted',
		completed: true,
		addedDate: '',
		deadline: '',
		description: '',
		order: 0,
		priority: 2,
		startDate: '',
		status: 1,
		todoListId: 'todolistId1',
	},
	todolistId: 'todolist1',
}
export const TaskIsNotCompleted = Template.bind({})
TaskIsNotCompleted.args = {
	...callbackProps,
	task: {
		id: '6',
		title: 'isNotCompleted',
		completed: false,
		addedDate: '',
		deadline: '',
		description: '',
		order: 0,
		priority: 2,
		startDate: '',
		status: 3,
		todoListId: 'todolistId1',
	},
	todolistId: 'todolist1',
}

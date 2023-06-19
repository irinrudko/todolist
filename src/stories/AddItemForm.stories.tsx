import React from 'react'
import { ComponentStory, ComponentMeta } from '@storybook/react'
import { AddItemForm } from '../common/components/AddItemForm/AddItemForm'

export default {
	title: 'Todolist/AddItemForm',
	component: AddItemForm,
	argTypes: {
		addItem: { action: 'title' },
	},
} as ComponentMeta<typeof AddItemForm>

const Template: ComponentStory<typeof AddItemForm> = (args) => <AddItemForm {...args} />

export const AddItemFormBasic = Template.bind({})
AddItemFormBasic.args = {
	label: 'write sth here',
}

import React from 'react'
import { ComponentStory, ComponentMeta } from '@storybook/react'
import { action } from '@storybook/addon-actions'
import { EditableSpan } from '../components/EditableSpan/EditableSpan'

export default {
	title: 'Todolist/EditableSpan',
	component: EditableSpan,
	argTypes: {
		title: { control: 'text' },
	},
} as ComponentMeta<typeof EditableSpan>

const onChangeCallback = action('was changed to the value')

const Template: ComponentStory<typeof EditableSpan> = (args) => <EditableSpan {...args} />

export const EditableSpanBasic = Template.bind({})
EditableSpanBasic.args = {
	onChange: onChangeCallback,
	title: 'Double click to change me',
}

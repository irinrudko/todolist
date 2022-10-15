import React from 'react'
import { ComponentStory, ComponentMeta } from '@storybook/react'
import { EditableSpan } from '../EditableSpan'
import { action } from '@storybook/addon-actions'

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

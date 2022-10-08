import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import { Task } from '../Task';
import {action} from '@storybook/addon-actions';


export default {
  title: 'Todolist/Task',
  component: Task,
} as ComponentMeta<typeof Task>;

const removeTaskCallback = action('task should be removed')
const changeTaskStatusCallback = action('task status should be changed')
const changeSpanValueCallback = action('task title should be changed to this value:')


const callbackProps = {
    removeTask: removeTaskCallback,
    changeTaskStatus: changeTaskStatusCallback,
    changeSpanValue: changeSpanValueCallback
}

const Template: ComponentStory<typeof Task> = (args) => <Task {...args} />;
    
export const TaskIsDone = Template.bind({});
TaskIsDone.args = {
    ...callbackProps,
    task: {id: '5', isDone: true, title: 'isDone'},
    todolistId: 'todolist1',
}
export const TaskIsNotDone = Template.bind({});
TaskIsNotDone.args = {
    ...callbackProps,
    task: {id: '6', isDone: false, title: 'isNotDone'},
    todolistId: 'todolist1'
}



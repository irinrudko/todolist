import { v1 } from "uuid";
import { TasksStateType } from "../../AppWithRedux";
import { addTaskAC, changeTaskStatusAC, changeTaskTitleAC, removeTaskAC, tasksReducer } from "./tasks-reducer";
import { todolistId1, todolistId2 } from "./todolist-reducer";

it('should remove the correct task', () => {
    let taskId = v1();
    const startState: TasksStateType = {
        [todolistId1]: [
            { id: taskId, title: "HTML&CSS", isDone: true },
            { id: '2', title: "JS", isDone: true },
            { id: '3', title: "Jest", isDone: true },
        ],
        [todolistId2]: [
            { id: '1', title: "Water", isDone: true },
            { id: '2', title: "React Book", isDone: true },
            { id: '3', title: "Clean code book", isDone: true },
        ]
    }


    const endState = tasksReducer(startState, removeTaskAC(taskId, todolistId1))


    expect(endState[todolistId1].every(t => t.id !== taskId)).toBeTruthy()
    expect(endState[todolistId1].length).toBe(2)
    expect(endState[todolistId2].length).toBe(3)
})

it('should add a task to the correct todolist', () => {
    let title = "hey, I'm a new task :) ";
    const startState: TasksStateType = {
        [todolistId1]: [
            { id: '1', title: "HTML&CSS", isDone: true },
            { id: '2', title: "JS", isDone: true },
            { id: '3', title: "Jest", isDone: true },
        ],
        [todolistId2]: [
            { id: '1', title: "Water", isDone: true },
            { id: '2', title: "React Book", isDone: true },
            { id: '3', title: "Clean code book", isDone: true },
        ]
    }


    const endState = tasksReducer(startState, addTaskAC(title, todolistId1))


    expect(endState[todolistId1].length).toBe(4)
    expect(endState[todolistId1][0].title).toBe(title)
    expect(endState[todolistId1][0].id).toBeDefined()
    expect(endState[todolistId1][0].isDone).toBeFalsy()
    expect(endState[todolistId2].length).toBe(3)
})

it('should change the task status (done or not done)', () => {
    let taskId = v1();
    const startState: TasksStateType = {
        [todolistId1]: [
            { id: '1', title: "HTML&CSS", isDone: true },
            { id: '2', title: "JS", isDone: true },
            { id: taskId, title: "Jest", isDone: true },
        ],
        [todolistId2]: [
            { id: '1', title: "Water", isDone: true },
            { id: '2', title: "React Book", isDone: true },
            { id: '3', title: "Clean code book", isDone: true },
        ]
    }


    const endState = tasksReducer(startState, changeTaskStatusAC(taskId, false, todolistId1))


    expect(endState[todolistId1][2].isDone).toBeFalsy();
    expect(endState[todolistId1][2].id).toBe(taskId);
})

it('should change the correct task title', () => {
    let taskId = v1();
    let newTitle = 'changed title'

    const startState: TasksStateType = {
        [todolistId1]: [
            { id: taskId, title: "HTML&CSS", isDone: true },
            { id: '2', title: "JS", isDone: true },
            { id: '3', title: "Jest", isDone: true },
        ],
        [todolistId2]: [
            { id: '1', title: "Water", isDone: true },
            { id: '2', title: "React Book", isDone: true },
            { id: '3', title: "Clean code book", isDone: true },
        ]
    }


    const endState = tasksReducer(startState, changeTaskTitleAC(taskId, newTitle, todolistId1))


    expect(endState[todolistId1][0].title).toBe(newTitle)
    expect(endState[todolistId1][0].id).toBe(taskId)
})

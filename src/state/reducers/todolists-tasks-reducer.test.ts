import { TasksStateType, TodolistType } from "../../AppWithRedux";
import { tasksReducer } from "./tasks-reducer";
import { removeTodolistAC, todolistsReducer } from "./todolist-reducer";
import { addTodolistAC } from "./todolists-tasks-reducer";

it('should check todolists ids are equal', () => {
    const startTasksState: TasksStateType = {};
    const startTodolistsState: Array<TodolistType> = [];
 
    const action = addTodolistAC("new todolist");
 
    const endTasksState = tasksReducer(startTasksState, action)
    const endTodolistsState = todolistsReducer(startTodolistsState, action)
 
    const keys = Object.keys(endTasksState);
    const idFromTasks = keys[0];
    const idFromTodolists = endTodolistsState[0].id;
 
    expect(idFromTasks).toBe(action.todolistId);
    expect(idFromTodolists).toBe(action.todolistId);
 });

it('should delete correct todolist with its tasks ', () => {
    const startState: TasksStateType = {
        "todolistId1": [
            { id: "1", title: "CSS", isDone: false },
            { id: "2", title: "JS", isDone: true },
            { id: "3", title: "React", isDone: false }
        ],
        "todolistId2": [
            { id: "1", title: "bread", isDone: false },
            { id: "2", title: "milk", isDone: true },
            { id: "3", title: "tea", isDone: false }
        ]
    };
  
    const endState = tasksReducer(startState, removeTodolistAC("todolistId2"))
 
    const keys = Object.keys(endState);
 
    expect(keys.length).toBe(1);
    expect(endState["todolistId2"]).toBeUndefined();
 });
 
 
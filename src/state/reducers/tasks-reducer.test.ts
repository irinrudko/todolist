import { v1 } from "uuid";
import { TasksStateType } from "../../AppWithRedux";
import { addTaskAC, removeTaskAC, tasksReducer } from "./tasks-reducer";
import { todolistId1,todolistId2} from "./todolist-reducer";

//TODO: 
//add tests for new reducers
//fix startState with beforeEach (lesson #14)

it('should remove the correct task', () => {
    let taskId = v1();
    const startState: TasksStateType = {
        [todolistId1]: [
            { id: taskId, title: "JS", completed: true, addedDate: '', deadline: '', description: '', order: 0, priority: '', startDate: '', status: '', todoListId: todolistId1  },
            { id: '1', title: "JS", completed: true, addedDate: '', deadline: '', description: '', order: 0, priority: '', startDate: '', status: '', todoListId: todolistId1  },
            { id: '2', title: "HTML&CSS", completed: true, addedDate: '', deadline: '', description: '', order: 0, priority: '', startDate: '', status: '', todoListId: todolistId1  },
          ],
        [todolistId2]: [
            { id: '1', title: "Water", completed: true, addedDate: '', deadline: '', description: '', order: 0, priority: '', startDate: '', status: '', todoListId: todolistId2  },
            { id: '2', title: "Clean code book", completed: true, addedDate: '', deadline: '', description: '', order: 1, priority: '', startDate: '', status: '', todoListId: todolistId2  },
            { id: '3', title: "Apples", completed: false, addedDate: '', deadline: '', description: '', order: 2, priority: '', startDate: '', status: '', todoListId: todolistId2  }
        ]
    }


    const endState = tasksReducer(startState, removeTaskAC(taskId, todolistId1))


    expect(endState[todolistId1].every(t => t.id !== taskId)).toBeTruthy()
    expect(endState[todolistId1].length).toBe(2)
    expect(endState[todolistId2].length).toBe(3)
})

it('should add a task to the correct todolist', () => {
    let title = "hey, I'm a new task :) ";
    let task =  { id: '0', title: title, completed: false, addedDate: '', deadline: '', description: '', order: 0, priority: '', startDate: '', status: '', todoListId: todolistId1 }

    const startState: TasksStateType = {
        [todolistId1]: [
            { id: '1', title: "JS", completed: true, addedDate: '', deadline: '', description: '', order: 0, priority: '', startDate: '', status: '', todoListId: todolistId1  },
            { id: '2', title: "JS", completed: true, addedDate: '', deadline: '', description: '', order: 0, priority: '', startDate: '', status: '', todoListId: todolistId1  },
            { id: '3', title: "HTML&CSS", completed: true, addedDate: '', deadline: '', description: '', order: 0, priority: '', startDate: '', status: '', todoListId: todolistId1  },
        ],
        [todolistId2]: [
            { id: '1', title: "Water", completed: true, addedDate: '', deadline: '', description: '', order: 0, priority: '', startDate: '', status: '', todoListId: todolistId2  },
            { id: '2', title: "Clean code book", completed: true, addedDate: '', deadline: '', description: '', order: 1, priority: '', startDate: '', status: '', todoListId: todolistId2  },
            { id: '3', title: "Apples", completed: false, addedDate: '', deadline: '', description: '', order: 2, priority: '', startDate: '', status: '', todoListId: todolistId2  }
        ]
    }


    const endState = tasksReducer(startState, addTaskAC(task))


    expect(endState[todolistId1].length).toBe(4)
    expect(endState[todolistId1][0].title).toBe(title)
    expect(endState[todolistId1][0].id).toBeDefined()
    expect(endState[todolistId1][0].completed).toBeFalsy()
    expect(endState[todolistId2].length).toBe(3)
})

// it('should change the task status (done or not done)', () => {
//     let taskId = v1();
//     const startState: TasksStateType = {
//         [todolistId1]: [
//             { id: '1', title: "HTML&CSS", completed: true },
//             { id: '2', title: "JS", completed: true },
//             { id: taskId, title: "Jest", completed: true },
//         ],
//         {todolistId2}: [
//              { id: '1', title: "Water", completed: true, addedDate: '', deadline: '', description: '', order: 0, priority: '', startDate: '', status: '', todoListId: todolistId2  },
//             { id: '2', title: "Clean code book", completed: true, addedDate: '', deadline: '', description: '', order: 1, priority: '', startDate: '', status: '', todoListId: todolistId2  },
//             { id: '3', title: "Apples", completed: false, addedDate: '', deadline: '', description: '', order: 2, priority: '', startDate: '', status: '', todoListId: todolistId2  }
//         ]
//     }


//     const endState = tasksReducer(startState, changeTaskStatusAC(taskId, false, todolistId1))


//     expect(endState[todolistId1][2].completed).toBeFalsy();
//     expect(endState[todolistId1][2].id).toBe(taskId);
// })

// it('should change the correct task title', () => {
//     let taskId = v1();
//     let newTitle = 'changed title'

//     const startState: TasksStateType = {
//         [todolistId1]: [
//             { id: taskId, title: "HTML&CSS", completed: true },
//             { id: '2', title: "JS", completed: true },
//             { id: '3', title: "Jest", completed: true },
//         ],
//         todolistId2: [
//             { id: '1', title: "Water", completed: true },
//             { id: '2', title: "React Book", completed: true },
//             { id: '3', title: "Clean code book", completed: true },
//         ]
//     }


//     const endState = tasksReducer(startState, changeTaskTitleAC(taskId, newTitle, todolistId1))


//     expect(endState[todolistId1][0].title).toBe(newTitle)
//     expect(endState[todolistId1][0].id).toBe(taskId)
// })

import { Container, Grid, Paper } from '@mui/material';
import React, { useReducer } from 'react';
import { v1 } from 'uuid';
import { AddNewTodolist } from '../../AddNewTodolist';
import { Header } from '../../Header';
import { TaskType, Todolist } from '../../Todolist';
import { addTaskAC, changeTaskStatusAC, changeTaskTitleAC, removeTaskAC, tasksReducer } from './tasks-reducer';
import { changeTodolistFilterAC, changeTodolistTitleAC, removeTodolistAC, todolistsReducer } from './todolist-reducer';
import { addTodolistAC } from './todolists-tasks-reducer';


export type FilterValuesType = "all" | "active" | "completed";
export type TodolistType = {
    id: string
    title: string
    filter: FilterValuesType
}

export type TasksStateType = {
    [key: string]: Array<TaskType>
}
const todolist1_id = v1()
const todolist2_id = v1()

export function AppWithReducers() {

    let [todolists, dispatchTodolists] = useReducer(todolistsReducer, [
        {
            id: todolist1_id,
            title: 'What to learn',
            filter: 'active'
        },
        {
            id: todolist2_id,
            title: 'What to buy',
            filter: 'all'
        },
    ])

    let [tasksObj, dispatchTasksObj] = useReducer(tasksReducer, {
        [todolist1_id]: [
            { id: v1(), title: "HTML&CSS", isDone: true },
            { id: v1(), title: "JS", isDone: true },
            { id: v1(), title: "ReactJS", isDone: false },
            { id: v1(), title: "Rest API", isDone: false },
            { id: v1(), title: "GraphQL", isDone: false },
        ],
        [todolist2_id]: [
            { id: v1(), title: "water", isDone: false },
            { id: v1(), title: "watermelon", isDone: false },
        ]
    }
    )

    function removeTask(id: string, todolist_id: string) {
        dispatchTasksObj(removeTaskAC(id, todolist_id))
    }

    function addTask(title: string, todolist_id: string) {
        dispatchTasksObj(addTaskAC(title, todolist_id))
    }

    function changeStatus(taskId: string, isDone: boolean, todolist_id: string) {
        dispatchTasksObj(changeTaskStatusAC(taskId, isDone, todolist_id))
    }

    const addTodolist = (title: string) => {
        const action = addTodolistAC(title)
        dispatchTodolists(action)
        dispatchTasksObj(action)
    }

    const changeFilter = (filter: FilterValuesType, todolist_id: string) => {
        dispatchTodolists(changeTodolistFilterAC(filter, todolist_id))
    }

    const removeTodoList = (todolist_id: string) => {
        dispatchTodolists(removeTodolistAC(todolist_id))
    }

    const changeSpanValue = (newTitle: string, taskId: string, todolist_id: string) => {
        dispatchTasksObj(changeTaskTitleAC(taskId, newTitle, todolist_id))
    }

    const changeTodolistTitle = (newTitle: string, todolist_id: string) => {
        dispatchTodolists(changeTodolistTitleAC(todolist_id, newTitle))
    }

    return (
        <>

            <Header />
            <Container fixed>
                <Grid container sx={{ padding: '20px' }}>
                    <Grid container rowSpacing={5} columnSpacing={4} sx={{ padding: '20px' }}>

                        {
                            todolists.map(tl => {
                                let allTasks = tasksObj[tl.id];
                                let tasksForTodolist = allTasks;

                                if (tl.filter === "active") {
                                    tasksForTodolist = tasksForTodolist.filter(t => t.isDone === false);
                                }
                                if (tl.filter === "completed") {
                                    tasksForTodolist = tasksForTodolist.filter(t => t.isDone === true);
                                }

                                return (
                                    <>
                                        <Grid item>
                                            <Paper elevation={3} sx={{ padding: '10px' }}>
                                                <Todolist
                                                    key={tl.id}
                                                    title={tl.title}
                                                    tasks={tasksForTodolist}
                                                    removeTask={removeTask}
                                                    changeFilter={changeFilter}
                                                    addTask={addTask}
                                                    changeTaskStatus={changeStatus}
                                                    filter={tl.filter}
                                                    todolist_id={tl.id}
                                                    removeTodoList={removeTodoList}
                                                    changeSpanValue={changeSpanValue}
                                                    changeTodolistTitle={changeTodolistTitle}
                                                />
                                            </Paper>
                                        </Grid>
                                    </>
                                )
                            })
                        }
                    </Grid>
                </Grid>
                <AddNewTodolist addTodolist={addTodolist} />
            </Container>

        </>
    );
}


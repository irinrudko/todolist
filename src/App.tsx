import React, { useState } from 'react';
import './App.css';
import { TaskType, Todolist } from './Todolist';
import { v1 } from 'uuid';
import { Header } from './Header';
import { Container, Grid, Paper } from '@mui/material';
import { AddNewTodolist } from './AddNewTodolist';


export type FilterValuesType = "all" | "active" | "completed";
export type TodolistType = {
    id: string
    title: string
    filter: FilterValuesType
}

type TasksStateType = {
    [key: string]: Array<TaskType>
}

export function App() {
    const todolist1_id = v1()
    const todolist2_id = v1()

    let [todolists, setTodolists] = useState<Array<TodolistType>>([
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

    let [tasksObj, setTasksObj] = useState<TasksStateType>(
        {
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
        let tasks = tasksObj[todolist_id];
        let filteredTasks = tasks.filter(t => t.id != id);
        tasksObj[todolist_id] = filteredTasks;
        setTasksObj({ ...tasksObj });
    }

    function addTask(title: string, todolist_id: string) {
        let task = { id: v1(), title: title, isDone: false }
        let tasks = tasksObj[todolist_id];
        tasksObj[todolist_id] = [task, ...tasks]
        setTasksObj({ ...tasksObj });
    }

    function changeStatus(taskId: string, isDone: boolean, todolist_id: string) {
        const tasks = tasksObj[todolist_id];
        const task = tasks.find(t => t.id === taskId);
        if (task) {
            task.isDone = isDone;
            setTasksObj({ ...tasksObj });
        }
    }


    const addTodolist = (title: string) => {
        const newTodolist_id = v1();
        const todolist: TodolistType = {
            id: newTodolist_id,
            title: title,
            filter: 'active'
        }

        setTasksObj({
            ...tasksObj,
            [newTodolist_id]: []
        })
        setTodolists([...todolists, todolist])
    }

    function changeFilter(value: FilterValuesType, todolist_id: string) {
        const todolist = todolists.find(tl => tl.id === todolist_id)
        if (todolist) {
            todolist.filter = value;
            setTodolists([...todolists])
        }
    }

    const removeTodoList = (todolist_id: string) => {
        const todolist = todolists.filter(tl => tl.id !== todolist_id)
        if (todolist) {
            setTodolists(todolist)
            delete tasksObj[todolist_id]
            setTasksObj({ ...tasksObj })
        }
    }

    const changeSpanValue = (newTitle: string, taskId: string, todolist_id: string) => {
        const tasks = tasksObj[todolist_id];
        const task = tasks.find(t => t.id === taskId);
        if (task) {
            task.title = newTitle;
            setTasksObj({ ...tasksObj });
        }
    }

    const changeTodolistTitle = (newTitle: string, todolist_id: string) => {
        const todolist = todolists.find(tl => tl.id === todolist_id)
        if (todolist) {
            todolist.title = newTitle
            setTodolists([...todolists])
        }
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


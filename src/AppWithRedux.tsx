import { Container, Grid, Paper } from '@mui/material';
import React from 'react';
import { AddNewTodolist } from './AddNewTodolist';
import { Header } from './Header';
import { TaskType, Todolist } from './Todolist';
import { addTaskAC, changeTaskStatusAC, changeTaskTitleAC, removeTaskAC } from './state/reducers/tasks-reducer';
import { changeTodolistFilterAC, changeTodolistTitleAC, removeTodolistAC } from './state/reducers/todolist-reducer';
import { addTodolistAC } from './state/reducers/todolists-tasks-reducer';
import { useDispatch, useSelector } from 'react-redux';
import { AppStateType } from './state/store';


export type FilterValuesType = "all" | "active" | "completed";
export type TodolistType = {
    id: string
    title: string
    filter: FilterValuesType
}

export type TasksStateType = {
    [key: string]: Array<TaskType>
}
export function AppWithRedux() {

    const dispatch = useDispatch();
    const todolists = useSelector<AppStateType, Array<TodolistType>>(state => state.todolists)
    const tasks = useSelector<AppStateType, TasksStateType>(state => state.tasks)


    const addTask = (title: string, todolist_id: string) => {
        dispatch(addTaskAC(title, todolist_id))
    }
    const removeTask = (id: string, todolist_id: string) => {
        dispatch(removeTaskAC(id, todolist_id))
    }
    const changeStatus = (taskId: string, isDone: boolean, todolist_id: string) => {
        dispatch(changeTaskStatusAC(taskId, isDone, todolist_id))
    }
    const changeSpanValue = (newTitle: string, taskId: string, todolist_id: string) => {
        dispatch(changeTaskTitleAC(taskId, newTitle, todolist_id))
    }



    const addTodolist = (title: string) => {
        dispatch(addTodolistAC(title))
    }
    const changeFilter = (filter: FilterValuesType, todolist_id: string) => {
        dispatch(changeTodolistFilterAC(filter, todolist_id))
    }
    const removeTodoList = (todolist_id: string) => {
        dispatch(removeTodolistAC(todolist_id))
    }
    const changeTodolistTitle = (newTitle: string, todolist_id: string) => {
        dispatch(changeTodolistTitleAC(todolist_id, newTitle))
    }


    return (
        <>

            <Header />
            <Container fixed>
                <Grid container sx={{ padding: '20px' }}>
                    <Grid container rowSpacing={5} columnSpacing={4} sx={{ padding: '20px' }}>

                        {
                            todolists.map(tl => {
                                let allTasks = tasks[tl.id];
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


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
import { useCallback } from 'react';


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


    const addTask = useCallback((title: string, todolist_id: string) => {
        dispatch(addTaskAC(title, todolist_id))
    }, [dispatch])
    const removeTask = useCallback((id: string, todolist_id: string) => {
        dispatch(removeTaskAC(id, todolist_id))
    }, [dispatch])
    const changeStatus = useCallback((taskId: string, isDone: boolean, todolist_id: string) => {
        dispatch(changeTaskStatusAC(taskId, isDone, todolist_id))
    }, [dispatch])
    const changeSpanValue = useCallback((newTitle: string, taskId: string, todolist_id: string) => {
        dispatch(changeTaskTitleAC(taskId, newTitle, todolist_id))
    }, [dispatch])




    const addTodolist = useCallback((title: string) => {

        dispatch(addTodolistAC(title))
    }, [dispatch])
    const changeFilter = useCallback((filter: FilterValuesType, todolist_id: string) => {
        dispatch(changeTodolistFilterAC(filter, todolist_id))
    }, [dispatch])
    const removeTodoList = useCallback((todolist_id: string) => {
        dispatch(removeTodolistAC(todolist_id))
    }, [dispatch])
    const changeTodolistTitle = useCallback((newTitle: string, todolist_id: string) => {
        dispatch(changeTodolistTitleAC(todolist_id, newTitle))
    }, [dispatch])




    return (
        <>

            <Header />
            <Container fixed>
                <Grid container sx={{ padding: '20px' }}>
                    <Grid container rowSpacing={5} columnSpacing={4} sx={{ padding: '20px' }}>

                        {
                            todolists.map(tl => {
                                let allTasks = tasks[tl.id];
                                let tasksForTodolist = allTasks

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


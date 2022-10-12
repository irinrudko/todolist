import { Container, Grid, Paper } from '@mui/material';
import React, { useEffect } from 'react';
import { AddNewTodolist } from './AddNewTodolist';
import { Header } from './Header';
import { TaskType, Todolist } from './Todolist';
import { addTodolistAC } from './state/reducers/todolists-tasks-reducer';
import { useDispatch, useSelector } from 'react-redux';
import { AppStateType } from './state/store';
import { useCallback } from 'react';
import {fetchTodoliststTC } from './state/reducers/todolist-reducer';


export type FilterValuesType = "all" | "active" | "completed";
export type TodolistType = {
    id: string
    title: string
    filter: FilterValuesType
}

export type TasksStateType = {
    [key: string]: Array<TaskType>
}

export const AppWithRedux = () => {

    useEffect(() => {
        dispatch(fetchTodoliststTC())
    }, [])

    const todolists = useSelector<AppStateType, Array<TodolistType>>(state => state.todolists)
    const dispatch = useDispatch();

    const addTodolist = useCallback((title: string) => {
        dispatch(addTodolistAC(title))
    }, [dispatch])


    return (
        <>
            <Header />
            <Container fixed>
                <Grid container sx={{ padding: '20px' }}>
                    <Grid container rowSpacing={5} columnSpacing={4} sx={{ padding: '20px' }}>

                        {
                            todolists.map(tl => {
                                return (
                                    <>
                                        <Grid item>
                                            <Paper elevation={3} sx={{ padding: '10px' }}>
                                                <Todolist
                                                    key={tl.id}
                                                    title={tl.title}
                                                    filter={tl.filter}
                                                    id={tl.id}                                       
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

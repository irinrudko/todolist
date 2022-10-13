import { Container, Grid, Paper } from '@mui/material';
import React, { useEffect } from 'react';
import { AddNewTodolist } from './AddNewTodolist';
import { Header } from './Header';
import { Todolist } from './Todolist';
import { useDispatch, useSelector } from 'react-redux';
import { AppStateType } from './state/store';
import {fetchTodoliststTC, TodolistType } from './state/reducers/todolist-reducer';
import { TaskType } from './state/reducers/tasks-reducer';

//TODO
//refactor project folders according to React guidline (lesson 15 folder)


export type FilterValuesType = "all" | "active" | "completed";
export type TasksStateType = {
    [key: string]: Array<TaskType>
}

export const AppWithRedux = () => {

    useEffect(() => {
        dispatch(fetchTodoliststTC())
    }, [])

    const todolists = useSelector<AppStateType, Array<TodolistType>>(state => state.todolists)
    const dispatch = useDispatch();

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
                <AddNewTodolist />
            </Container>
        </>
    );
}

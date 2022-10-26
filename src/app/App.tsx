import { Container, Grid, Paper } from '@mui/material'
import React, { useEffect } from 'react'
import { Header } from '../components/Header/Header'
import { Todolist } from '../features/Todolist/Todolist'
import { useDispatch, useSelector } from 'react-redux'
import { AppStateType } from '../state/store'
import { fetchTodoliststTC, TodolistType } from '../state/reducers/todolist-reducer'
import { TaskType } from '../state/reducers/tasks-reducer'
import { AddNewTodolist } from '../features/AddNewTodolist/AddNewTodolist'
import { Route, Routes } from 'react-router-dom'
import { Login } from '../features/Login/Login'
import { TodolistsList } from '../features/Todolist/TodolistsList'

export type FilterValuesType = 'all' | 'active' | 'completed'
export type TasksStateType = {
	[key: string]: Array<TaskType>
}

export const App = () => {
	useEffect(() => {
		dispatch(fetchTodoliststTC())
	}, [])

	const todolists = useSelector<AppStateType, Array<TodolistType>>((state) => state.todolists)
	const dispatch = useDispatch()

	return (
		<>
			<Header />
			<Container fixed>
				<Grid container sx={{ padding: '20px', alignItems: 'center', flexWrap: 'nowrap' }}>
					<TodolistsList />
					<AddNewTodolist />

					{/* <Routes>
					<Route path="/" element={<Todolist id={''} title={''} filter={'all'} />} />

					<Route path="login" element={<Login />} />
				</Routes> */}
				</Grid>
			</Container>
		</>
	)
}

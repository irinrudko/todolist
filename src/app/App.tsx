import React from 'react'
import { Container, Grid } from '@mui/material'
import { Header } from '../components/Header/Header'
import { useDispatch, useSelector } from 'react-redux'
import { TaskType } from '../state/reducers/tasks-reducer'
import { AddNewTodolist } from '../features/AddNewTodolist/AddNewTodolist'
import { Route, Routes } from 'react-router-dom'
import { Login } from '../features/Login/Login'
import { TodolistsList } from '../features/Todolist/TodolistsList'
import { AppStateType } from '../state/store'

export type FilterValuesType = 'all' | 'active' | 'completed'
export type TasksStateType = {
	[key: string]: Array<TaskType>
}

export const App = () => {
	const dispatch = useDispatch()
	const isLoggedIn = useSelector<AppStateType, boolean>((state) => state.auth.isLoggedIn)

	if (!isLoggedIn) {
		return (
			<>
				<Header />
				<Login />
			</>
		)
	}

	return (
		<>
			<Header />
			<Container fixed>
				<Grid container sx={{ padding: '20px', alignItems: 'center', flexWrap: 'nowrap' }}>
					<Routes>
						<Route path="/" element={<TodolistsList />} />
						<Route path="login" element={<Login />} />
						<Route path="*" element={<h1>404: PAGE NOT FOUND</h1>} />
					</Routes>
					<AddNewTodolist />
				</Grid>
			</Container>
		</>
	)
}

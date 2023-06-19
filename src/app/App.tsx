import React, { useEffect } from 'react'
import { Container, Grid, LinearProgress } from '@mui/material'
import { Header } from '../common/components/Header/Header'
import { TaskType } from '../features/Todolists/Tasks/tasksSlice'
import { AddNewTodolist } from '../features/Todolists/AddNewTodolist/AddNewTodolist'
import { Route, Routes } from 'react-router-dom'
import { Login } from '../features/auth/Login'
import { TodolistsList } from '../features/Todolists/TodolistsList'
import { useAppDispatch, useAppSelector } from './store'
import { initializeAppTC } from './appSlice'
import { ErrorSnackbar } from '../common/components/ErrorSnackbar/ErrorSnackbar'
import { selectIsLoggedIn } from '../features/auth/auth-selectors'
import { selectAppStatus } from './app-selectors'

export type FilterValuesType = 'all' | 'active' | 'completed'
export type TasksStateType = {
	[key: string]: Array<TaskType>
}

export const App = () => {
	const dispatch = useAppDispatch()
	const isLoggedIn = useAppSelector(selectIsLoggedIn)
	const status = useAppSelector(selectAppStatus)

	useEffect(() => {
		dispatch(initializeAppTC())
	}, [dispatch])

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
			{status === 'loading' && <LinearProgress />}

			<Container fixed>
				<Grid container sx={{ padding: '20px', alignItems: 'center', flexWrap: 'nowrap' }}>
					<Routes>
						<Route path="/" element={<TodolistsList />} />
						<Route path="login" element={<Login />} />
						<Route path="*" element={<h1>404: PAGE NOT FOUND</h1>} />
					</Routes>
					<AddNewTodolist />
				</Grid>
				<ErrorSnackbar />
			</Container>
		</>
	)
}

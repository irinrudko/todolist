import React, { useEffect } from 'react'
import { Grid, Paper } from '@mui/material'
import { Todolist } from './Todolist'
import { fetchTodoliststTC as fetchTodoliststsTC, TodolistType } from '../../state/reducers/todolist-reducer'
import { useSelector } from 'react-redux'
import { AppStateType, useAppDispatch } from '../../state/store'

export const TodolistsList = () => {
	const todolists = useSelector<AppStateType, TodolistType[]>((state) => state.todolists)
	const dispatch = useAppDispatch()
	const isLoggedIn = useSelector<AppStateType, boolean>((state) => state.auth.isLoggedIn)

	useEffect(() => {
		isLoggedIn && dispatch(fetchTodoliststsTC())
	}, [])

	return (
		<>
			<Grid container rowSpacing={5} columnSpacing={4} sx={{ padding: '20px' }}>
				{todolists.map((tl) => {
					return (
						<>
							<Grid item key={tl.id}>
								<Paper elevation={3} sx={{ padding: '10px' }} key={tl.id}>
									<Todolist key={tl.id} title={tl.title} filter={tl.filter} id={tl.id} />
								</Paper>
							</Grid>
						</>
					)
				})}
			</Grid>
		</>
	)
}

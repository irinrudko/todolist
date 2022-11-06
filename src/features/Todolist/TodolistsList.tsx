import React, { useEffect } from 'react'
import { Grid, Paper } from '@mui/material'
import { Todolist } from './Todolist'
import { fetchTodoliststTC as fetchTodoliststsTC } from '../../state/reducers/todolist-reducer'
import { useAppDispatch, useAppSelector } from '../../state/store'

export const TodolistsList = () => {
	const dispatch = useAppDispatch()
	const todolists = useAppSelector((state) => state.todolists)
	const isLoggedIn = useAppSelector((state) => state.auth.isLoggedIn)

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

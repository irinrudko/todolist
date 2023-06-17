import React, { useEffect } from 'react'
import { Grid, Paper } from '@mui/material'
import { Todolist } from './Todolist'
import { fetchTodoliststTC as fetchTodoliststsTC } from '../../state/reducers/todolists-reducer'
import { useAppDispatch, useAppSelector } from '../../state/store'
import { selectIsLoggedIn } from '../Login/auth-selectors'
import { selectTodolists } from './todolists-selectors'

export const TodolistsList = () => {
	const dispatch = useAppDispatch()
	const todolists = useAppSelector(selectTodolists)
	const isLoggedIn = useAppSelector(selectIsLoggedIn)

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

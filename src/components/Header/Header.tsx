import * as React from 'react'
import { useCallback } from 'react'
import AppBar from '@mui/material/AppBar'
import Box from '@mui/material/Box'
import Toolbar from '@mui/material/Toolbar'
import Button from '@mui/material/Button'
import IconButton from '@mui/material/IconButton'
import MenuIcon from '@mui/icons-material/Menu'
import { makeStyles } from '@mui/styles'
import { useSelector } from 'react-redux'
import { AppStateType, useAppDispatch } from '../../state/store'
import { logoutTC } from '../../state/reducers/auth-reducer'

const useStyles = makeStyles({
	toolbar: {
		justifyContent: 'space-between',
	},
})

export const Header = () => {
	const classes = useStyles()
	const dispatch = useAppDispatch()
	const isLoggedIn = useSelector<AppStateType, boolean>((state) => state.auth.isLoggedIn)

	const logoutHandler = useCallback(() => {
		dispatch(logoutTC())
	}, [])

	return (
		<Box sx={{ flexGrow: 1 }}>
			<AppBar position="static">
				<Toolbar className={classes.toolbar}>
					<IconButton size="large" edge="start" color="inherit" aria-label="menu" sx={{ mr: 2 }}>
						<MenuIcon />
					</IconButton>
					{isLoggedIn && (
						<Button color="inherit" onClick={logoutHandler}>
							Log out
						</Button>
					)}
				</Toolbar>
			</AppBar>
		</Box>
	)
}

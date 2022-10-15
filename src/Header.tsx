import * as React from 'react'
import AppBar from '@mui/material/AppBar'
import Box from '@mui/material/Box'
import Toolbar from '@mui/material/Toolbar'
import Button from '@mui/material/Button'
import IconButton from '@mui/material/IconButton'
import MenuIcon from '@mui/icons-material/Menu'
import { makeStyles } from '@mui/styles'

const useStyles = makeStyles({
	toolbar: {
		justifyContent: 'space-between',
	},
})

export const Header = () => {
	const classes = useStyles()

	return (
		<Box sx={{ flexGrow: 1 }}>
			<AppBar position="static">
				<Toolbar className={classes.toolbar}>
					<IconButton size="large" edge="start" color="inherit" aria-label="menu" sx={{ mr: 2 }}>
						<MenuIcon />
					</IconButton>
					<Button color="inherit">Login</Button>
				</Toolbar>
			</AppBar>
		</Box>
	)
}

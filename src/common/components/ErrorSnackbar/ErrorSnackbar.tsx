import React from 'react'
import Snackbar from '@mui/material/Snackbar'
import MuiAlert, { AlertProps } from '@mui/material/Alert'
import { useAppDispatch, useAppSelector } from '../../../app/store'
import { appActions } from '../../../app/app-reducer'
import { selectAppError } from '../../../app/app-selectors'

const Alert = React.forwardRef<HTMLDivElement, AlertProps>(function Alert(props, ref) {
	return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />
})

export const ErrorSnackbar = () => {
	const dispatch = useAppDispatch()
	const error = useAppSelector(selectAppError)

	const handleClose = (event?: React.SyntheticEvent | Event, reason?: string) => {
		if (reason === 'clickaway') {
			return
		}
		dispatch(appActions.setAppErrorAC({ error: null }))
	}

	const isOpen = error !== null

	return (
		<Snackbar open={isOpen} autoHideDuration={6000} onClose={handleClose}>
			<Alert onClose={handleClose} severity="error" sx={{ width: '100%' }}>
				{error}
			</Alert>
		</Snackbar>
	)
}

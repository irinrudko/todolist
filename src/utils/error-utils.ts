import { Dispatch } from 'redux'
import { appActions } from '../state/reducers/app-reducer'

export const handleServerNetworkError = (error: { message: string }, dispatch: Dispatch) => {
	dispatch(
		appActions.setAppErrorAC({ error: error.message ? error.message : 'Sorry, some error occurred. Please try again later' })
	)
	dispatch(appActions.setAppStatusAC({ status: 'fail' }))
}

import { Dispatch } from 'redux'
import { ErrorUtilsDispatchType, setAppErrorAC, setAppStatusAC } from '../state/reducers/app-reducer'

export const handleServerNetworkError = (error: { message: string }, dispatch: Dispatch<ErrorUtilsDispatchType>) => {
	dispatch(setAppErrorAC({ error: error.message ? error.message : 'Sorry, some error occurred. Please try again later' }))
	dispatch(setAppStatusAC({ status: 'fail' }))
}

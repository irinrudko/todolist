import { AppThunk } from '../../app/store'
import { LoginParamsData, userAPI } from '../../common/API/user-api'
import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { appActions } from '../../app/appSlice'
import { clearTasksAndTodolists } from '../../common/actions/common-actions'

const slice = createSlice({
	name: 'auth',
	initialState: {
		isLoggedIn: false,
	},
	reducers: {
		setIsLoggedInAC(state, action: PayloadAction<{ isLoggedIn: boolean }>) {
			state.isLoggedIn = action.payload.isLoggedIn
		},
	},
})

export const authSlice = slice.reducer
export const authActions = slice.actions

//thunks
export const loginTC =
	(data: LoginParamsData): AppThunk =>
	(dispatch) => {
		dispatch(appActions.setAppStatusAC({ status: 'loading' }))

		userAPI.login(data).then((res) => {
			if (res.resultCode === 0) {
				dispatch(authActions.setIsLoggedInAC({ isLoggedIn: true }))
				dispatch(appActions.setAppStatusAC({ status: 'success' }))
			}
		})
	}

export const logoutTC = (): AppThunk => (dispatch) => {
	dispatch(appActions.setAppStatusAC({ status: 'loading' }))

	userAPI.logout().then((res) => {
		if (res.resultCode === 0) {
			dispatch(authActions.setIsLoggedInAC({ isLoggedIn: false }))
			dispatch(clearTasksAndTodolists())
			dispatch(appActions.setAppStatusAC({ status: 'success' }))
		}
	})
}

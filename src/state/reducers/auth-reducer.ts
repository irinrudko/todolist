import { AppThunk } from './../store'
import { LoginParamsData, userAPI } from '../../API/user-api'
import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { todolistsActions } from './todolists-reducer'
import { appActions } from './app-reducer'
import { tasksActions } from './tasks-reducer'

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

export const authReducer = slice.reducer
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
			dispatch(todolistsActions.clearTodolists())
			dispatch(tasksActions.clearTasks())
			dispatch(appActions.setAppStatusAC({ status: 'success' }))
		}
	})
}

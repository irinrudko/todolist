import { AppThunk } from './../store'
import { LoginParamsData, userAPI } from '../../API/user-api'
import { setAppStatusAC } from './app-reducer'
import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { clearTodolists } from './todolists-reducer'

const initialState: AuthInitialStateType = {
	isLoggedIn: false,
}

const slice = createSlice({
	name: 'auth',
	initialState,
	reducers: {
		setIsLoggedInAC(state, action: PayloadAction<{ isLoggedIn: boolean }>) {
			state.isLoggedIn = action.payload.isLoggedIn
		},
	},
})

export const authReducer = slice.reducer

export const setIsLoggedInAC = slice.actions.setIsLoggedInAC

//thunks
export const loginTC =
	(data: LoginParamsData): AppThunk =>
	(dispatch) => {
		dispatch(setAppStatusAC({ status: 'loading' }))

		userAPI.login(data).then((res) => {
			if (res.resultCode === 0) {
				dispatch(setIsLoggedInAC({ isLoggedIn: true }))
				dispatch(setAppStatusAC({ status: 'success' }))
			}
		})
	}

export const logoutTC = (): AppThunk => (dispatch) => {
	dispatch(setAppStatusAC({ status: 'loading' }))

	userAPI.logout().then((res) => {
		if (res.resultCode === 0) {
			dispatch(setIsLoggedInAC({ isLoggedIn: false }))
			dispatch(setAppStatusAC({ status: 'success' }))
		}
	})
}

//types
type AuthInitialStateType = {
	isLoggedIn: boolean
}
export type AuthActionsType = ReturnType<typeof setIsLoggedInAC>

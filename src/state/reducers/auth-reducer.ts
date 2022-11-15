import { AppThunk } from './../store'
import { LoginParamsData, userAPI } from '../../API/user-api'
import { setAppStatusAC } from './app-reducer'
import { createSlice, PayloadAction } from '@reduxjs/toolkit'

const initialState: AuthInitialStateType = {
	isLoggedIn: false,
}

const slice = createSlice({
	name: 'auth',
	initialState: initialState,
	reducers: {
		setIsLoggedInAC(state, action: PayloadAction<{ isLoggedIn: boolean }>) {
			state.isLoggedIn = action.payload.isLoggedIn
		},
	},
})

export const authReducer = slice.reducer

export const setIsLoggedInAC = slice.actions.setIsLoggedInAC

// export const authReducer = (state: AuthInitialStateType = initialState, action: AuthActionsType): AuthInitialStateType => {
// 	switch (action.type) {
// 		case 'AUTH/SET-IS-LOGGED-IN':
// 			return { ...state, isLoggedIn: action.isLoggedIn }
// 		default:
// 			return state
// 	}
// }

//action creators
// export const setIsLoggedInAC = (isLoggedIn: boolean) => ({ type: 'AUTH/SET-IS-LOGGED-IN', isLoggedIn } as const)

//thunks
export const loginTC =
	(data: LoginParamsData): AppThunk =>
	(dispatch) => {
		dispatch(setAppStatusAC('loading'))

		userAPI.login(data).then((res) => {
			if (res.resultCode === 0) {
				dispatch(setIsLoggedInAC({ isLoggedIn: true }))
				dispatch(setAppStatusAC('success'))
			}
		})
	}

export const logoutTC = (): AppThunk => (dispatch) => {
	dispatch(setAppStatusAC('loading'))

	userAPI.logout().then((res) => {
		if (res.resultCode === 0) {
			dispatch(setIsLoggedInAC({ isLoggedIn: false }))
			dispatch(setAppStatusAC('success'))
		}
	})
}

//types
type AuthInitialStateType = {
	isLoggedIn: boolean
}
export type AuthActionsType = ReturnType<typeof setIsLoggedInAC>

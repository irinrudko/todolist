import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { Dispatch } from 'redux'
import { userAPI } from '../common/API/user-api'
import { authActions } from '../features/auth/authSlice'

const initialState: AppInitialStateType = {
	isInitialized: false,
	status: 'loading' as RequestStatusType,
	error: null,
}

const slice = createSlice({
	name: 'app',
	initialState,
	reducers: {
		setAppInitializedAC(state, action: PayloadAction<{ isInitialized: boolean }>) {
			state.isInitialized = action.payload.isInitialized
		},
		setAppStatusAC(state, action: PayloadAction<{ status: RequestStatusType }>) {
			state.status = action.payload.status
		},
		setAppErrorAC(state, action: PayloadAction<{ error: string | null }>) {
			state.error = action.payload.error
		},
	},
})

export const appSlice = slice.reducer
export const appActions = slice.actions

//thunks
export const initializeAppTC = () => (dispatch: Dispatch) => {
	userAPI
		.me()
		.then((res) => {
			if (res.data.resultCode === 0) {
				dispatch(authActions.setIsLoggedInAC({ isLoggedIn: true }))
			} else {
			}
		})
		.catch(() => {})
		.finally(() => {
			dispatch(appActions.setAppInitializedAC({ isInitialized: true }))
		})
}
//types
type AppInitialStateType = {
	isInitialized: boolean
	status: RequestStatusType
	error: string | null
}
type RequestStatusType = 'idle' | 'loading' | 'success' | 'fail'
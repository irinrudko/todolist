import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { Dispatch } from 'redux'
import { userAPI } from '../../API/user-api'
import { setIsLoggedInAC } from './auth-reducer'

const initialState: AppInitialStateType = {
	isInitialized: false,
	status: 'loading' as RequestStatusType,
	error: null,
}

const slice = createSlice({
	name: 'app',
	initialState: initialState,
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

export const appReducer = slice.reducer

export const { setAppInitializedAC, setAppStatusAC, setAppErrorAC } = slice.actions

//thunks
export const initializeAppTC = () => (dispatch: Dispatch) => {
	userAPI
		.me()
		.then((res) => {
			if (res.data.resultCode === 0) {
				dispatch(setIsLoggedInAC({ isLoggedIn: true }))
			} else {
			}
		})
		.catch(() => {})
		.finally(() => {
			dispatch(setAppInitializedAC({ isInitialized: true }))
		})
}
//types
type AppInitialStateType = {
	isInitialized: boolean
	status: RequestStatusType
	error: string | null
}
type RequestStatusType = 'idle' | 'loading' | 'success' | 'fail'

export type AppReducerActionsType =
	| ReturnType<typeof setAppInitializedAC>
	| ReturnType<typeof setAppStatusAC>
	| ReturnType<typeof setAppErrorAC>

export type ErrorUtilsDispatchType = ReturnType<typeof setAppStatusAC> | ReturnType<typeof setAppErrorAC>

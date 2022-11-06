import { Dispatch } from 'redux'
import { userAPI } from '../API/user-api'
import { setIsLoggedInAC } from '../state/reducers/auth-reducer'

const initialState = {
	isInitialized: false,
	status: 'loading' as RequestStatusType,
	error: null,
}

export const appReducer = (state: AppInitialStateType = initialState, action: AppReducerActionsType): AppInitialStateType => {
	switch (action.type) {
		case 'APP/SET-IS-INITIALIZED':
			return { ...state, isInitialized: action.value }
		case 'APP/SET-STATUS':
			return { ...state, status: action.status }
		case 'APP/SET-ERROR':
			return { ...state, error: action.error }
		default:
			return { ...state }
	}
}

//action creators
export const setAppInitializedAC = (value: boolean) => ({ type: 'APP/SET-IS-INITIALIZED', value } as const)
export const setAppStatusAC = (status: RequestStatusType) => ({ type: 'APP/SET-STATUS', status } as const)
export const setAppErrorAC = (error: string | null) => ({ type: 'APP/SET-ERROR', error } as const)

//thunks
export const initializeAppTC = () => (dispatch: Dispatch) => {
	userAPI
		.me()
		.then((res) => {
			if (res.data.resultCode === 0) {
				dispatch(setIsLoggedInAC(true))
			} else {
			}
		})
		.catch(() => {})
		.finally(() => {
			dispatch(setAppInitializedAC(true))
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

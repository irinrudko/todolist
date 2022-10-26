import { Dispatch } from 'redux'
import { userAPI } from '../API/user-api'
import { setIsLoggedInAC } from '../state/reducers/auth-reducer'

const initialState = {
	isInitialized: false,
}

export const appReducer = (state: AppInitialStateType = initialState, action: AppActionsType): AppInitialStateType => {
	switch (action.type) {
		case 'APP/SET-IS-INITIALIZED':
			return { ...state, isInitialized: action.value }
		default:
			return { ...state }
	}
}

//action creators
export const setAppInitializedAC = (value: boolean) => ({ type: 'APP/SET-IS-INITIALIZED', value } as const)

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
type AppInitialStateType = typeof initialState
type AppActionsType = ReturnType<typeof setAppInitializedAC>

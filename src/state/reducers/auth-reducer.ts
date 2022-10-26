import { AppThunk } from './../store'
import { LoginParamsData, userAPI } from '../../API/user-api'

const initialState: AuthInitialStateType = {
	isLoggedIn: false,
}

//TODO
//create useAppSelector

export const authReducer = (state: AuthInitialStateType = initialState, action: AuthActionsType): AuthInitialStateType => {
	switch (action.type) {
		case 'AUTH/SET-IS-LOGGED-IN':
			return { ...state, isLoggedIn: action.isLoggedIn }
		default:
			return state
	}
}

//action creators
export const setIsLoggedInAC = (isLoggedIn: boolean) => ({ type: 'AUTH/SET-IS-LOGGED-IN', isLoggedIn } as const)

//thunks
export const loginTC =
	(data: LoginParamsData): AppThunk =>
	(dispatch) => {
		userAPI.login(data).then((res) => {
			if (res.resultCode === 0) {
				dispatch(setIsLoggedInAC(true))
				alert('success')
			}
		})
	}

//types
type AuthInitialStateType = {
	isLoggedIn: boolean
}
export type AuthActionsType = ReturnType<typeof setIsLoggedInAC>

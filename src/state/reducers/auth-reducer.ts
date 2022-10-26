import { Dispatch } from 'redux'
import { LoginParamsData, userAPI } from '../../API/user-api'

const initialState: AuthInitialStateType = {
	isLoggedIn: false,
}

//TODO
//create useAppDispatch
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
export const loginTC = (data: LoginParamsData) => (dispatch: Dispatch) => {
	userAPI
		.login(data)
		.then((res) => {
			dispatch(setIsLoggedInAC(true))
			// dispatch(setUserDataAC(res))
		})
		.catch((err: any) => {})
}

//types
type AuthInitialStateType = {
	isLoggedIn: boolean
}
type AuthActionsType = ReturnType<typeof setIsLoggedInAC>

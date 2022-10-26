const initialState: AuthInitialStateType = {
	isLoggedIn: false,
}

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

//types
type AuthInitialStateType = {
	isLoggedIn: boolean
}
type AuthActionsType = ReturnType<typeof setIsLoggedInAC>

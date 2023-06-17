import { AppStateType } from '../../state/store'

export const selectIsLoggedIn = (state: AppStateType) => state.auth.isLoggedIn

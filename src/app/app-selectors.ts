import { AppStateType } from './store'

export const selectAppStatus = (state: AppStateType) => state.app.status
export const selectAppError = (state: AppStateType) => state.app.error
export const selectAppInitialized = (state: AppStateType) => state.app.isInitialized

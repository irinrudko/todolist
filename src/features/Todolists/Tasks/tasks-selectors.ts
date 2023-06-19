import { AppStateType } from '../../../app/store'

export const selectTasks = (state: AppStateType) => state.tasks

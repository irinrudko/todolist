import { AppStateType } from '../../state/store'

export const selectTasks = (state: AppStateType) => state.tasks

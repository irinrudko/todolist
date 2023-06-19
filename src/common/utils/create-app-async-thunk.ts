import { createAsyncThunk } from '@reduxjs/toolkit'
import { AppStateType, AppDispatch } from '../../app/store'

export const createAppAsyncThunk = createAsyncThunk.withTypes<{
	state: AppStateType
	dispatch: AppDispatch
	rejectValue: null
}>()

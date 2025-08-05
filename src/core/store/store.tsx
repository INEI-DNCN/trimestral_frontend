import { configureStore } from '@reduxjs/toolkit'
import trimestralReducer from '../../feature/private/trimestral/trimestral_slice'
import userReducer from '../../feature/private/user/user_slice'
import generalReducer from './sllices/general_slice'




const store = configureStore({
	reducer: {
		general: generalReducer,
		user: userReducer,
		trimestral: trimestralReducer
	}
})



export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store


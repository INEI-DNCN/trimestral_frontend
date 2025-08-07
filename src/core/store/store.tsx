import { configureStore } from '@reduxjs/toolkit'
import perfilReducer from '../../feature/perfil/perfil_slice'
import trimestralReducer from '../../feature/private/trimestral/trimestral_slice'
import generalReducer from './sllices/general_slice'




const store = configureStore({
	reducer: {
		general: generalReducer,
		perfil: perfilReducer,
		trimestral: trimestralReducer
	}
})



export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store


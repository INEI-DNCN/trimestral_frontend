import { configureStore } from '@reduxjs/toolkit'
import perfilReducer from '../../feature/perfil/perfil_slice'
import commentReducer from '../../feature/private/comment/comment_slice'
import homeReducer from '../../feature/private/home/home_slice'
import routerReducer from '../router/router_slice'
import generalReducer from './sllices/general_slice'




const store = configureStore({
	reducer: {
		router: routerReducer,
		general: generalReducer,
		perfil: perfilReducer,
		home: homeReducer,
		comment: commentReducer
	}
})



export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store


import { createSlice } from '@reduxjs/toolkit';


export interface comentarioDTO {
	id?: number
	anio?: number
	contenido: string
	fecha_actualizacion?: string
	fecha_creacion?: string
	id_titulo?: number
	trimestre?: string
}

interface trimestralState {
	titleTrimestral: [],
	comentariosTrimestral: comentarioDTO[],
	indicadores: [],
}

const initialState: trimestralState = {
	titleTrimestral: [],
	comentariosTrimestral: [],
	indicadores: [],
};


export const TrimestralSlice = createSlice({
	name: 'comment',
	initialState,
	reducers: {
		getTitleTrimestralSlice: (state, action) => {
			state.titleTrimestral = action.payload
		},
		getComentariosTrimestralYearSlice: (state, action) => {
			state.comentariosTrimestral = action.payload
		},
		getIndicadoresSlice: (state, action) => {
			state.indicadores = action.payload
		},
	}
})


export const {
	getTitleTrimestralSlice,
	getComentariosTrimestralYearSlice,
	getIndicadoresSlice,
} = TrimestralSlice.actions

export default TrimestralSlice.reducer


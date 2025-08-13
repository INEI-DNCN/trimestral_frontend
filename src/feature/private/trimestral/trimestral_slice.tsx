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
	metadataArchivos: [],
	titleTrimestral: [],
	comentariosTrimestral: comentarioDTO[],
	indicadores: [],
}

const initialState: trimestralState = {
	metadataArchivos: [],
	titleTrimestral: [],
	comentariosTrimestral: [],
	indicadores: [],
};


export const TrimestralSlice = createSlice({
	name: 'trimestral',
	initialState,
	reducers: {
		getMetadataArchivosSlice: (state, action) => {
			state.metadataArchivos = action.payload
		},
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
	getMetadataArchivosSlice
} = TrimestralSlice.actions

export default TrimestralSlice.reducer


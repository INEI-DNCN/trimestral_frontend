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
	name: 'home',
	initialState,
	reducers: {
		getMetadataArchivosSlice: (state, action) => {
			state.metadataArchivos = action.payload
		},
	}
})


export const {
	getMetadataArchivosSlice
} = TrimestralSlice.actions

export default TrimestralSlice.reducer


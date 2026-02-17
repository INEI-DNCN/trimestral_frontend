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
	fechasActualizacion: { nombre: string; fecha_actualizacion: string }[]
}

const initialState: trimestralState = {
	metadataArchivos: [],
	titleTrimestral: [],
	comentariosTrimestral: [],
	indicadores: [],
	fechasActualizacion: [],
};


export const TrimestralSlice = createSlice({
	name: 'home',
	initialState,
	reducers: {
		getMetadataArchivosSlice: (state, action) => {
			state.metadataArchivos = action.payload
		},
		getFechasActualizacionSlice: (state, action) => {
			state.fechasActualizacion = action.payload
		},
	}
})


export const {
	getFechasActualizacionSlice,
	getMetadataArchivosSlice
} = TrimestralSlice.actions

export default TrimestralSlice.reducer


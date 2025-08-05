import { createSlice } from '@reduxjs/toolkit'


export const TrimestralSlice = createSlice({
	name: 'trimestral',
	initialState: {
		metadataArchivos: [],
		titleTrimestral: [],
		comentariosTrimestral: [],
		indicadores: [],
	},
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


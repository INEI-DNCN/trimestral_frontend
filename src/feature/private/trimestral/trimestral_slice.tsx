import { createSlice } from '@reduxjs/toolkit'


export const TrimestralSlice = createSlice({
	name:'trimestral',
	initialState:{
		metadataArchivos:[],
		titleTrimestral: [],
		titleTrimestralYear: [],
		comentariosTrimestral: [],
		yearsComment:[],
		quartersCommentOfYear:[],
		indicadores:[],
	},
	reducers:{
		getMetadataArchivosSlice:(state, action) => {
			state.metadataArchivos = action.payload
		},
		getTitleTrimestralSlice:(state, action) => {
			state.titleTrimestral = action.payload
		},
		getTitleTrimestralYearSlice:(state, action) => {
			state.titleTrimestralYear = action.payload
		},
		getComentariosTrimestralYearSlice:(state, action) => {
			state.comentariosTrimestral = action.payload
		},
		getYearsCommentSlice:(state, action) => {
			state.yearsComment = action.payload
		},
		getQuartersCommentOfYearSlice:(state, action) => {
			state.quartersCommentOfYear = action.payload
		},
		getIndicadoresSlice:(state, action) => {
			state.indicadores = action.payload
		},
	}
})


export const {
	getTitleTrimestralSlice,
	getTitleTrimestralYearSlice,
	getComentariosTrimestralYearSlice,
	getYearsCommentSlice,
	getQuartersCommentOfYearSlice,
	getIndicadoresSlice,
	getMetadataArchivosSlice
} = TrimestralSlice.actions

export default TrimestralSlice.reducer


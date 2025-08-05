import { createSlice } from '@reduxjs/toolkit'

export const homeSlice = createSlice({
	name:'home',
	initialState:{
		years:[],
		modules:[],
		levels:[],
		sectores:[],
		clasifications:[],
		formats:[],
		chapters:[],
		levelDetails:[],
		categories:[],
		subCategories:[],
	},
	reducers:{
		getYears:(state, action) => {
			state.years = action.payload
		},
		getModules:(state, action) => {
			state.modules = action.payload
		},
		getlevels:(state, action) => {
			state.levels = action.payload
		},
		getSectores:(state, action) => {
			state.sectores = action.payload
		},
		getClasifications:(state, action) => {
			state.clasifications = action.payload
		},
		getFormats:(state, action) => {
			state.formats = action.payload
		},
		getChapters:(state, action) => {
			state.chapters = action.payload
		},
		getlevelDetails:(state, action) => {
			state.levelDetails = action.payload
		},
		getCategories:(state, action) => {
			state.categories = action.payload
		},
		getSubCategories:(state, action) => {
			state.subCategories = action.payload
		}
	}
})


export const {
	getYears,
	getModules,
	getlevels,
	getSectores,
	getClasifications,
	getFormats,
	getChapters,
	getlevelDetails,
	getCategories,
	getSubCategories,
} = homeSlice.actions

export default homeSlice.reducer


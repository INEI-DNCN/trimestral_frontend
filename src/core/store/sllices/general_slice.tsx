import { createSlice } from '@reduxjs/toolkit'



export const generalSlice = createSlice({
	name:'general',
	initialState:{
		NCAENivel14: [],
		NCAENivel54: [],
		NCAENivel101: [],

	},
	reducers:{
		getNCAENivel14Slice:(state, action) => {
			state.NCAENivel14 = action.payload
		},
		getNCAENivel54Slice:(state, action) => {
			state.NCAENivel54 = action.payload
		},
		getNCAENivel101Slice:(state, action) => {
			state.NCAENivel101 = action.payload
		},
	}
})


export const {
	getNCAENivel14Slice,
	getNCAENivel54Slice,
	getNCAENivel101Slice

} = generalSlice.actions

export default generalSlice.reducer


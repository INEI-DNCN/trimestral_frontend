import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { Menu } from "../../feature/private/menu/menu_slice";

interface RouterState {
	menus: Menu[];
	loading: boolean;
	error: string | null;
}

const initialState: RouterState = {
	menus: [],
	loading: false,
	error: null,
};

export const routerSlice = createSlice({
	name: "router",
	initialState,
	reducers: {
		startLoading: (state) => {
			state.loading = true;
			state.error = null;
		},
		menusSuccess: (state, action: PayloadAction<Menu[]>) => {
			state.menus = action.payload;
			state.loading = false;
			state.error = null;
		},
		menusError: (state, action: PayloadAction<string>) => {
			state.loading = false;
			state.error = action.payload;
		},
	},
});

export const { startLoading, menusSuccess, menusError } = routerSlice.actions;

export default routerSlice.reducer;
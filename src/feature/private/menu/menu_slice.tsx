import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import type { PaginatedResponse } from '../../../app/components/interface/pagination_response_interface';
import type { User } from '../../perfil/perfil_slice';
// import { initialAplication, type Aplication } from '../aplication/aplication_slice';


export interface MenuUser {
	id?: string;
	user: User;
	menu: Menu
}

export interface MenuUsersDto {
	id?: string;
	userId?: string;
	menuId?: string;
	roleId?: string;
}

export interface MenuDTO {
	id?: string;
	label: string;
	path: string;
	sectionTitle?: false,
	applicationId: string;
	order: number;
	component?: string;
	parentId?: string;
}

export interface Menu {
	id?: string;
	label: string;
	path?: string | null;
	component?: string | null;
	icon?: string | null;
	order: number;
	sectionTitle?: boolean,
	// application?: Aplication;
	parent?: ParentMenu | null;
	children?: Menu[];
	userCount?: number;
}

export interface ParentMenu {
	id: string;
	label: string;
	route: string;
}

export const initialMenu: Menu = {
	id: "",
	label: "",
	path: "",
	// application: initialAplication,
	order: 0,
	parent: null,
	children: [],
};

interface MenuState {
	menusPagination: PaginatedResponse<Menu> | null;
	usersByMenuPagination: PaginatedResponse<MenuUser> | null;
}

const initialState: MenuState = {
	menusPagination: {
		items: [],
		meta: {
			totalItems: 0,
			itemCount: 0,
			itemsPerPage: 15,
			totalPages: 1,
			currentPage: 1,
		}
	},
	usersByMenuPagination: {
		items: [],
		meta: {
			totalItems: 0,
			itemCount: 0,
			itemsPerPage: 0,
			totalPages: 0,
			currentPage: 0,
		}
	},
};

export const menuSlice = createSlice({
	name: 'menu',
	initialState,
	reducers: {
		MenusPaginationSlice: (state, action: PayloadAction<PaginatedResponse<Menu>>) => {
			state.menusPagination = action.payload
		},
		UsersByMenuPaginationSlice: (state, action: PayloadAction<PaginatedResponse<MenuUser>>) => {
			state.usersByMenuPagination = action.payload
		},
	}
})


export const {
	MenusPaginationSlice,
	UsersByMenuPaginationSlice
} = menuSlice.actions

export default menuSlice.reducer


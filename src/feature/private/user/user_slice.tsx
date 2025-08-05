import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import type { PaginatedResponse } from '../../../app/components/interface/pagination_response_interface';

export interface User {
	id?: string;
	dni: string;
	name: string;
	firtName: string;
	lastName: string;
	email: string;
	birthday: string; // puede mantenerse como string ISO
	password?: string;
	isActive?: boolean;
	createdAt?: string;
	updatedAt?: string;
	deletedAt?: string | null;
	isLinked?: number;
	roleId?: string;
}

export interface UserPayload {
	id: string;
	dni: string;
	name: string;
	firtName: string;
	lastName: string;
	clientId: string;
	iat: number;
	exp: number;
}

export const initialUser: User = {
	dni: "",
	name: "",
	firtName: "",
	lastName: "",
	email: "",
	birthday: "", // o new Date().toISOString().split('T')[0] si prefieres
	password: "",
	isActive: true,
};
interface UserState {
	usersPagination: PaginatedResponse<User> | null;
	oneUser: User;
}

const initialState: UserState = {
	usersPagination: {
		items: [],
		meta: {
			totalItems: 0,
			itemCount: 0,
			itemsPerPage: 15,
			totalPages: 1,
			currentPage: 1,
		}
	},
	oneUser: initialUser
};

export const userSlice = createSlice({
	name: 'user',
	initialState,
	reducers: {
		UsersPaginationSlice: (state, action: PayloadAction<PaginatedResponse<User>>) => {
			state.usersPagination = action.payload
		},
		OneUserSlice: (state, action: PayloadAction<User>) => {
			state.oneUser = action.payload
		},
	}
})


export const {
	UsersPaginationSlice,
	OneUserSlice
} = userSlice.actions

export default userSlice.reducer


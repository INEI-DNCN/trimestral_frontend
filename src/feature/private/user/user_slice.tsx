import { createSlice, type PayloadAction } from '@reduxjs/toolkit';

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
	birthday: "",
	password: "",
	isActive: true,
};

interface UserState {
	oneUser: User;
}

const initialState: UserState = {
	oneUser: initialUser
};

export const userSlice = createSlice({
	name: 'user',
	initialState,
	reducers: {
		OneUserSlice: (state, action: PayloadAction<User>) => {
			state.oneUser = action.payload
		},
	}
})
export const {
	OneUserSlice
} = userSlice.actions

export default userSlice.reducer


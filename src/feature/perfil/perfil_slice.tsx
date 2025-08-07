import { createSlice, type PayloadAction } from '@reduxjs/toolkit';

export interface AplicationUserRol {
	id?: string;
	aplication: Aplication;
	role: Rol;
	user: User;
}

export interface Aplication {
	id?: string;
	name: string;
	clientId?: string;
	clientSecret?: string;
	isActive?: boolean;
	createdAt?: string;
	updatedAt?: string;
	deletedAt?: string;
}

export interface Rol {
	id?: string;
	name: string;
	isActive?: boolean;
}

export interface User {
	id?: string;
	dni: string;
	name: string;
	firtName: string;
	lastName: string;
	email: string;
	birthday: string;
	password?: string
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
};

export const initialAplication: Aplication = {
	name: "",
};

export const initialRole: Aplication = {
	name: "",
};

export const initialAplicationUserRole: AplicationUserRol = {
	user: initialUser,
	aplication: initialAplication,
	role: initialRole
};

interface UserState {
	oneUser: AplicationUserRol;
}

const initialState: UserState = {
	oneUser: initialAplicationUserRole
};

export const PerfilSlice = createSlice({
	name: 'perfil',
	initialState,
	reducers: {
		OneUserSlice: (state, action: PayloadAction<AplicationUserRol>) => {
			state.oneUser = action.payload
		},
	}
})
export const {
	OneUserSlice
} = PerfilSlice.actions

export default PerfilSlice.reducer


import { createSlice, type PayloadAction } from '@reduxjs/toolkit';

export interface AplicationUserRol {
	id?: string;
	aplication: Aplication;
	role: Role;
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

export interface Role {
	id?: string;
	name: string;
	isActive?: boolean;
}

export interface User {
	id?: string;
	username: string;
	password?: string;
	personal?: Personal;
	isActive?: boolean;
	isLinked?: boolean;
}

export interface Personal {
	id?: string;
	dni: string;
	name: string;
	firstName: string;
	lastName: string;
	email: string;
	birthday: string;
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
	username: "",
	password: "",
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
	employee: AplicationUserRol;
}

const initialState: UserState = {
	employee: initialAplicationUserRole
};

export const PerfilSlice = createSlice({
	name: 'perfil',
	initialState,
	reducers: {
		OneUserSlice: (state, action: PayloadAction<AplicationUserRol>) => {
			state.employee = action.payload
		},
	}
})
export const {
	OneUserSlice
} = PerfilSlice.actions

export default PerfilSlice.reducer


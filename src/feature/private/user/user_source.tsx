import { OneUserSlice, UsersPaginationSlice, type User } from "./user_slice";
import { API } from "../../../app/utils/utils_api";
import type { getPagination } from "../../../app/components/interface/pagination_response_interface";


export const getUserPagination = ({
	page = 1,
	search = '',
	limit = 8,
	}: getPagination) => async (dispatch: any) => {
	try {
		const response = await API.get('users/pagination', {
			params: { page, limit, search },
		});
		dispatch(UsersPaginationSlice(response.data));
	} catch (error) {
		console.error('Error en getAplicationPagination:', error);
	}
};

export const getOneUser = ({ id }: { id: string }) => async (dispatch: any) => {
	try {
		const response = await API.get(`users/${id}`);
		dispatch(OneUserSlice(response.data));
		return response;
	} catch (error) {
		console.error('Error en getOneUser:', error);
	}
};

export async function createUserSource( user: User ) {

	try {
		const response = await API.post(`users`, user);
		return response
	} catch (error) {
		console.error("Error en createAplicationSource:", error);
	}
}

export async function updateUserSource(user: User ) {
	try {
		const response = await API.put(`users/${user.id}`, user );
		return response
	} catch (error) {
		console.error("Error en updateUserSource:", error);
	}
}

export async function changePasswordUserSource(payload: any ) {

	try {
		const response = await API.put(`usuario/change-password/${payload.dni}`, {
			params: {
				password: payload.password,
			},
		});
		return response
	} catch (error) {
		console.error("Error en updateUserSource:", error);
	}
}

export async function deleteUserSource(payload: any ) {
	try {
		const response = await API.delete(`usuario/${payload.dni}`, {
			params: {
				password: payload.password,
			},
		});
		return response
	} catch (error) {
		console.error("Error en updateUserSource:", error);
	}
}

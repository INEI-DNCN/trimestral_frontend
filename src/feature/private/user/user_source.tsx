import { API } from "../../../app/utils/utils_api";
import { OneUserSlice, type User } from "./user_slice";

export const getOneUser = ({ id }: { id: string }) => async (dispatch: any) => {
	try {
		const response = await API.get(`users/${id}`);
		dispatch(OneUserSlice(response.data));
		return response;
	} catch (error) {
		console.error('Error en getOneUser:', error);
	}
};

export async function updateUserSource(user: User) {
	try {
		const response = await API.put(`users/${user.id}`, user);
		return response
	} catch (error) {
		console.error("Error en updateUserSource:", error);
	}
}

export async function changePasswordUserSource(payload: any) {

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

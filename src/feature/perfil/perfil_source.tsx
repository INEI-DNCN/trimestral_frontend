import { API2 } from "../../app/utils/utils_api";
import { OneUserSlice, type User } from "./perfil_slice";

export const getOneUser = ({ id }: { id: string }) => async (dispatch: any) => {
	try {
		const response = await API2.get(`application-users/user/${id}/application/${import.meta.env.VITE_CLIENTE_ID}`);
		dispatch(OneUserSlice(response.data[0]));
		return response;
	} catch (error) {
		console.error('Error en getOneUser:', error);
	}
};

export async function updateUserSource(user: User) {
	try {
		const response = await API2.put(`users/${user.id}`, user);
		return response
	} catch (error) {
		console.error("Error en updateUserSource:", error);
	}
}

export async function changePasswordUserSource(payload: any) {

	try {
		const response = await API2.put(`usuario/change-password/${payload.dni}`, {
			params: {
				password: payload.password,
			},
		});
		return response
	} catch (error) {
		console.error("Error en updateUserSource:", error);
	}
}

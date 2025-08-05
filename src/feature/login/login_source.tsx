import { API2 } from "../../app/utils/utils_api";

export async function signupSource(data: any) {

	const response = await API2.post(`auth/login`, data);
	return response

}

export async function logoutSource() {
	try {
		const response = await API2.post(`auth/logout`);
		return response;
	} catch (error) {
		console.error('Error en logout:', error);
		throw error;
	}
}
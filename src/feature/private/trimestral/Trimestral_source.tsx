
import { jwtDecode } from "jwt-decode";
import { API, API2 } from "../../../app/utils/utils_api";
import { getToken } from "../../../app/utils/utils_localstorage";
import type { UserPayload } from "../user/user_slice";
import { getComentariosTrimestralYearSlice, getIndicadoresSlice, getMetadataArchivosSlice, getTitleTrimestralSlice } from "./trimestral_slice";

export const getMetadatosArchivosSource = () => async (dispatch: any) => {
	try {
		const response = await API.get(`metadatos_archivos`);
		dispatch(getMetadataArchivosSlice(response.data));
	} catch (error) {
		console.error("Error en getSource:", error);
	}
};

export const getTitleTrimestralSource = () => async (dispatch: any) => {
	try {
		const token = getToken();
		let decoded;
		if (token) {
			decoded = jwtDecode<UserPayload>(token);
		}
		console.log(decoded)
		const responseAuth = await API2.get(`groups-users/user/${decoded?.id}`);
		const response = await API.get(`titulo`);

		const groupNames = responseAuth.data.map((entry: any) => entry.group.name);
		const matchedTemas = response.data.filter((tema: any) =>
			groupNames.includes(tema.nombre)
		);

		dispatch(getTitleTrimestralSlice(matchedTemas));
	} catch (error) {
		console.error("Error en getSource:", error);
	}
};



export const getComentarioTrimestralSource = (id_titulo: number, anio: string, trimestre: string) => async (dispatch: any) => {
	try {
		const response = await API.get(`comentarios/by-titulo`, {
			params: { id_titulo, anio, trimestre },
		});
		dispatch(getComentariosTrimestralYearSlice(response.data));
	} catch (error) {
		console.error("Error en getComentarioTrimestralSource:", error);
	}
};

export const updateComentario = async (id: string, contenido: string) => {
	try {
		const response = await API.put(`comentarios/${id}`, {
			contenido: contenido,
		});
		return response.data;
	} catch (error) {
		console.error('Error actualizando el comentario:', error);
		throw error;
	}
};

export const UpdateDocumentsSource = async () => {
	try {

		const token = getToken();
		let decoded;
		if (token) {
			decoded = jwtDecode<UserPayload>(token);
		}
		const username = `${decoded?.name + "_" + decoded?.firtName + "_" + decoded?.lastName}`

		const response = await API.get(
			`scrips/update-excel`,
			{ params: { id: 1, usuario: username } }
		);
		return response;
	} catch (error) {
		console.error("Error en UpdateDocumentsSource:", error);
		throw error;
	}
};

export const ProcessDocumentSource = async () => {

	const token = getToken();
	let decoded;
	if (token) {
		decoded = jwtDecode<UserPayload>(token);
	}
	const username = `${decoded?.name + "_" + decoded?.firtName + "_" + decoded?.lastName}`
	try {
		const response = await API.get('scrips/generar-documento',
			{ params: { id: 2, usuario: username } }
		);
		return response;
	} catch (error) {
		console.error("Error en ProcessDocumentSource:", error);
		throw error;
	}
};

export const getIndicadoresSource = (anio: number, trimestre: string, hoja: string) => async (dispatch: any) => {
	try {
		const response = await API.get(`idicadores`, {
			params: { anio, trimestre, hoja },
		});
		dispatch(getIndicadoresSlice(response.data));
	} catch (error) {
		console.error("Error en getComentarioTrimestralSource:", error);
	}
};
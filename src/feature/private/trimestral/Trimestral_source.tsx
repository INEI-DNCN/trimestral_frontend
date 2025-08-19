
import { jwtDecode } from "jwt-decode";
import { API, API2 } from "../../../app/utils/utils_api";
import { getToken } from "../../../app/utils/utils_localstorage";
import type { UserPayload } from "../../perfil/perfil_slice";
import { getComentariosTrimestralYearSlice, getIndicadoresSlice, getMetadataArchivosSlice, getTitleTrimestralSlice, type comentarioDTO } from "./trimestral_slice";

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
			const responseAuth = await API2.get(`groups-users/user/${decoded?.id}`);
			const response = await API.get(`titulo`);

			const groupNames = responseAuth.data.map((entry: any) => entry.group.name);
			const matchedTemas = response.data.filter((tema: any) =>
				groupNames.includes(tema.nombre)
			);

			dispatch(getTitleTrimestralSlice(matchedTemas));
		}
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

export const updateComentario = async (contenido: comentarioDTO) => {
	try {
		const response = await API.put(`comentarios/${contenido.id}`, {
			contenido: contenido.contenido,
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
		const username = `${decoded?.name || ''} ${decoded?.firtName || ''} ${decoded?.lastName || ''}`
			.trim()
			.replace(/\s+/g, '_');
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
	const username = `${decoded?.name || ''} ${decoded?.firtName || ''} ${decoded?.lastName || ''}`
		.trim()
		.replace(/\s+/g, '_');

	console.log(username)
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
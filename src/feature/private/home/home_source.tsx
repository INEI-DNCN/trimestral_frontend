
import { jwtDecode } from "jwt-decode";
import { API } from "../../../app/utils/utils_api";
import { getToken } from "../../../app/utils/utils_localstorage";
import type { UserPayload } from "../../perfil/perfil_slice";
import { getFechasActualizacionSlice, getMetadataArchivosSlice } from "./home_slice";

export const getMetadatosArchivosSource = () => async (dispatch: any) => {
	try {
		const response = await API.get(`metadatos_archivos`);
		dispatch(getMetadataArchivosSlice(response.data));
	} catch (error) {
		console.error("Error en getSource:", error);
	}
};

export const getFechasActualizacionSource =
	(anio: string, trimestre: string) => async (dispatch: any) => {
		try {
			const response = await API.get(`comentarios/fechas-actualizacion`, {
				params: { anio, trimestre },
			});

			dispatch(getFechasActualizacionSlice(response.data));
		} catch (error) {
			console.error("Error en getFechasActualizacionSource:", error);
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


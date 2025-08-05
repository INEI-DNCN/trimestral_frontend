
import { API } from "../../../app/utils/utils_api";
import { getComentariosTrimestralYearSlice, getIndicadoresSlice, getMetadataArchivosSlice, getQuartersCommentOfYearSlice, getTitleTrimestralSlice, getTitleTrimestralYearSlice, getYearsCommentSlice } from "./trimestral_slice";

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
		const response = await API.get(`titulo`);
		dispatch(getTitleTrimestralSlice(response.data));
	} catch (error) {
		console.error("Error en getSource:", error);
	}
};

export const getTitleTrimestralYearSource = () => async (dispatch: any) => {
	try {
		const response = await API.get(`datos-trimestrales/distinct-years`);
		dispatch(getTitleTrimestralYearSlice(response.data));
	} catch (error) {
		console.error("Error en getSource:", error);
	}
};


export const getYearsComentariosSource = () => async (dispatch: any) => {
	try {
		const response = await API.get(`comentarios/distinct-year`);
		dispatch(getYearsCommentSlice(response.data));
	} catch (error) {
		console.error("Error en getSource:", error);
	}
};

export const getQuartersComentariosOfYearsSource = (year: string,) => async (dispatch: any) => {
	try {
		const response = await API.get(`comentarios/distinct-quarter-of-yard`, { params: { year } });
		dispatch(getQuartersCommentOfYearSlice(response.data));
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
		console.log("ingrese2")
		const response = await API.get(
			`scrips/update-excel`,
			{ params: { id: 1, usuario: "Julio" } }
		);
		return response;
	} catch (error) {
		console.error("Error en UpdateDocumentsSource:", error);
		throw error;
	}
};

export const ProcessDocumentSource = async () => {
	try {
		const response = await API.get('scrips/generar-documento',
			{ params: { id: 2, usuario: "Julio" } }
		);
		return response; // Devuelve la respuesta si se necesita
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
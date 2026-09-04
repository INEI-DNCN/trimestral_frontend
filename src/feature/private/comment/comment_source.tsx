import { jwtDecode } from "jwt-decode";
import { API, API2 } from "../../../app/utils/utils_api";
import { getToken } from "../../../app/utils/utils_localstorage";
import type { AplicationUserRol, UserPayload } from "../../perfil/perfil_slice";
import { getComentarioEstadoSlice, getComentarioHistoricoSlice, getComentarioSlice, setComentarioHistoricoLoading, setComentarioLoading, type comentario, type comentarioEstado } from "./comment_slice";

export const getComentarioSource =
	(anio: string, trimestre: string, isloading: boolean = false) =>
		async (dispatch: any) => {
			if (isloading) {
				dispatch(setComentarioLoading(true));
			}

			const token = getToken();

			try {
				if (!token) throw new Error('Token not found');

				const decoded = jwtDecode<UserPayload>(token);

				const clientId = import.meta.env.VITE_CLIENTE_ID;

				const responseAuth = await API2.get('groups-users/user', {
					params: {
						clientId,
						userId: decoded?.id,
					},
				});

				const ids = responseAuth.data
					.map((item: { name: string }) => Number(item.name))
					.filter((id: number) => !Number.isNaN(id));

				const response = await API.get(
					'comentarios/comentarios-trimestrales',
					{
						params: {
							anio,
							trimestre,
							ids: ids.join(','),
						},
					}
				);

				dispatch(getComentarioSlice(response.data));
			} catch (error) {
				console.error('Error en getComentarioSource:', error);
			} finally {
				if (isloading) {
					dispatch(setComentarioLoading(false));
				}
			}
		};

export const putComentario = async (
	employee: AplicationUserRol,
	comentario: comentario,
	estado_id?: number
) => {
	const usuario =
		`${employee.user.personal?.name ?? ''} ` +
		`${employee.user.personal?.firstName ?? ''} ` +
		`${employee.user.personal?.lastName ?? ''}`
			.trim()
			.replace(/\s+/g, ' ');

	const estadoActual = estado_id ?? comentario.estado_id;

	const response = await API.put(
		`comentarios/${comentario.id}`,
		{
			contenido: comentario.contenido,
			usuario,
			estado_id: estadoActual,
		}
	);
	return response.data;
};

export const getComentariosEstadosSource =
	({ employee }: { employee: AplicationUserRol }) =>
		async (dispatch: any) => {
			try {
				const response = await API.get(`comentarios-estado`);

				const rolId = employee.role?.id?.toUpperCase();

				console.log('employee:', employee);
				console.log('rolId:', rolId);
				console.log('estados:', response.data);

				const estadosPorRol: Record<string, number[]> = {
					'3794260D-0EA7-F111-B6D5-000C29490DA3': [1, 2, 3],
					'FC494214-0EA7-F111-B6D5-000C29490DA3': [3, 4, 5],
					'ABFB8A30-10A7-F111-B6D5-000C29490DA3': [1, 2, 3, 4, 5],
				};

				const estadosPermitidos = estadosPorRol[rolId ?? ''] ?? [];

				console.log('estadosPermitidos:', estadosPermitidos);

				const estadosFiltrados = response.data.filter(
					(estado: comentarioEstado) => estadosPermitidos.includes(estado.id!)
				);

				console.log('estadosFiltrados:', estadosFiltrados);

				dispatch(getComentarioEstadoSlice(estadosFiltrados));
			} catch (error) {
				console.error("Error en getComentariosEstadosSource:", error);
			}
		};

export const getComentarioHistoricoSource = (idComentario: number) => async (dispatch: any) => {
	dispatch(setComentarioHistoricoLoading(true));
	try {
		const response = await API.get(`comentarios-historico/${idComentario}`);
		dispatch(getComentarioHistoricoSlice(response.data));
	} catch (error) {
		console.error('Error en getComentarioHistoricoSource:', error);
	} finally {
		dispatch(setComentarioHistoricoLoading(false));
	}
};



export const puedeVisualizarComponente = (rolId: string, estadoId: number): boolean => {
	const ANALISTA = '3794260D-0EA7-F111-B6D5-000C29490DA3';
	const REVISOR = 'FC494214-0EA7-F111-B6D5-000C29490DA3';
	const ADMINISTRADOR = 'ABFB8A30-10A7-F111-B6D5-000C29490DA3';

	if (rolId === ADMINISTRADOR) return true;

	if (rolId === ANALISTA) {
		return [1, 2, 3].includes(estadoId);
	}

	if (rolId === REVISOR) {
		return [3, 4, 5].includes(estadoId);
	}

	return false;
};
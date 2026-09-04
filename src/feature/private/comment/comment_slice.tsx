import { createSlice } from '@reduxjs/toolkit';

export interface comentario {
	id?: number
	id_titulo?: number
	titulo?: string
	id_hoja?: string
	contenido: string
	anio?: number
	trimestre?: string
	estado_id?: number
	estado?: string
	usuario_ultima_actualizacion?: string
	ultima_actualizacion?: string
	indicadores?: []
}

export interface comentarioEstado {
	id?: number
	nombre: string
	descripcion?: string
	orden?: number
	activo?: boolean
}

export interface comentarioHistorico {
	id?: number;
	id_comentario?: number;
	contenido?: string | null;
	estado_id?: number | null;
	estado?: string | null;
	estado_descripcion?: string | null;
	usuario?: string;
	fecha_cambio?: string;
	tipo_cambio?: string;
}

interface InitialState {
	comentario: comentario[],
	comentarioEstado: comentarioEstado[],
	comentarioHistorico: comentarioHistorico[],
	loading: LoadingState;
}

interface LoadingState {
	comentario: boolean;
	comentarioHistorico: boolean;
}

const initialState: InitialState = {
	comentario: [],
	comentarioEstado: [],
	comentarioHistorico: [],
	loading: {
		comentario: false,
		comentarioHistorico: false,
	},
};

export const TrimestralSlice = createSlice({
	name: 'comment',
	initialState,
	reducers: {
		getComentarioSlice: (state, action) => {
			state.comentario = action.payload
		},
		getComentarioEstadoSlice: (state, action) => {
			state.comentarioEstado = action.payload
		},
		getComentarioHistoricoSlice: (state, action) => {
			state.comentarioHistorico = action.payload
		},
		setComentarioLoading: (state, action) => {
			state.loading.comentario = action.payload;
		},
		setComentarioHistoricoLoading: (state, action) => {
			state.loading.comentarioHistorico = action.payload;
		}
	}
})


export const {
	getComentarioSlice,
	getComentarioEstadoSlice,
	getComentarioHistoricoSlice,
	setComentarioLoading,
	setComentarioHistoricoLoading,
} = TrimestralSlice.actions

export default TrimestralSlice.reducer


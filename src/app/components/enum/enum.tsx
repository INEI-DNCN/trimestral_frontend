export enum RoleType {
	Admin = 'Admin',
	Jefe = 'Jefe',
	Operador = 'Operador'
}

export enum Stado {
	actualize = 'actualize',
	cree = 'cree',
}

export enum actions {
	none = 'none',
	create = 'Nuevo registro',
	update = 'actualizar',
	delete = 'eliminar',
	password = 'password',
	state = 'state',
	procesar = 'procesar',
	filtro = 'Filtros',
	buttons = 'buttons',
	history = 'Historial',

}

export enum DialogAction {
	none = 'None',
	create = 'Crear',
	update = 'Actualizar',
	delete = 'Eliminar',
	password = 'Cambiar Contraseña ',
	filter = 'Filtros',
	validate = 'Validar',
	modulo = 'modulo',
	loadin = 'Loadig',
}

export enum StateMessage {
	error = 'error',
	warning = 'warning',
	info = 'info',
	success = 'success',
}

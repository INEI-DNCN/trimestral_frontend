export const toSqlDateTime = (date: Date) => {
	let mm = ("00" + (date.getMonth() + 1)).slice(-2)
	let yyyy = date.getFullYear()
	let dd = ("00" + date.getDate()).slice(-2)
	return `${dd}/${mm}/${yyyy}`;
}

export const toSqlDateTimeString = (dateString: string) => {
	const date = new Date(dateString); // Convierte la cadena en un objeto Date
	let mm = ("00" + (date.getMonth() + 1)).slice(-2); // Meses van de 0 a 11
	let yyyy = date.getFullYear();
	let dd = ("00" + date.getDate()).slice(-2);
	return `${dd}/${mm}/${yyyy}`;
}

export const toSqlDateTimeReverce = (date: Date) => {
	let mm = ("00" + (date.getMonth() + 1)).slice(-2)
	let yyyy = date.getFullYear()
	let dd = ("00" + date.getDate()).slice(-2)
	return `${yyyy}/${mm}/${dd}`;
}

export const toDateTimeYear = (date: Date) => {
	let yyyy = date.getFullYear()

	return `${yyyy}`;
}

export const toDateTimeDay = (date: Date) => {
	let dd = ("00" + date.getDate()).slice(-2)
	return `${dd
		}`;
}


export function formatFechaAmPm(fechaString: string): string {
	const fecha = new Date(fechaString);
	const dia = fecha.getDate().toString().padStart(2, '0');
	const mes = (fecha.getMonth() + 1).toString().padStart(2, '0');
	const anio = fecha.getFullYear();
	let horas = fecha.getHours();
	const minutos = fecha.getMinutes().toString().padStart(2, '0');
	const amPm = horas >= 12 ? 'p. m.' : 'a. m.';

	// Formato 12 horas
	horas = horas % 12;
	horas = horas === 0 ? 12 : horas;
	const horasStr = horas.toString().padStart(2, '0');

	return `${dia}-${mes}-${anio} ${horasStr}:${minutos} ${amPm}`;
}



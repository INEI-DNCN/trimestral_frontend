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



export const TrimestralJson = (year: number, quarter: any) => {


	type Quarter = "I" | "II" | "III" | "IV";

	const headers = [
		"I Trim.",
		"II Trim.",
		"III Trim.",
		"IV Trim.",
		"I Sem.",
		"Acumulado al III Trim.",
		"4 últimos Trim.",
		"Año"
	];

	function distribuirHeaders(quarter: Quarter) {
		const yearCurrent: { value: string }[] = [];
		const yearPast: { value: string }[] = [];

		const push = (target: any[], ...indices: number[]) =>
			target.push(...indices.map(i => ({ value: headers[i] })));


		switch (quarter) {
			case "I":
				push(yearCurrent, 0);
				push(yearPast, 0, 1, 2, 3, 7);
				break;
			case "II":
				push(yearCurrent, 0, 1, 4, 6);
				push(yearPast, 0, 1, 4, 6);
				break;
			case "III":
				push(yearCurrent, 0, 1, 2, 5, 6);
				push(yearPast, 0, 1, 2, 5, 6);
				break;
			case "IV":
				push(yearCurrent, 0, 1, 2, 3, 7);
				push(yearPast, 0, 1, 2, 3, 7);
				break;
		}

		return { yearCurrent, yearPast };
	}

	const { yearCurrent, yearPast } = distribuirHeaders(quarter);

	const structure = [
		{ value: "Actividad" },
		{
			value: `${year - 1} / ${year - 2}`,
			children: yearPast
		},
		{
			value: `${year} / ${year - 1}`,
			children: yearCurrent
		},
	];
	return structure
}



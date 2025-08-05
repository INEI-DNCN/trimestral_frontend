import { Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from "@mui/material";
import React from "react";




interface DataRow {
	ccnnnom_cod: string;
	Descripción: string;
	[key: string]: string | number;
}

interface Props {
	data: DataRow[];
	columnWidths?: Record<string, number | string>; // Nuevo prop opcional
	columnAligns?: Record<string, any | string>; // Nuevo prop opcional
	diagonal?: {
		paint?: boolean; // Nuevo parámetro opcional
		startColumn?: number; // índice base 0
		endRow?: number;      // índice base 0
		color?: string;
	};
	countStartRow?: number; // Nuevo parámetro opcional (índice base 0)
	countMax?: number; // Nuevo parámetro opcional
	structureHeadeJson?: any;
	highlightLastNRows?: number;
	highlightFirstNRows?: number; // NUEVO: cantidad de primeras filas a resaltar
	// NUEVOS props para continuidad de tabla
	data2?: DataRow[];
	data2StartCol?: number; // índice base 0
	data2HighlightConfig?: { rows: number[]; color: string }[]; // NUEVO
	data3?: DataRow[];
	data3StartCol?: number; // índice base 0
	data3HighlightConfig?: { rows: number[]; color: string }[]; // NUEVO
}

const ModelTable: React.FC<Props> = ({
	data,
	columnWidths = {},
	columnAligns = {},
	diagonal = {},
	countStartRow = 0, // por defecto primera fila
	countMax,
	structureHeadeJson,
	highlightLastNRows = 0,
	highlightFirstNRows = 0, // NUEVO: cantidad de primeras filas a resaltar
	data2,
	data2StartCol = 0,
	data2HighlightConfig = [],
	data3,
	data3StartCol = 0,
	data3HighlightConfig = [],
}) => {

	if (!data.length && !data2?.length && !data3?.length) {
		return (
			<div
				style={{
					width: "100%",
					height: "100%",
					display: "flex",
					justifyContent: "center",
					alignItems: "center",
					borderRadius: "16px",
					flexDirection: "column"
				}}
			>
				<div>

					<div
						style={{
							marginTop: "18px",
							fontSize: "1.25rem",
							fontWeight: 600,
							textAlign: "center",
							color: "#64748b",
							background: "#e0e7ef",
							padding: "10px 28px",
							borderRadius: "8px",
							boxShadow: "0 1px 4px #0001",
							letterSpacing: "0.5px"
						}}
					>
						Sin Datos Disponibles
					</div>
				</div>
			</div>
		);
	}

	// Determina las keys base de la tabla principal
	const keys = data.length
		? Array.from(
			data.reduce((keySet, item) => {
				Object.keys(item).forEach((key) => keySet.add(key));
				return keySet;
			}, new Set<string>())
		)
		: [];

	// Para data2 y data3, obtiene sus keys si existen
	const keys2 = data2?.length ? Object.keys(data2[0]) : [];
	const keys3 = data3?.length ? Object.keys(data3[0]) : [];

	const {
		paint: paintDiagonal = false,
		startColumn: diagonalStartColumn = 0,
		endRow: diagonalEndRow = 0,
		color: diagonalColor = "#A3CFDF"
	} = diagonal;

	// Función recursiva para calcular el colspan
	const getColSpan = (node: any): number => {
		if (!node.children) return 1;
		return node.children.reduce((sum: number, child: any) => sum + getColSpan(child), 0);
	};

	// Calcula la profundidad máxima del header
	const getMaxDepth = (nodes: any[]): number => {
		if (!nodes || nodes.length === 0) return 0;
		return 1 + Math.max(...nodes.map((node) => getMaxDepth(node.children || [])));
	};

	const maxDepth = getMaxDepth(structureHeadeJson);

	// Modifica renderHeaderRows para propagar el color (herencia)
	const renderHeaderRows = (nodes: any[], depth = 0, rows: any[] = [], parentColor?: string) => {
		rows[depth] = rows[depth] || [];
		nodes.forEach((node) => {
			const cellColor = node.color || parentColor;
			rows[depth].push({
				value: node.value,
				colSpan: getColSpan(node),
				rowSpan: node.children ? 1 : maxDepth - depth,
				color: cellColor,
			});
			if (node.children) {
				renderHeaderRows(node.children, depth + 1, rows, cellColor);
			}
		});
		return rows;
	};

	const headerRows = renderHeaderRows(structureHeadeJson);
	const headerRowHeights = Array(headerRows.length).fill(32); // Ajusta 32 si el alto de fila cambia

	// Calcula la posición de columna real de cada celda en cada fila de header
	const getColPositions = (rows: any[][]) => {
		const positions: number[][] = [];
		for (let i = 0; i < rows.length; i++) {
			let col = 0;
			positions[i] = [];
			for (let j = 0; j < rows[i].length; j++) {
				// Busca la siguiente columna libre
				while (
					positions.some(
						(r, idx) =>
							idx < i &&
							r.includes(col) &&
							rows[idx][r.indexOf(col)].rowSpan > i - idx
					)
				) {
					col++;
				}
				positions[i][j] = col;
				col += rows[i][j].colSpan || 1;
			}
		}
		return positions;
	};

	const headerColPositions = getColPositions(headerRows);

	// Calcula el top para cada celda de header considerando rowSpan y colSpan
	const getCellTop = (rowIndex: number, cellIndex: number) => {
		let top = 0;
		const col = headerColPositions[rowIndex][cellIndex];
		for (let i = 0; i < rowIndex; i++) {
			let covered = false;
			for (let j = 0; j < headerRows[i].length; j++) {
				const cell = headerRows[i][j];
				const cellCol = headerColPositions[i][j];
				const cellColSpan = cell.colSpan || 1;
				const cellRowSpan = cell.rowSpan || 1;
				if (
					cellRowSpan > rowIndex - i &&
					col >= cellCol &&
					col < cellCol + cellColSpan
				) {
					covered = true;
					break;
				}
			}
			if (!covered) {
				top += headerRowHeights[i];
			}
		}
		return top;
	};

	const defaultWidth = "120px"; // ancho por defecto

	// --- Renderizado de filas de data principal, data2 y data3 ---
	let rowIndexGlobal = 0; // Lleva el índice global de fila para pintar diagonal solo en data principal

	return (
		<TableContainer component={Paper} sx={{ height: "100%", overflow: "auto", }}>
			<Table >
				<TableHead>
					{headerRows.map((row, rowIndex) => (
						<TableRow key={rowIndex}>
							{row.map((cell: any, cellIndex: number) => {
								// Si el color es ARGB (ej: "FF99CCFF"), conviértelo a HEX CSS (#RRGGBB)


								return (
									<TableCell
										key={cellIndex}
										colSpan={cell.colSpan}
										rowSpan={cell.rowSpan}
										sx={{
											position: 'sticky',
											top: `${getCellTop(rowIndex, cellIndex)}px`,
											zIndex: 100 + rowIndex,
											backgroundColor: '#c11',
											color: "#fff",
											fontWeight: "bold",
											textAlign: "center",
											padding: "5px",
											fontSize: "10px",
											border: "1px solid #fff",
											minWidth: columnWidths[cell.value] || defaultWidth,
											maxWidth: columnWidths[cell.value] || defaultWidth,
										}}
									>
										{cell.value}
									</TableCell>
								);
							})}
						</TableRow>
					))}
				</TableHead>

				<TableBody>
					{/* --- DATA PRINCIPAL --- */}
					{data.map((row, rowIndex) => {
						const isLastRow = rowIndex === data.length - 1;
						const isLastSix = rowIndex >= data.length - highlightLastNRows;
						const isFirstN = highlightFirstNRows > 0 && rowIndex < highlightFirstNRows;
						// Lógica de conteo: solo contar si rowIndex >= countStartRow y no excede countMax
						let showCount = rowIndex >= countStartRow;
						let countValue = showCount ? (rowIndex - countStartRow + 1) : "";
						if (typeof countMax === "number" && (rowIndex - countStartRow + 1) > countMax) {
							showCount = false;
							countValue = "";
						}
						const thisRowIndex = rowIndexGlobal;
						rowIndexGlobal++;
						return (
							<TableRow
								key={`main-${rowIndex}`}
								sx={
									isFirstN
										? { backgroundColor: "#C9E7FF" }
										: isLastSix
											? { backgroundColor: "#C9E7FF" }
											: {}
								}
							>
								<TableCell sx={{
									minWidth: "5px",
									maxWidth: "5px",
									fontSize: "10px",
									border: "1px solid #b0b0b0"
								}}>
									{showCount ? countValue : countValue}
								</TableCell>
								{keys.map((key, colIndex) => {
									// Lógica para pintar la diagonal
									let diagonalBg: string | undefined = undefined;
									if (
										paintDiagonal &&
										thisRowIndex >= 0 &&
										colIndex === diagonalStartColumn + (thisRowIndex) &&
										thisRowIndex <= diagonalEndRow
									) {
										diagonalBg = diagonalColor;
									}
									// Determina si la última fila debe estar en bold solo si está pintada
									const isPaintedLastRow = isLastRow && highlightLastNRows > 0;
									return (
										<TableCell
											key={colIndex}
											sx={{
												textAlign: columnAligns[key] || 'right',
												minWidth: defaultWidth,
												maxWidth: defaultWidth,
												fontSize: "10px",
												padding: "1px 12px 1px 8px",
												border: "1px solid #b0b0b0",
												fontWeight: isPaintedLastRow ? "bold" : "inherit",
												backgroundColor: diagonalBg ?? (isLastSix ? "#C9E7FF" : undefined)
											}}
										>
											{row[key]}
										</TableCell>
									);
								})}
							</TableRow>
						)
					})}

					{/* --- DATA2 (continuación, sin header) --- */}
					{Array.isArray(data2) && data2.length > 0 && keys2.length > 0 && data2.map((row, idx) => {
						const cells = [];
						const highlight = data2HighlightConfig.find(cfg => cfg.rows.includes(idx));
						// Celdas vacías hasta la columna de inicio
						for (let i = 0; i < data2StartCol; i++) {
							cells.push(
								<TableCell key={`data2-empty-${i}`} sx={{
									minWidth: defaultWidth,
									maxWidth: defaultWidth,
									fontSize: "10px",
									padding: "1px",
									border: "1px solid #b0b0b0",
									backgroundColor: highlight ? `#${highlight.color.slice(2)}` : undefined,
									fontWeight: highlight ? "bold" : "inherit"
								}} />
							);
						}
						// Celdas con datos de data2
						for (let j = 0; j < keys2.length; j++) {
							const key = keys2[j];
							cells.push(
								<TableCell key={`data2-${idx}-${key}`} sx={{
									textAlign: columnAligns[key] || 'right',
									fontSize: "10px",
									padding: "1px 12px 1px 8px",
									border: "1px solid #b0b0b0",
									backgroundColor: highlight ? `#${highlight.color.slice(2)}` : undefined,
									fontWeight: highlight ? "bold" : "inherit"
								}}>
									{row[key]}
								</TableCell>
							);
						}
						rowIndexGlobal++;
						return (
							<TableRow key={`data2-${idx}`}>
								{cells}
							</TableRow>
						);
					})}

					{/* --- DATA3 (continuación, sin header) --- */}
					{Array.isArray(data3) && data3.length > 0 && keys3.length > 0 && data3.map((row, idx) => {
						const cells = [];
						const highlight = data3HighlightConfig.find(cfg => cfg.rows.includes(idx));
						for (let i = 0; i < data3StartCol; i++) {
							cells.push(
								<TableCell key={`data3-empty-${i}`} sx={{
									minWidth: defaultWidth,
									maxWidth: defaultWidth,
									fontSize: "10px",
									padding: "1px",
									border: "1px solid #b0b0b0",
									backgroundColor: highlight ? `#${highlight.color.slice(2)}` : undefined,
									fontWeight: highlight ? "bold" : "inherit"
								}} />
							);
						}
						for (let j = 0; j < keys3.length; j++) {
							const key = keys3[j];
							cells.push(
								<TableCell key={`data3-${idx}-${key}`} sx={{
									textAlign: columnAligns[key] || 'right',
									fontSize: "10px",
									padding: "1px 12px 1px 8px",
									border: "1px solid #b0b0b0",
									backgroundColor: highlight ? `#${highlight.color.slice(2)}` : undefined,
									fontWeight: highlight ? "bold" : "inherit"
								}}>
									{row[key]}
								</TableCell>
							);
						}
						rowIndexGlobal++;
						return (
							<TableRow key={`data3-${idx}`}>
								{cells}
							</TableRow>
						);
					})}
				</TableBody>
			</Table>
		</TableContainer>
	);
};

export default ModelTable;

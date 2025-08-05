import { Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from "@mui/material";
import React from "react";
import { useThemeContext } from "../../../../core/theme/ThemeContext";

interface DataRow {
	ccnnnom_cod: string;
	Descripción: string;
	[key: string]: string | number;
}

interface Props {
	data: DataRow[];
	columnWidths?: Record<string, number | string>;
	columnAligns?: Record<string, any | string>;
	countStartRow?: number;
	countMax?: number;
	structureHeadeJson?: any;
}

const TrimestralTable: React.FC<Props> = ({
	data,
	columnWidths = {},
	columnAligns = {},
	structureHeadeJson,
}) => {

	if (!data.length) {
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
					{/* <SinDatos /> */}
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

	const keys = data.length
		? Array.from(
			data.reduce((keySet, item) => {
				Object.keys(item).forEach((key) => keySet.add(key));
				return keySet;
			}, new Set<string>())
		)
		: [];

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

	const defaultWidth = "100px"; // ancho por defecto

	const { theme, themes } = useThemeContext();

	return (
		<TableContainer component={Paper} sx={{ height: "100%", overflow: "auto", }}>
			<Table >
				<TableHead>
					{headerRows.map((row, rowIndex) => (
						<TableRow key={rowIndex}>
							{row.map((cell: any, cellIndex: number) => {
								return (
									<TableCell
										key={cellIndex}
										colSpan={cell.colSpan}
										rowSpan={cell.rowSpan}
										sx={{
											position: 'sticky',
											whiteSpace: "pre",
											top: `${getCellTop(rowIndex, cellIndex)}px`,
											zIndex: 100 + rowIndex,
											backgroundColor: "#167595",
											color: "#F9FAFB",
											fontWeight: "bold",
											textAlign: "center",
											padding: "4px",
											fontSize: "12px",
											border: `1px solid ${themes[theme].background}`,
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
					{data.map((row, rowIndex) => {
						return (
							<TableRow
								key={`main-${rowIndex}`}
							>
								{keys.map((key, colIndex) => {
									return (
										<TableCell
											key={colIndex}
											sx={{
												textAlign: columnAligns[key] || 'right',
												minWidth: defaultWidth,
												maxWidth: defaultWidth,
												fontSize: "12px",
												background: '#F5F6F8',
												padding: "4px 8px",
												border: `1px solid ${themes[theme].background}`,
												fontWeight: "inherit",
											}}
										>
											{row[key]}
										</TableCell>
									);
								})}
							</TableRow>
						)
					})}
				</TableBody>
			</Table>
		</TableContainer>
	);
};

export default TrimestralTable;

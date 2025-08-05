import {
	Paper,
	Table,
	TableBody,
	TableCell,
	TableContainer,
	TableHead,
	TableRow,
} from "@mui/material";
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
	const { theme, themes } = useThemeContext();
	const currentTheme = themes[theme];

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
					flexDirection: "column",
					backgroundColor: currentTheme.backgroundBase,
				}}
			>
				<div
					style={{
						marginTop: "18px",
						fontSize: "1.25rem",
						fontWeight: 600,
						textAlign: "center",
						color: currentTheme.text,
						background: currentTheme.menu.backgroundActive,
						padding: "10px 28px",
						borderRadius: "8px",
						boxShadow: "0 1px 4px #0001",
						letterSpacing: "0.5px",
					}}
				>
					Sin Datos Disponibles
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

	const getColSpan = (node: any): number => {
		if (!node.children) return 1;
		return node.children.reduce((sum: number, child: any) => sum + getColSpan(child), 0);
	};

	const getMaxDepth = (nodes: any[]): number => {
		if (!nodes || nodes.length === 0) return 0;
		return 1 + Math.max(...nodes.map((node) => getMaxDepth(node.children || [])));
	};

	const maxDepth = getMaxDepth(structureHeadeJson);

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
	const headerRowHeights = Array(headerRows.length).fill(32);

	const getColPositions = (rows: any[][]) => {
		const positions: number[][] = [];
		for (let i = 0; i < rows.length; i++) {
			let col = 0;
			positions[i] = [];
			for (let j = 0; j < rows[i].length; j++) {
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

	const defaultWidth = "100px";

	return (
		<TableContainer
			component={Paper}
			sx={{
				height: "100%",
				overflow: "auto",
				boxShadow: "0px 10px 30px rgba(0,0,0,0.05)",
				borderRadius: "16px",
				backgroundColor: currentTheme.backgroundBase,
				fontFamily:
					"-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif",
			}}
		>
			<Table>
				<TableHead>
					{headerRows.map((row, rowIndex) => (
						<TableRow key={rowIndex}>
							{row.map((cell: any, cellIndex: number) => (
								<TableCell
									key={cellIndex}
									colSpan={cell.colSpan}
									rowSpan={cell.rowSpan}
									sx={{
										position: "sticky",
										top: `${getCellTop(rowIndex, cellIndex)}px`,
										zIndex: 100 + rowIndex,
										backgroundColor: currentTheme.tableHeader,
										color: currentTheme.text,
										fontWeight: 600,
										textAlign: "center",
										fontSize: "13px",
										padding: "10px 8px",
										borderBottom: `1px solid ${theme === 'light' ? '#94a3b8' : currentTheme.borderColor}`,
										borderRight: `1px solid ${theme === 'light' ? '#94a3b8' : currentTheme.borderColor}`,
										minWidth: columnWidths[cell.value] || defaultWidth,
										maxWidth: columnWidths[cell.value] || defaultWidth,
									}}
								>
									{cell.value}
								</TableCell>
							))}
						</TableRow>
					))}
				</TableHead>
				<TableBody>
					{data.map((row, rowIndex) => (
						<TableRow
							key={`main-${rowIndex}`}
							sx={{
								"&:hover": {
									backgroundColor:
										theme === "dark" ? "#1e2126" : "#F9FAFB",
								},
							}}
						>
							{keys.map((key, colIndex) => (
								<TableCell
									key={colIndex}
									sx={{
										textAlign: columnAligns[key] || "right",
										fontSize: "13px",
										color: currentTheme.text,
										backgroundColor: currentTheme.background,
										padding: "10px 12px",
										borderBottom: `1px solid ${currentTheme.borderColor}`,
										borderRight: `1px solid ${currentTheme.borderColor}`,
										fontWeight: 400,
										minWidth: defaultWidth,
										maxWidth: defaultWidth,
									}}
								>
									{row[key]}
								</TableCell>
							))}
						</TableRow>
					))}
				</TableBody>
			</Table>
		</TableContainer>
	);
};

export default TrimestralTable;

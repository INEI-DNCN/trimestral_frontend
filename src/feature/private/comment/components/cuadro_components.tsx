import {
	Paper,
	Table,
	TableBody,
	TableCell,
	TableContainer,
	TableHead,
	TableRow,
} from "@mui/material";
import React, { useMemo } from "react";
import { useThemeContext } from "../../../../core/theme/ThemeContext";

interface DataRow {
	ccnnnom_cod: string;
	Descripción: string;
	[key: string]: string | number;
}

interface Props {
	data: DataRow[];
	columnWidths?: Record<string, number | string>;
	columnAligns?: Record<string, string>;
	countStartRow?: number;
	countMax?: number;
	structureHeadeJson?: any[];
}

interface HeaderCell {
	value: string;
	colSpan: number;
	rowSpan: number;
	color?: string;
}

const DEFAULT_COLUMN_WIDTH = "100px";

const CuadroComponents: React.FC<Props> = ({
	data,
	columnWidths = {},
	columnAligns = {},
	structureHeadeJson = [],
}) => {
	const { theme, themes } = useThemeContext();
	const currentTheme = themes[theme];
	const isDark = theme === "dark";
	const keys = useMemo(() => {
		if (!data.length) {
			return [];
		}

		const keySet = new Set<string>();

		data.forEach((item) => {
			Object.keys(item).forEach((key) => {
				keySet.add(key);
			});
		});

		return Array.from(keySet);
	}, [data]);

	const getColSpan = (node: any): number => {
		if (!node.children?.length) {
			return 1;
		}

		return node.children.reduce(
			(sum: number, child: any) =>
				sum + getColSpan(child),
			0
		);
	};

	const getMaxDepth = (nodes: any[]): number => {
		if (!nodes?.length) {
			return 0;
		}

		return (
			1 + Math.max(...nodes.map((node) =>
				getMaxDepth(node.children || [])
			)
			)
		);
	};

	const headerRows = useMemo(() => {
		if (!structureHeadeJson?.length) {
			return [];
		}

		const maxDepth = getMaxDepth(
			structureHeadeJson
		);

		const renderRows = (
			nodes: any[],
			depth = 0,
			rows: HeaderCell[][] = [],
			parentColor?: string
		): HeaderCell[][] => {
			rows[depth] = rows[depth] || [];

			nodes.forEach((node) => {
				const cellColor = node.color || parentColor;

				rows[depth].push({
					value: node.value,
					colSpan: getColSpan(node),
					rowSpan: node.children?.length
						? 1
						: maxDepth - depth,
					color: cellColor,
				});

				if (node.children?.length) {
					renderRows(
						node.children,
						depth + 1,
						rows,
						cellColor
					);
				}
			});
			return rows;
		};
		return renderRows(structureHeadeJson);

	}, [structureHeadeJson]);

	const tableBorder = isDark ? "rgba(255,255,255,0.06)" : "rgba(15,23,42,0.08)";
	const tableHeaderBackground = isDark ? "#252a31" : "#f1f5f9";
	const tableBodyBackground = isDark ? currentTheme.backgroundBase : "#ffffff";
	const tableHoverBackground = isDark ? "rgba(255,255,255,0.025)" : "rgba(15,23,42,0.025)";

	if (!data.length) { return null; }

	return (
		<TableContainer
			component={Paper}
			sx={{
				width: "100%",
				height: "auto",
				maxHeight: "none",
				overflowY: "visible",
				overflowX: "auto",
				boxShadow: "none",
				borderRadius: "12px",
				backgroundColor: tableBodyBackground,
				border: `1px solid ${tableBorder}`,
				"&::-webkit-scrollbar": { height: "7px" },
				"&::-webkit-scrollbar-track": { background: "transparent" },
				"&::-webkit-scrollbar-thumb": {
					backgroundColor: isDark
						? "rgba(255,255,255,0.16)"
						: "rgba(15,23,42,0.18)",
					borderRadius: "10px",
				},
				"&::-webkit-scrollbar-thumb:hover": {
					backgroundColor: isDark
						? "rgba(255,255,255,0.25)"
						: "rgba(15,23,42,0.28)",
				},
			}}
		>
			<Table
				sx={{ width: "100%", borderCollapse: "separate", borderSpacing: 0, minWidth: "max-content", }}>
				<TableHead>
					{headerRows.map(
						(row, rowIndex) => (
							<TableRow key={`header-row-${rowIndex}`} >
								{row.map(
									(cell, cellIndex) => {
										const width = columnWidths[cell.value] || DEFAULT_COLUMN_WIDTH;
										return (
											<TableCell
												key={`header-cell-${rowIndex}-${cellIndex}`}
												colSpan={cell.colSpan}
												rowSpan={cell.rowSpan}
												sx={{
													position: "relative",
													backgroundColor: tableHeaderBackground,
													color: currentTheme.text,
													fontWeight: rowIndex === 0 ? 700 : 600,
													textAlign: "center",
													fontSize: "12px",
													letterSpacing: rowIndex === 0 ? "0.1px" : "0",
													padding: rowIndex === 0 ? "9px 12px" : "8px 10px",
													minWidth: width,
													maxWidth: width,
													whiteSpace: "nowrap",
													borderBottom: `1px solid ${tableBorder}`,
													borderRight: `1px solid ${tableBorder}`,
													...(rowIndex ===
														0 && {
														backgroundColor: isDark ? "#20252b" : "#e9eef5",
													}),
												}}
											>
												{cell.value}
											</TableCell>
										);
									}
								)}
							</TableRow>
						)
					)}
				</TableHead>
				<TableBody>
					{data.map(
						(row, rowIndex) => (
							<TableRow
								key={`body-row-${rowIndex}`}
								sx={{
									backgroundColor: tableBodyBackground,
									transition: "background-color 0.15s ease",
									"&:hover": { backgroundColor: tableHoverBackground },
									"&:last-child td": { borderBottom: "none" },
								}}
							>
								{keys.map(
									(key, colIndex) => {
										const width = columnWidths[key] || DEFAULT_COLUMN_WIDTH;
										return (
											<TableCell
												key={`body-cell-${rowIndex}-${colIndex}`}
												sx={{
													minWidth: width,
													maxWidth: width,
													padding: "9px 12px",
													fontSize: "12px",
													lineHeight: 1.4,
													color: currentTheme.text,
													backgroundColor: "transparent",
													textAlign: columnAligns[key] || "right",
													fontWeight: colIndex === 0 ? 500 : 400,
													whiteSpace: colIndex === 0 ? "normal" : "nowrap",
													borderBottom: `1px solid ${tableBorder}`,
													borderRight: `1px solid ${tableBorder}`,
													...(colIndex === 0 && { textAlign: "left" }),
												}}
											>
												{row[key]}
											</TableCell>
										);
									}
								)}
							</TableRow>
						)
					)}
				</TableBody>
			</Table>
		</TableContainer>
	);
};

export default CuadroComponents;
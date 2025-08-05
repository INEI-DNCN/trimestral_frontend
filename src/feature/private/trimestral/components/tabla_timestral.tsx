import React from "react";
import { Table, TableBody, TableCell, TableContainer, TableRow, Paper, TableHead } from "@mui/material";

interface DataRow {
	ccnnnom_cod: string;
	Descripción: string;
	[key: string]: string | number;
}

interface Props {
	data: DataRow[];
}

const TablaTrimestral: React.FC<Props> = ({ data }) => {

	if (!data.length) return <p>No hay datos disponibles</p>;

	const keys = Object.keys(data[0]);

	return (
		<TableContainer component={Paper}
		sx={{
			height: "100%",
			overflow: "auto",
		}}
		>
			<Table>
				<TableHead
					sx={{
						position: "sticky",
						top: 0,
						backgroundColor: "#167595",
						zIndex: 1000,
					}}
				>
					<TableRow>
						{keys.map((key, index) => (
							<TableCell
								key={index}
								sx={{ backgroundColor: "#167595", color: "#fff", fontWeight: "bold", textAlign: "center" }}
							>
								{key}
							</TableCell>
						))}
					</TableRow>
				</TableHead>

				<TableBody>
				{data.map((row, rowIndex) => (
					<TableRow key={rowIndex}>

					{keys.map((key, colIndex) => (
						<TableCell
							key={colIndex}
							sx={{
								textAlign: "right",
								...(colIndex === 0 && {
									backgroundColor: "#789FB0",
									color: "#fff",
									fontWeight: "bold",
									textAlign: "left" // opcional, por si quieres alinear la primera a la izquierda
								}),
							}}
						>
						{row[key] as number}
						</TableCell>
					))}
					</TableRow>
				))}
				</TableBody>
			</Table>
		</TableContainer>
	);
};

export default TablaTrimestral;

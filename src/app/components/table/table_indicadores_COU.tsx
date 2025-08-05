import React from "react";
import { Table, TableCell, TableContainer, TableRow, TableHead } from "@mui/material";

interface DataRow {
	ccnnnom_cod: string;
	Descripción: string;
	[key: string]: string | number;
}

interface Props {
	data: DataRow[];
}

const TableIndicadoresCOU: React.FC<Props> = ({ data }) => {

	if (!data.length) return <p>No hay datos disponibles</p>;


	const style = {
		backgroundColor: "#FFD180",
		color: "#000",
		fontWeight: "bold",
		textAlign: "center",
		padding:"5px",
		fontSize: "10px",
		border: "0",
	}


	return (
		<TableContainer sx={{ height: "40px", width:"600px"}}>
			<Table>
				<TableHead sx={{ position: "sticky", top: 0, zIndex: 1000}}>
					<TableRow>
						<TableCell sx={{...style}} >{ data[0].ORD }. { data[0].Tipo } </TableCell>
						<TableCell sx={{...style, borderRight: "1px solid #fff"}} > { data[0].PBI } </TableCell>

						<TableCell sx={style} >{ data[1].ORD }. { data[1].Tipo } </TableCell>
						<TableCell sx={{...style, borderRight: "1px solid #fff"}} > {data[1].PBI} </TableCell>

						<TableCell sx={style} >{ data[2].ORD }. { data[2].Tipo }</TableCell>
						<TableCell sx={style} > {data[2].PBI} </TableCell>
					</TableRow>
				</TableHead>
			</Table>
		</TableContainer>
	);
};

export default TableIndicadoresCOU;

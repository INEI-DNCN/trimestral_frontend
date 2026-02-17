import type { JSX } from "react";
import { FaRegFile } from "react-icons/fa6";
import { HiDownload } from "react-icons/hi";
import { styled } from "styled-components";
import { CardUI } from "../../../../app/components/card/card";
import { Row } from "../../../../core/styled_ui/styled_ui";
import { useThemeContext } from "../../../../core/theme/ThemeContext";

interface Props {
	year: string;
	quarter: string;
	themes: any;
	data: any
}


export const FileDownloadLink = styled.a<{ $color: string }>`
	width: 34px;
	height: 34px;
	display: flex;
	align-items: center;
	justify-content: center;
	border-radius: 10px;
	font-size: 1rem;
	font-weight: 500;
	color: ${({ $color }) => $color + "cc"};
	text-decoration: none;
	transition: background 0.2s ease-in-out, transform 0.15s ease-in-out;

	&:hover {
		transform: scale(1.05);
		color: #3b82f6 ;
	}
`;


export const TrimestralCard: React.FC<Props> = ({ year, quarter, data }) => {


	const getFileIcon = (filename: string): JSX.Element => {
		const extension = filename.split('.').pop()?.toLowerCase();

		switch (extension) {
			case 'xls':
			case 'xlsx':
			case 'xlsm':
				return <FaRegFile size={20} style={{ color: "#22c55e" }} />;
			case 'doc':
			case 'docx':
				return <FaRegFile size={20} style={{ color: "#3b82f6" }} />;
			default:
				return <FaRegFile size={20} style={{ color: "#6b7280" }} />; // gris genérico
		}
	};

	const limpiarNombreArchivo = (nombreArchivo: string): string => {
		// Elimina desde el punto hacia el final
		const sinExtension = nombreArchivo.split('.')[0];
		// Reemplaza _ por espacio
		return sinExtension.replace(/_/g, ' ');
	};

	const { theme, themes } = useThemeContext();

	return (
		<CardUI children={
			<Row justifyContent="space-between" alignItems="center">
				<Row >
					{getFileIcon(data.tipo)}
					<div style={{ fontSize: '0.8rem', color: themes[theme].text }}>
						{limpiarNombreArchivo(data.nombre)}
					</div>
				</Row>
				<FileDownloadLink
					$color={themes[theme].text}
					href={`http://192.168.201.212:8080/${year + "_" + quarter}/Informatico/1.Informe_Tecnico/${data.nombre}`}
					rel="noopener noreferrer"
				>
					<HiDownload style={{ fontSize: 20 }} />
				</FileDownloadLink>
			</Row>
		} />
	);
};
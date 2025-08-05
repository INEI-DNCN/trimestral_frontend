import type { JSX } from "react";
import { FaFileAlt, FaFileExcel, FaFileWord } from "react-icons/fa";
import { HiDownload } from "react-icons/hi";
import { styled } from "styled-components";
import { Column, Row } from "../../../../../app/style_components/witgets_style_components";
import { useThemeContext } from "../../../../../core/theme/ThemeContext";

interface Props {
	year: string;
	quarter: string;
	themes: any;
	data: any
}


const FileDownloadLink = styled.a`
	width: 30px;
	height: 30px;
	display: flex;
	align-items: center;
	justify-content: center;
	background: #167595;
	color: #fff;
	border-radius: 8px;
	font-weight: 500;
	text-decoration: none;
	transition: background 0.2s;
	font-size: 0.98rem;
	box-shadow: 0 2px 8px #16759522;
	&:hover {
		background: #0d4f73;
		color: #fff;
	}
	white-space: nowrap;
`;


export const CardSection: React.FC<Props> = ({ year, quarter, data }) => {


	const getFileIcon = (filename: string): JSX.Element => {
		const extension = filename.split('.').pop()?.toLowerCase();

		switch (extension) {
			case 'xls':
			case 'xlsx':
			case 'xlsm':
				return <FaFileExcel size={20} style={{ color: "#22c55e" }} />;
			case 'doc':
			case 'docx':
				return <FaFileWord size={20} style={{ color: "#3b82f6" }} />;
			default:
				return <FaFileAlt size={20} style={{ color: "#6b7280" }} />; // gris genérico
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
		<StyledCard
			$bgColor={themes[theme].background}
		>
			<Row justifyContent="space-between">
				<Column>
					<Row >
						{getFileIcon(data.tipo)}
						<div style={{
							fontSize: '0.8rem',
							fontWeight: '700',
							color: themes[theme].text
						}}>
							{limpiarNombreArchivo(data.nombre)}
						</div>
					</Row>
				</Column>
				<FileDownloadLink
					href={`http://192.168.201.212:8080/${year + "_" + quarter}/Informatico/1.Informe_Tecnico/${data.nombre}`}
					target="_blank"
					rel="noopener noreferrer"
				>
					<HiDownload style={{ fontSize: 20 }} />
				</FileDownloadLink>
			</Row>
		</StyledCard>
	);
};

const StyledCard = styled.div<{ $bgColor: string }>`
	background: ${(props) => props.$bgColor};
	border-radius: 12px;
	padding: 16px;
	box-shadow: 0 4px 10px rgba(0, 0, 0, 0.05);
	border: 1px solid rgba(0, 0, 0, 0.05);
	transition: all 0.2s ease;

	&:hover {
		box-shadow: 0 12px 24px rgba(0, 0, 0, 0.08);
		transform: translateY(-2px);
		border-color: rgba(0, 0, 0, 0.08);
	}
`;
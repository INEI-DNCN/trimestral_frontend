import { styled } from "styled-components";
import { Column } from "../../../../app/style_components/witgets_style_components";
import { useThemeContext } from "../../../../core/theme/ThemeContext";
import { CardSection } from "../components/card/card";
interface Props {
	year: string;
	quarter: string;
	metadataArchivos: any;
}

export const SectionRinght: React.FC<Props> = ({ year, quarter, metadataArchivos }) => {
	const { theme, themes } = useThemeContext();

	interface InfoMessageProps {
		tipo: 'excel' | 'word' | 'otro';
	}

	const InfoMessage = styled.div<InfoMessageProps>`
		color: ${({ tipo }) =>
			tipo === 'excel' ? '#2e7d32' :
				tipo === 'word' ? '#1565c0' :
					'#6a1b9a'};

		padding: 5px 18px;
		font-weight: 600;
		font-size: 0.8rem;
		display: inline-block;
		/* box-shadow: 0 2px 6px rgba(0, 0, 0, 0.1); */
	`;

	const FechaInfo = styled.div`
		font-weight: 400;
		font-size: 0.75rem;
		margin-top: 4px;
	`;

	function formatearFecha(fechaISO: string): string {
		const fecha = new Date(fechaISO);

		const dia = fecha.getDate().toString().padStart(2, '0');
		const mes = (fecha.getMonth() + 1).toString().padStart(2, '0');
		const anio = fecha.getFullYear();

		let horas = fecha.getHours();
		const minutos = fecha.getMinutes().toString().padStart(2, '0');
		const ampm = horas >= 12 ? 'pm' : 'am';
		horas = horas % 12;
		horas = horas ? horas : 12; // el 0 se convierte en 12

		return `${dia}/${mes}/${anio} ${horas}:${minutos} ${ampm}`;
	}

	return (
		<Column style={{
			height: "100%",
		}}>
			<InfoMessage tipo="excel">Archivos Excel actualizados:
				<FechaInfo >
					{formatearFecha(metadataArchivos.find((data: any) => data.tipo === "xlsm")?.ultima_actualizacion)}
				</FechaInfo>
			</InfoMessage>
			{metadataArchivos
				.filter((data: any) => data.tipo === "xlsm")
				.map((data: any, index: any) => (
					<CardSection
						key={index}
						year={year}
						quarter={quarter}
						themes={themes[theme]}
						data={data}
					/>
				))}
			<InfoMessage tipo="word">Archivos Word Actualizados:
				<FechaInfo >
					{formatearFecha(metadataArchivos.find((data: any) => data.tipo === "docx")?.ultima_actualizacion)}
				</FechaInfo>
			</InfoMessage>
			{metadataArchivos
				.filter((data: any) => data.tipo === "docx")
				.map((data: any, index: any) => (
					<CardSection
						key={index}
						year={year}
						quarter={quarter}
						themes={themes[theme]}
						data={data}
					/>
				))}
		</Column>
	);
};

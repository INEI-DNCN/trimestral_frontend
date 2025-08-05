import { useState } from "react";
import { FaPython } from "react-icons/fa6";
import { useDispatch } from "react-redux";
import { styled } from "styled-components";
import ButtonAction from "../../../../app/components/bottons/button_action";
import { StateMessage } from "../../../../app/components/enum/enum";
import type { PageProps } from "../../../../app/components/interface/router_interface";
import { Column, Row } from "../../../../app/style_components/witgets_style_components";
import { useThemeContext } from "../../../../core/theme/ThemeContext";
import { CardSection } from "../components/card/card";
import DialogLoading from "../components/dialog_loading";
import { getIndicadoresSource, getMetadatosArchivosSource, ProcessDocumentSource, UpdateDocumentsSource } from "../Trimestral_source";
interface Props {
	year: string;
	quarter: string;
	metadataArchivos: any;
	hoja: any
	pageProps: PageProps
}

export const SectionRinght: React.FC<Props> = ({ year, quarter, metadataArchivos, hoja, pageProps }) => {
	const { theme, themes } = useThemeContext();
	const [openDialogLoading, setOpenDialogLoading] = useState(false);
	const dispatch: any = useDispatch()

	interface InfoMessageProps {
		tipo: 'excel' | 'word' | 'otro';
	}

	const FechaInfo = styled.div<InfoMessageProps>`
		color: ${({ tipo }) =>
			tipo === 'excel' ? '#2e7d32' :
				tipo === 'word' ? '#1565c0' :
					'#6a1b9a'};
			font-weight: 400;
			font-size: 0.75rem;
			margin-bottom: 4px;
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

	const procesar = async (fn: () => Promise<any>) => {
		try {
			console.log('Ingrese')
			setOpenDialogLoading(true)
			const response = await fn();
			pageProps.onSnackbar(response.data, StateMessage.success)
			dispatch(getIndicadoresSource(2025, "II", hoja));
			dispatch(getMetadatosArchivosSource());
			setOpenDialogLoading(false)
		} catch (error: any) {
			pageProps.onSnackbar(error.response.data, StateMessage.warning)
			console.error("Error al procesar", error);
			setOpenDialogLoading(false)
		}
	};

	return (
		<Column style={{
			height: "100%",
		}}>
			<Column>
				<ButtonAction
					backgroundColor="#27ae60"
					children={
						<Row alignItems='center'>
							<FaPython style={{ fontSize: "18px" }} />
							<div>Actualizar Excel</div>
						</Row>
					}
					onClick={() => procesar(UpdateDocumentsSource)}
				/>
				<FechaInfo tipo="excel">
					{formatearFecha(metadataArchivos.find((data: any) => data.tipo === "xlsm")?.ultima_actualizacion)}
				</FechaInfo>
			</Column>
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
			<Column>
				<ButtonAction
					backgroundColor="#2f80ed"
					children={
						<Row alignItems='center'>
							<FaPython style={{ fontSize: "18px" }} />
							<div>Actualizar Word</div>
						</Row>
					}
					onClick={() => procesar(ProcessDocumentSource)}
				/>
				<FechaInfo tipo="word">
					{formatearFecha(metadataArchivos.find((data: any) => data.tipo === "docx")?.ultima_actualizacion)}
				</FechaInfo >
			</Column>
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
			<DialogLoading open={openDialogLoading} />
		</Column>

	);
};

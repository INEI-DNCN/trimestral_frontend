import { FaPython } from "react-icons/fa6";
import { useDispatch } from "react-redux";
import { styled } from "styled-components";
import ButtonAction from "../../../../app/components/bottons/button_action";
import { DialogAction, StateMessage } from "../../../../app/components/enum/enum";
import type { PageProps } from "../../../../app/components/interface/router_interface";
import WrapperLoading from "../../../../app/components/wrapper_loading";
import { Column, Row } from "../../../../app/style_components/witgets_style_components";
import { useThemeContext } from "../../../../core/theme/ThemeContext";
import { getIndicadoresSource, getMetadatosArchivosSource, ProcessDocumentSource, UpdateDocumentsSource } from "../Trimestral_source";
import { TrimestralCard } from "../components/trimestral_card";
interface Props {
	year: string;
	quarter: string;
	metadataArchivos: any;
	hoja: any
	pageProps: PageProps
}

export const SectionRinght: React.FC<Props> = ({ year, quarter, metadataArchivos, hoja, pageProps }) => {
	const { theme, themes } = useThemeContext();
	const dispatch: any = useDispatch()

	interface InfoMessageProps {
		tipo: 'excel' | 'word' | 'otro';
	}

	function getColorByType(type: string): string {
		switch (type.toLowerCase()) {
			case "word":
				return "#2f80ed";
			case "excel":
				return "#27ae60";
			default:
				return "#6B7280";
		}
	}

	const FechaInfo = styled.div<InfoMessageProps>`
		color: ${({ tipo }) => getColorByType(tipo)};
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

	const procesar = async (fn: () => Promise<any>, tipo: 'Word' | 'Excel') => {
		try {

			pageProps.onDialog({ children: <WrapperLoading color={getColorByType(tipo)} text={"Actualizando " + tipo} />, maxWidth: "sm", title: DialogAction.loadin });
			const response = await fn();
			pageProps.onSnackbar(response.data, StateMessage.success)
			dispatch(getIndicadoresSource(2025, "II", hoja));
			dispatch(getMetadatosArchivosSource());
			pageProps.handleCloseDialog()
		} catch (error: any) {
			pageProps.onSnackbar(error.response.data, StateMessage.warning)
			pageProps.handleCloseDialog()
		}
	};

	return (
		<Column style={{ height: "100%" }}>
			<Column>
				<ButtonAction
					backgroundColor={getColorByType('excel')}
					children={
						<Row alignItems='center'>
							<FaPython style={{ fontSize: "18px" }} />
							<div>Actualizar Excel</div>
						</Row>
					}
					onClick={() => procesar(UpdateDocumentsSource, "Excel")}
				/>
				<FechaInfo tipo="excel">
					{formatearFecha(metadataArchivos.find((data: any) => data.tipo === "xlsm")?.ultima_actualizacion)}
				</FechaInfo>
			</Column>
			{metadataArchivos
				.filter((data: any) => data.tipo === "xlsm")
				.map((data: any, index: any) => (
					<TrimestralCard
						key={index}
						year={year}
						quarter={quarter}
						themes={themes[theme]}
						data={data}
					/>
				))}
			<Column>
				<ButtonAction
					backgroundColor={getColorByType('word')}
					children={
						<Row alignItems='center'>
							<FaPython style={{ fontSize: "18px" }} />
							<div>Actualizar Word</div>
						</Row>
					}
					onClick={() => procesar(ProcessDocumentSource, "Word")}
				/>
				<FechaInfo tipo="word">
					{formatearFecha(metadataArchivos.find((data: any) => data.tipo === "docx")?.ultima_actualizacion)}
				</FechaInfo >
			</Column>
			{metadataArchivos
				.filter((data: any) => data.tipo === "docx")
				.map((data: any, index: any) => (
					<TrimestralCard
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

import { FaPython } from "react-icons/fa6";
import { useSelector } from "react-redux";
import { styled } from "styled-components";
import ButtonAction from "../../../../app/components/bottons/button_action";
import { DialogAction, StateMessage } from "../../../../app/components/enum/enum";
import type { PageProps } from "../../../../app/components/interface/router_interface";
import WrapperLoading from "../../../../app/components/wrapper_loading";
import type { RootState } from "../../../../core/store/store";
import { Column, Row } from "../../../../core/styled_ui/styled_ui";
import { useThemeContext } from "../../../../core/theme/ThemeContext";
import { useUI } from "../../../../core/theme/ui_context";
import { getIndicadoresSource, getMetadatosArchivosSource, ProcessDocumentSource, UpdateDocumentsSource } from "../Trimestral_source";
import { TrimestralCard } from "../components/trimestral_card";
interface Props {
	year: string;
	quarter: string;
	metadataArchivos: any;
	hoja: any
	pageProps: PageProps
}

export const SectionRinght: React.FC<Props> = ({ year, quarter, metadataArchivos, hoja }) => {
	const { theme, themes } = useThemeContext();
	const { dispatch, onSnackbar, onDialog, handleCloseDialog } = useUI()

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
		horas = horas ? horas : 12;

		return `${dia}/${mes}/${anio} ${horas}:${minutos} ${ampm}`;
	}

	const { employee } = useSelector((state: RootState) => state.perfil)

	const procesar = async (fn: () => Promise<any>, tipo: 'Word' | 'Excel') => {
		try {

			onDialog({ children: <WrapperLoading color={getColorByType(tipo)} text={"Actualizando " + tipo} />, maxWidth: "sm", title: DialogAction.loadin });
			const response = await fn();
			onSnackbar(response.data, StateMessage.success)
			dispatch(getIndicadoresSource(2025, "II", hoja));
			dispatch(getMetadatosArchivosSource());
			handleCloseDialog()
		} catch (error: any) {
			onSnackbar(error.response.data, StateMessage.warning)
			handleCloseDialog()
		}
	};

	return (
		<Column style={{ height: "100%" }}>
			<Column>
				{['Modificar', 'Control total'].includes(employee.role.name) && (
					<ButtonAction
						backgroundColor={getColorByType('excel')}
						onClick={() => procesar(UpdateDocumentsSource, "Excel")}
					>
						<Row alignItems="center">
							<FaPython style={{ fontSize: "18px" }} />
							<div>Actualizar Excel</div>
						</Row>
					</ButtonAction>
				)}
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
				{['Modificar', 'Control total'].includes(employee.role.name) && (
					<ButtonAction
						backgroundColor={getColorByType('word')}
						onClick={() => procesar(ProcessDocumentSource, "Word")}
					>
						<Row alignItems="center">
							<FaPython style={{ fontSize: "18px" }} />
							<div>Actualizar Word</div>
						</Row>
					</ButtonAction>
				)}

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

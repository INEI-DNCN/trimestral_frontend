import { useState } from "react";
import { FaPython } from "react-icons/fa6";
import { useDispatch } from "react-redux";
import { styled } from "styled-components";
import { getIndicadoresSource, getMetadatosArchivosSource, ProcessDocumentSource, UpdateDocumentsSource } from "../Trimestral_source";

import { StateMessage } from "../../../../app/components/enum/enum";
import { Row } from "../../../../app/style_components/witgets_style_components";
import { useThemeContext } from "../../../../core/theme/ThemeContext";
import Button2 from "../components/button/button2";
import DialogLoading from "../components/dialog_loading";


interface Props {
	onSnackbar: any
	hoja: any
}

export const HeaderTrimestral: React.FC<Props> = ({ onSnackbar, hoja }) => {
	const { theme, themes } = useThemeContext();
	const dispatch: any = useDispatch()
	const [openDialogLoading, setOpenDialogLoading] = useState(false);

	const procesar = async (fn: () => Promise<any>) => {
		try {
			console.log('Ingrese')
			setOpenDialogLoading(true)
			const response = await fn();
			console.log(response)
			onSnackbar(response.data, StateMessage.success)
			dispatch(getIndicadoresSource(2025, "II", hoja));
			dispatch(getMetadatosArchivosSource());
			setOpenDialogLoading(false)
		} catch (error: any) {
			onSnackbar(error.response.data, StateMessage.warning)
			console.error("Error al procesar", error);
			setOpenDialogLoading(false)
		}
	};

	return (
		<>
			<HeaderGeneral
				$bgColor={themes[theme].background}
				$borderColor={themes[theme].text}
			>
				<HeaderContent>
					<HeaderTitle $titleColor={themes[theme].text}>
						<Row>
							<h3>Producto Bruto Interno</h3>
							<div style={{ width: "50px" }} />
							<Button2
								title="Actualizar Excel"
								icon={<FaPython />}
								toolcolor="#27ae60"
								bordercolor="#27ae60"
								bgcolor={themes[theme].background}
								onClick={() =>
									procesar(UpdateDocumentsSource)}
							/>
							<Button2
								title="Actualizar Word"
								icon={<FaPython />}
								toolcolor="#2f80ed"
								bordercolor="#2f80ed"
								bgcolor={themes[theme].background}
								onClick={() => procesar(ProcessDocumentSource)}
							/>
						</Row>
						<h4>Trimestral 2025 - II</h4>
					</HeaderTitle>
				</HeaderContent>
				<HeaderFlotantes>
					<FlotanteItem
						className="slide-in-right"
						$borderColor={themes.colors.primary}
						$bgcolor={themes[theme].background}
						$width="150px"
						$textColor={themes[theme].text}
					>
						Informe
					</FlotanteItem>
					<FlotanteItem
						className="slide-in-right2"
						$borderColor={themes[theme].text}
						$bgcolor={themes[theme].background}
						$width="120px"
						$textColor={themes[theme].text}
					>
						Tecnico
					</FlotanteItem>
				</HeaderFlotantes>
			</HeaderGeneral>
			<DialogLoading open={openDialogLoading} />
		</>
	);
};


const HeaderGeneral = styled.header<{ $bgColor: string; $borderColor: string }>`
	width: 100%;
	background: ${(props) => props.$bgColor};
	border-bottom: 6px solid ${(props) => props.$borderColor};
	box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.1);
	position: relative;
	color: #494949;
	display: flex;
	flex-direction: column;
	align-items: flex-start;


	.slide-in-right {
		-webkit-animation: slide-in-right 0.5s cubic-bezier(0.250, 0.460, 0.450, 0.940) both;
		animation: slide-in-right 0.5s cubic-bezier(0.250, 0.460, 0.450, 0.940) both;
	}

	.slide-in-right2 {
		-webkit-animation: slide-in-right 1s cubic-bezier(0.250, 0.460, 0.450, 0.940) both;
		animation: slide-in-right 1s cubic-bezier(0.250, 0.460, 0.450, 0.940) both;
	}

	@-webkit-keyframes slide-in-right {
	0% {
		-webkit-transform: translateX(1000px);
				transform: translateX(1000px);
		opacity: 0;
	}
	100% {
		-webkit-transform: translateX(0);
				transform: translateX(0);
		opacity: 1;
	}
	}
	@keyframes slide-in-right {
	0% {
		-webkit-transform: translateX(1000px);
				transform: translateX(1000px);
		opacity: 0;
	}
	100% {
		-webkit-transform: translateX(0);
				transform: translateX(0);
		opacity: 1;
	}
	}

`;

const HeaderContent = styled.div`
	max-width: 1200px;
	width: 100%;
	padding: 10px 50px;
`;

const HeaderTitle = styled.section<{ $titleColor: string }>`
	border-left: 6px solid #167595;
	padding: 10px 20px;
	margin-top: 10px;

	h3 {
		font-size: 22px;
		font-weight: bold;
		margin: 0;
		color: ${(props) => props.$titleColor};
	}

	h4 {
		font-size: 16px;
		font-weight: 400;
		margin: 5px 0 0;
		color: ${(props) => props.$titleColor};
	}
`;

const HeaderFlotantes = styled.div`
	position: absolute;
	bottom: -23px;
	right: 0;
	display: flex;
	flex-direction: column;
	align-items: end;
	gap: 5px;
`;

interface FlotanteItemProps {
	$bgcolor: string;
	$width: string;
	$borderColor: string;
	$textColor: string;
}

const FlotanteItem = styled.div<FlotanteItemProps>`
	border: 3px solid ${(props) => props.$borderColor};
	border-right: 0px;
	background-color: ${(props) => props.$bgcolor};
	color: ${(props) => props.$textColor};
	font-weight: bold;
	width: ${(props) => props.$width || '200px'};
	text-align: center;
	padding: 5px 15px;
	border-radius: 50px 0px 0px 50px;
	box-shadow: 2px 2px 8px rgba(0, 0, 0, 0.15);
`;

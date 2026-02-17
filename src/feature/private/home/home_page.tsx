
import { Typography } from '@mui/material';
import { useLayoutEffect, useState } from 'react';
import { FaArrowsSpin, FaFileContract, FaWandMagicSparkles } from 'react-icons/fa6';
import { useSelector } from 'react-redux';
import styled from 'styled-components';
import ButtonAction from '../../../app/components/bottons/button_action';
import { CardUI } from '../../../app/components/card/card';
import { DialogAction, StateMessage } from '../../../app/components/enum/enum';
import Header from '../../../app/components/header';
import type { PageProps } from '../../../app/components/interface/router_interface';
import WrapperLoading from '../../../app/components/wrapper_loading';
import { Column, Container, Row } from '../../../core/styled_ui/styled_ui';
import { useThemeContext } from '../../../core/theme/ThemeContext';
import { useUI } from '../../../core/theme/ui_context';
import { PerfilDropdown } from '../../perfil/components/perfil_dropdown';
import { TrimestralCard } from './components/trimestral_card';
import { getFechasActualizacionSource, getMetadatosArchivosSource, ProcessDocumentSource, UpdateDocumentsSource } from './home_source';


const HomePage: React.FC<PageProps> = () => {

	const [anio, __] = useState<any>(2025);
	const [quarter, _] = useState<any>("IV");
	const { dispatch, onSnackbar, onDialog, handleCloseDialog } = useUI()

	const { theme, themes } = useThemeContext();

	const { metadataArchivos, fechasActualizacion } = useSelector((state: any) => state.home)

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


	useLayoutEffect(() => {
		dispatch(getMetadatosArchivosSource());
		dispatch(getFechasActualizacionSource(anio, quarter));
	}, []);

	const esHoy = (fecha: string) => {
		const hoy = new Date();
		const f = new Date(fecha);

		return (
			hoy.getDate() === f.getDate() &&
			hoy.getMonth() === f.getMonth() &&
			hoy.getFullYear() === f.getFullYear()
		);
	};





	const procesar = async (fn: () => Promise<any>, tipo: 'Word' | 'Excel') => {
		try {
			onDialog({ children: <WrapperLoading color={getColorByType(tipo)} text={"Actualizando " + tipo} />, maxWidth: "sm", title: DialogAction.loadin });
			const response = await fn();
			onSnackbar(response.data, StateMessage.success)
			dispatch(getMetadatosArchivosSource());
			handleCloseDialog()
		} catch (error: any) {
			onSnackbar(error.response.data, StateMessage.warning)
			handleCloseDialog()
		}
	};

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

	return (
		<Container>
			<Column alignItems='center'>
				<Row style={{ width: '85%', marginBottom: '1rem', justifyContent: 'space-between', alignItems: 'center' }}>
					<Header
						title={"Home / Consola de Gestión"}
						subtitle={'Consolidación de cuadros Excel y comentarios por actividad económica.'}
					/>
					<PerfilDropdown />
				</Row>
				<Row style={{ width: '85%', height: '100%', gap: '20px' }}>
					<section style={{
						width: '60%',
						height: 'calc(100vh - 100px)',
						overflow: 'hidden',
					}}
					>
						<Column>
							<CardUI >
								<Row alignItems='center' justifyContent='space-between' style={{ marginBottom: "15px" }}>
									<Column>
										<Typography
											variant="h5"
											sx={{ fontWeight: 400, color: themes[theme].text, mb: 0.25 }}
										>
											Acciones de Control
										</Typography>
										<Typography
											variant="body2"
											sx={{ color: "#ccc", fontSize: "0.8rem" }}
										>Actualiza los datos fuente y genera el documento final consolidado.</Typography>
									</Column>
									<Column>
										<ButtonAction
											backgroundColor={getColorByType('excel')}
											onClick={() => procesar(UpdateDocumentsSource, "Excel")}
										>
											<Row alignItems="center">
												<FaArrowsSpin style={{ fontSize: "18px" }} />
												<div>Sincronizar Archivos consolidados</div>
											</Row>
										</ButtonAction>
										<ButtonAction
											backgroundColor={getColorByType('word')}
											onClick={() => procesar(ProcessDocumentSource, "Word")}
										>
											<Row alignItems="center">
												<FaWandMagicSparkles style={{ fontSize: "18px" }} />
												<div>Generar Documento</div>
											</Row>
										</ButtonAction>
									</Column>
								</Row>
							</CardUI>
							<CardUI >
								<Row alignItems='center' justifyContent='space-between' style={{ marginBottom: "15px" }}>
									<Column>
										<Typography
											variant="h5"
											sx={{ fontWeight: 400, color: themes[theme].text, mb: 0.25 }}
										>
											Informe Tecnico
										</Typography>
										<Typography
											variant="body2"
											sx={{ color: "#ccc", fontSize: "0.8rem" }}
										>Documento que consolida los comentarios, cuadros y gráficos correspondientes a los archivos Anexo 1-3, Anexo 4-22, Cuadros Demanda, Cuadros Desesta Ratios y Cuadros Oferta, presentado de forma estructurada para su difusión.</Typography>
										<Typography
											variant="body2"
											sx={{ color: "#ccc", fontSize: "0.8rem" }}
										>Documento actualizado al {formatearFecha(metadataArchivos.find((data: any) => data.tipo === "docx")?.ultima_actualizacion)}</Typography>
									</Column>
									<Column>
										{metadataArchivos
											.filter((data: any) => data.tipo === "docx")
											.map((data: any, index: any) => (
												<FileDownloadLink
													key={index}
													$color={themes[theme].text}
													href={`http://192.168.201.212:8080/${anio + "_" + quarter}/Informatico/1.Informe_Tecnico/${data.nombre}`}
													rel="noopener noreferrer"
												>
													<Column>
														<FaFileContract style={{ fontSize: 60 }} />
														<Typography
															variant="body2"
															sx={{ color: "#ccc", fontSize: "0.8rem" }}
														>Descargar</Typography>
													</Column>
												</FileDownloadLink>
											))}
									</Column>
								</Row>
							</CardUI>
							<CardUI >
								<Column>
									<Typography
										variant="h5"
										sx={{ fontWeight: 400, color: themes[theme].text, mb: 0.25 }}
									>
										Comentarios por Actividad
									</Typography>
									<Typography
										variant="body2"
										sx={{ color: "#ccc", fontSize: "0.8rem" }}
									>
										Registro cronológico de actualizaciones por rubro.
									</Typography>

									<div style={{
										maxHeight: 400,
										overflowY: "auto",
										paddingRight: 6
									}}>
										{fechasActualizacion.map((item: any, index: number) => {
											const hoy = esHoy(item.fecha_actualizacion);

											return (
												<Row
													key={index}
													justifyContent="space-between"
													alignItems="center"
													py={1}
												>


													{/* NOMBRE + PUNTO */}
													<Row alignItems="center" gap="6px">
														<span
															style={{
																width: 6,
																height: 6,
																borderRadius: "50%",
																background: hoy ? "#22c55e" : "#6b7280",
																display: "inline-block"
															}}
														/>

														<span style={{ fontSize: "0.9rem" }}>
															{item.nombre}
														</span>
													</Row>

													{/* FECHA */}
													<span
														style={{
															color: hoy ? "#22c55e" : "#9ca3af",
															fontSize: "0.8rem",
															minWidth: 130
														}}
													>
														{new Date(item.fecha_actualizacion).toLocaleDateString()}
													</span>
												</Row>
											);
										})}
									</div>
								</Column>

							</CardUI>
						</Column>
					</section>
					<section style={{
						width: '40%',
						height: 'calc(100vh - 100px)',
						overflow: 'hidden',
					}}
					>
						<Column>
							<Typography
								variant="h5"
								sx={{ fontWeight: 400, color: themes[theme].text, mb: 0.25 }}
							>
								Archivos consolidados
							</Typography>
							<Typography
								variant="body2"
								sx={{ color: "#ccc", fontSize: "0.8rem" }}
							>Archivos generados a partir de los documentos fuente, que contienen información procesada y organizada para su presentación.</Typography>
							<Typography
								variant="body2"
								sx={{ color: "#ccc", fontSize: "0.8rem" }}
							>Documento actualizado al {formatearFecha(metadataArchivos.find((data: any) => data.tipo === "xlsm")?.ultima_actualizacion)}</Typography>
							{metadataArchivos
								.filter((data: any) => data.tipo === "xlsm")
								.map((data: any, index: any) => (
									<TrimestralCard
										key={index}
										year={anio}
										quarter={quarter}
										themes={themes[theme]}
										data={data}
									/>
								))}
						</Column>
					</section>
				</Row>
			</Column>
		</Container>
	)
}
export default HomePage


export const FileDownloadLink = styled.a<{ $color: string }>`
	width: 100px;
	height: 100px;
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

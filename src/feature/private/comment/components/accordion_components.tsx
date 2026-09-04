import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { Box, Typography } from '@mui/material';
import Accordion from '@mui/material/Accordion';
import AccordionDetails from '@mui/material/AccordionDetails';
import AccordionSummary from '@mui/material/AccordionSummary';
import { History } from 'lucide-react';
import * as React from 'react';
import { useForm } from 'react-hook-form';
import { useSelector } from 'react-redux';
import { DialogAction, StateMessage } from '../../../../app/components/enum/enum';
import HighlightEditor from '../../../../app/components/highlightEditor';
import SelectField from '../../../../app/components/select/select_field';
import { formatItem, getEstadoConfig } from '../../../../app/utils/util';
import { getAccordionStyles, getAccordionSummaryStyles, getbuttonHistorialStyles, getSectionDescriptionSxStyles, getSectionTitleSx, sectionBorder, sectionHeaderSx } from '../../../../app/utils/util_mui';
import { formatFechaAmPm } from '../../../../app/utils/utils_date';
import type { RootState } from '../../../../core/store/store';
import { Column } from '../../../../core/styled_ui/styled_ui';
import { useThemeContext } from '../../../../core/theme/ThemeContext';
import { useUI } from '../../../../core/theme/ui_context';
import type { comentario, comentarioEstado } from '../comment_slice';
import { getComentarioHistoricoSource, getComentarioSource, puedeVisualizarComponente, putComentario } from '../comment_source';
import { TrimestralJson } from '../json/trimestral_json';
import CuadroComponents, { default as TrimestralTable } from './cuadro_components';
import HistorialComentario from './historial_components';

export default function AccordionComponents({ item }: { item: comentario }) {
	const id = React.useId();
	const { currentTheme } = useThemeContext();
	const { onSnackbar, dispatch, onDialog } = useUI();
	const { employee } = useSelector((state: RootState) => state.perfil);
	const { comentarioEstado } = useSelector((state: RootState) => state.comment);

	const { control, handleSubmit, formState: { errors }, } = useForm<{
		estado: string | null
	}>({
		defaultValues: { estado: item.estado_id?.toString() ?? null },
	});

	const handleActions = (action: DialogAction, items?: comentario) => {

		dispatch(getComentarioHistoricoSource(items?.id ?? 0));
		const dialogContentMap: Record<any, any> = {
			[DialogAction.historial]: <HistorialComentario />,
		};
		onDialog({ children: dialogContentMap[action], maxWidth: "md", title: action });
	};

	const onChangeComentario = async (
		contenido: any,
		comentario: any
	) => {
		try {
			const data: comentario = {
				...comentario,
				contenido,
			};

			await putComentario(employee, data, "CONTENIDO");
			dispatch(getComentarioSource('2026', 'II'));
			onSnackbar('Actualización completada exitosamente', StateMessage.success);

		} catch (error: any) {
			if (error.response?.status === 400) {
				onSnackbar(error.response.data.message, StateMessage.warning);
			} else {
				onSnackbar(error.response?.data?.message || 'Error desconocido', StateMessage.error);
			}
		}
	};

	const onSubmit = async (e: { estado: string | null }) => {

		if (!e.estado) return;
		const estadoId = Number(e.estado);
		const data: comentario = {
			...item,
			estado_id: estadoId,
		};

		try {
			await putComentario(employee, data, "ESTADO");
			dispatch(getComentarioSource('2026', 'II'));
			onSnackbar('Estado actualizado exitosamente', StateMessage.success);
		} catch (error: any) {
			if (error.response?.status === 400) {
				onSnackbar(error.response.data.message, StateMessage.warning);
			} else {
				onSnackbar(error.response?.data?.message || 'Error desconocido', StateMessage.error);
			}
		}
	};

	const estadoConfig = getEstadoConfig(item.estado);

	const puedeEditarComentario = puedeVisualizarComponente(
		employee?.role?.id ?? '',
		item.estado_id ?? 0
	);

	return (
		<Box sx={{ width: '100%' }}>
			<Accordion sx={getAccordionStyles(currentTheme)} >
				<AccordionSummary
					expandIcon={<ExpandMoreIcon sx={{ color: currentTheme.text }} />}
					sx={getAccordionSummaryStyles(currentTheme)}
					aria-controls={`${id}-panel1-content`}
					id={`${id}-panel1-header`}
				>
					<Typography component="span" sx={{ color: currentTheme.text, fontWeight: 600, fontSize: '15px', minWidth: 0, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis', paddingRight: '15px', }} >
						{item.titulo}
					</Typography>
					<Typography component="span" sx={{ color: currentTheme.text, opacity: 0.65, fontWeight: 400, fontSize: '13px', minWidth: 0, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis', paddingRight: '15px', }} >
						{item.ultima_actualizacion
							? `Actualizado por ${item.usuario_ultima_actualizacion ??
							'Sin usuario'
							} · ${formatFechaAmPm(
								item.ultima_actualizacion
							)}`
							: 'Sin actualización registrada'}
					</Typography>

					<Box sx={{ display: 'flex', alignItems: 'center', gap: '7px', minWidth: 0, whiteSpace: 'nowrap', overflow: 'hidden', color: estadoConfig.color, fontSize: '13px', fontWeight: 600, }} >
						{estadoConfig.icon}
						<Typography component="span" sx={{ color: 'inherit', fontSize: '13px', fontWeight: 600, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis', }} >
							Estado: {item.estado ?? 'Sin estado'}
						</Typography>
					</Box>
				</AccordionSummary>

				<AccordionDetails sx={{ backgroundColor: currentTheme.background, color: currentTheme.text, borderTop: `1px solid ${currentTheme.borderColor}`, padding: 0, }} >
					<Column gap="22px" width="100%" p={2.5} style={{ boxSizing: 'border-box' }} >
						{
							puedeEditarComentario
								? <Box sx={{ paddingBottom: '22px', borderBottom: sectionBorder }} >
									<Box sx={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '10px', }} >
										<Box sx={{ display: 'flex', alignItems: 'center', color: estadoConfig.color, }} >
											{estadoConfig.icon}
										</Box>
										<Typography sx={getSectionTitleSx(currentTheme)}>
											Estado del comentario
										</Typography>
									</Box>
									<Box sx={{ display: 'flex', alignItems: 'center', gap: '16px', width: '100%' }}>
										<Box sx={{ width: { xs: '100%', sm: '240px' }, flexShrink: 0 }}>
											<SelectField
												name="estado"
												label="Estado"
												control={control}
												options={comentarioEstado.map((estado: comentarioEstado) => ({
													value: estado.id?.toString() || '',
													label: estado.nombre,
												})
												)}
												error={errors.estado}
												onChange={() => handleSubmit(onSubmit)()}
											/>
										</Box>
										<Typography sx={{ display: { xs: 'none', sm: 'block' }, color: currentTheme.text, opacity: 0.65, fontSize: '13px', }}>
											{item.estado
												? comentarioEstado.find(
													(e: any) =>
														e.nombre?.toLowerCase() ===
														item.estado?.toLowerCase()
												)?.descripcion || ''
												: 'Selecciona el estado del comentario.'}
										</Typography>
									</Box>
								</Box>
								: null

						}

						<Box sx={{ borderBottom: sectionBorder }}>
							<Box sx={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', gap: '20px', marginBottom: '12px', }}>
								<Box>
									<Typography sx={getSectionTitleSx(currentTheme)}>
										Comentario
									</Typography>

									<Typography sx={getSectionDescriptionSxStyles(currentTheme)}>
										Texto del comentario para este trimestre.
									</Typography>
								</Box>

								<Box
									component="button"
									type="button"
									onClick={() => handleActions(DialogAction.historial, item)}
									sx={getbuttonHistorialStyles(currentTheme)}
								>
									<History size={15} />
									Ver historial
								</Box>
							</Box>
							<Box sx={{ width: '100%' }}>
								<HighlightEditor
									value={item.contenido || ''}
									onUpdate={(content) => onChangeComentario(content, item)}
									disabled={!puedeEditarComentario}
								/>
							</Box>
						</Box>

						<Column>
							<Box sx={sectionHeaderSx}>
								<Typography sx={getSectionTitleSx(currentTheme)}>
									Indicadores relacionados
								</Typography>

								<Typography sx={getSectionDescriptionSxStyles(currentTheme)}>
									Variación porcentual respecto al mismo
									periodo del año anterior.
								</Typography>
							</Box>

							<Box sx={{ width: '100%' }}>
								<CuadroComponents
									data={
										(item.indicadores || []).map((e: any) => formatItem({ originalItem: e, decimal: 1 })
										) as React.ComponentProps<typeof TrimestralTable>['data']
									}
									structureHeadeJson={TrimestralJson(
										item.anio ?? 0,
										item.trimestre ?? 0
									)}
									columnWidths={{ Actividad: '150px' }}
									columnAligns={{ Actividad: 'left' }}
								/>
							</Box>
						</Column>
					</Column>
				</AccordionDetails>
			</Accordion>
		</Box>
	);
}
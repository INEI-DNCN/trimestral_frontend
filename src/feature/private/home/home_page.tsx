import { Skeleton, Typography } from '@mui/material';
import { useEffect, useLayoutEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { FaArrowsSpin, FaFileWord, FaRegClock, FaWandMagicSparkles } from 'react-icons/fa6';
import { useSelector } from 'react-redux';
import styled from 'styled-components';
import { useForm, useWatch } from 'react-hook-form';
import ButtonAction from '../../../app/components/bottons/button_action';
import { CardUI } from '../../../app/components/card/card';
import { StateMessage } from '../../../app/components/enum/enum';
import Header from '../../../app/components/header';
import type { PageProps } from '../../../app/components/interface/router_interface';
import SelectField from '../../../app/components/select/select_field';
import type { RootState } from '../../../core/store/store';
import { Column, Container, Row } from '../../../core/styled_ui/styled_ui';
import { useThemeContext } from '../../../core/theme/ThemeContext';
import { useUI } from '../../../core/theme/ui_context';
import { PerfilDropdown } from '../../perfil/components/perfil_dropdown';
import { TrimestralCard } from './components/trimestral_card';
import { getPeriodsSource, getYearsSource } from '../comment/comment_source';
import { getMetadatosArchivosSource, ProcessDocumentSource, UpdateDocumentsSource } from './home_source';

const getInitialPublicationPeriod = () => {
	const today = new Date();
	const currentYear = today.getFullYear();
	const publicationSchedule = [
		{ month: 1, period: 'IV', yearOffset: -1 },
		{ month: 4, period: 'I', yearOffset: 0 },
		{ month: 7, period: 'II', yearOffset: 0 },
		{ month: 10, period: 'III', yearOffset: 0 },
	];

	const availablePeriods = [-1, 0, 1].flatMap((yearOffset) =>
		publicationSchedule.map(({ month, period, yearOffset: reportYearOffset }) => {
			const publicationDate = new Date(currentYear + yearOffset, month, 23);
			const activationDate = new Date(publicationDate);
			activationDate.setDate(activationDate.getDate() - 40);

			return {
				year: publicationDate.getFullYear() + reportYearOffset,
				period,
				activationDate,
			};
		})
	);

	const activePeriod = availablePeriods
		.filter(({ activationDate }) => activationDate <= today)
		.sort((a, b) => b.activationDate.getTime() - a.activationDate.getTime())[0];

	return activePeriod
		? { years: String(activePeriod.year), periods: activePeriod.period }
		: { years: '', periods: '' };
};


const HomePage: React.FC<PageProps> = () => {

	const { control, setValue, formState: { errors } } = useForm<{
		years: string | null;
		periods: string | null;
	}>({ defaultValues: getInitialPublicationPeriod() });
	const [anio, quarter] = useWatch({ control, name: ['years', 'periods'] });
	const { dispatch, onSnackbar } = useUI()

	const { theme, themes } = useThemeContext();

	const { metadataArchivos } = useSelector((state: RootState) => state.home)
	const { years, periods } = useSelector((state: RootState) => state.comment)
	const [actualizandoExcel, setActualizandoExcel] = useState(false);
	const [actualizandoWord, setActualizandoWord] = useState(false);
	const actualizandoArchivos = actualizandoExcel || actualizandoWord;
	const excelFiles = metadataArchivos.filter((data: any) => data.tipo === 'xlsm');
	const wordFiles = metadataArchivos.filter((data: any) => data.tipo === 'docx');

	function getColorByType(type: string): string {
		switch (type.toLowerCase()) {
			case "word":
				return "#2f80ed";
			case "comentarios":
				return "#7B61FF";
			case "excel":
				return "#27ae60";
			default:
				return "#6B7280";
		}
	}


	useLayoutEffect(() => {
		dispatch(getMetadatosArchivosSource());
	}, []);

	useEffect(() => {
		dispatch(getPeriodsSource());
		dispatch(getYearsSource());
	}, [dispatch]);



	const actualizarExcel = async () => {
		if (actualizandoArchivos) return;
		setActualizandoExcel(true);
		try {
			const response = await UpdateDocumentsSource();
			await dispatch(getMetadatosArchivosSource());
			onSnackbar(response.data, StateMessage.success);
		} catch (error: any) {
			onSnackbar(error.response?.data ?? 'No se pudieron actualizar los archivos Excel.', StateMessage.warning);
		} finally {
			setActualizandoExcel(false);
		}
	};

	const actualizarWord = async () => {
		if (actualizandoArchivos) return;
		setActualizandoWord(true);
		try {
			const response = await ProcessDocumentSource();
			await dispatch(getMetadatosArchivosSource());
			onSnackbar(response.data, StateMessage.success);
		} catch (error: any) {
			onSnackbar(error.response?.data ?? 'No se pudo generar el documento Word.', StateMessage.warning);
		} finally {
			setActualizandoWord(false);
		}
	};

	function formatearFecha(fechaISO?: string): string {
		if (!fechaISO) return '—';

		const fecha = new Date(fechaISO);
		if (Number.isNaN(fecha.getTime())) return '—';


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

	function formatearUltimaActualizacion(fechaISO?: string): string {
		if (!fechaISO) return '—';

		const fecha = new Date(fechaISO);
		if (Number.isNaN(fecha.getTime())) return '—';

		const fechaFormateada = new Intl.DateTimeFormat('es-PE', {
			day: '2-digit',
			month: '2-digit',
			year: 'numeric',
		}).format(fecha);
		const horaFormateada = new Intl.DateTimeFormat('es-PE', {
			hour: 'numeric',
			minute: '2-digit',
			hour12: true,
		}).format(fecha);

		return `${fechaFormateada} · ${horaFormateada}`;
	}

	return (
		<Container>
			<Column alignItems='center'>
				<Row style={{ width: '85%', marginBottom: '1rem', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '12px' }}>
					<Header
						title={"Home"}
						subtitle={'Panel de sincronizacion de archivos y generación de documentos consolidados.'}
					/>
					<Row aria-hidden="true" style={{ display: 'none', flexWrap: 'wrap', gap: '8px' }}>
						<div style={{ width: '220px' }}>
							<SelectField
								name="years"
								label="Año"
								control={control}
								options={years.map((item) => ({
									value: item.anio?.toString() || '',
									label: item.anio?.toString() || '',
								}))}
								error={errors.years}
								onChange={() => setValue('periods', null)}
							/>
						</div>
						<div style={{ width: '240px' }}>
							<SelectField
								name="periods"
								label="Periodo"
								control={control}
								options={periods.map((item) => ({
									value: item.trimestre || '',
									label: item.trimestre || '',
								}))}
								error={errors.periods}
							/>
						</div>
					</Row>
					<PerfilDropdown />
				</Row>
				<Column style={{ width: '85%', gap: '20px', paddingBottom: '20px' }}>
					<AnimatePresence initial={false}>
						{!actualizandoWord && (
							<motion.div
								key="excel-section"
								layout
								initial={{ opacity: 0, height: 0, y: 8 }}
								animate={{ opacity: 1, height: 'auto', y: 0 }}
								exit={{ opacity: 0, height: 0, y: -8 }}
								transition={{ duration: 0.3, ease: 'easeInOut' }}
								style={{ overflow: 'hidden' }}
							>
								<CardUI>
									<Column gap='16px'>
										<Row justifyContent='space-between' alignItems='center'>
											<div>
												<Typography variant="h5" sx={{ fontWeight: 500, color: themes[theme].text, mb: 0.25 }}>
													Archivos Excel
												</Typography>
												<Typography variant="body2" sx={{ color: "#aeb7c2", fontSize: "0.8rem" }}>
													Cuadros y Gráficos.
												</Typography>
											</div>
											<LastUpdateLabel>
												<FaRegClock aria-hidden="true" />
												<span>Última actualización: {formatearUltimaActualizacion(metadataArchivos.find((data: any) => data.tipo === "xlsm")?.ultima_actualizacion)}</span>
											</LastUpdateLabel>
											<ButtonAction
												backgroundColor={getColorByType('excel')}
												onClick={actualizarExcel}
												disabled={actualizandoExcel}
												style={{
													width: '140px',
													minWidth: '140px',
													height: '44px',
													padding: '0 12px',
													boxSizing: 'border-box',
													...(actualizandoExcel ? { backgroundColor: '#6b7280', color: '#fff' } : {}),
												}}
											>
												<Row alignItems="center">
													<FaArrowsSpin style={{ fontSize: "18px" }} />
													<div>Actualizar</div>
												</Row>
											</ButtonAction>
										</Row>
										<FilesGrid>
											{actualizandoExcel
												? Array.from({ length: Math.max(excelFiles.length, 1) }).map((_, index) => (
													<FileCardSkeleton key={`excel-loading-${index}`} />
												))
												: anio && quarter && excelFiles.map((data: any, index: number) => (
													<TrimestralCard
														key={index}
														year={anio ?? ''}
														quarter={quarter ?? ''}
														data={data}
													/>
												))}
										</FilesGrid>
									</Column>
								</CardUI>
							</motion.div>
						)}
					</AnimatePresence>
					<AnimatePresence initial={false}>
						{!actualizandoExcel && (
							<motion.div
								key="word-section"
								layout
								initial={{ opacity: 0, height: 0, y: 8 }}
								animate={{ opacity: 1, height: 'auto', y: 0 }}
								exit={{ opacity: 0, height: 0, y: -8 }}
								transition={{ duration: 0.3, ease: 'easeInOut' }}
								style={{ overflow: 'hidden' }}
							>
								<CardUI>
									<Column>
										<Row justifyContent='space-between' alignItems='center'>
											<div>
												<Typography
													variant="h5"
													sx={{ fontWeight: 400, color: themes[theme].text, mb: 0.25 }}
												>
													Archivos Word
												</Typography>
												<Typography variant="body2" sx={{ color: "#ccc", fontSize: "0.8rem" }}>
													Consolidado de comentarios, cuadros y gráficos.
												</Typography>
											</div>
											<LastUpdateLabel>
												<FaRegClock aria-hidden="true" />
												<span>Última actualización: {formatearFecha(metadataArchivos.find((data: any) => data.tipo === "docx")?.ultima_actualizacion)}</span>
											</LastUpdateLabel>
											<ButtonAction
												backgroundColor={getColorByType('word')}
												onClick={actualizarWord}
												disabled={actualizandoWord}
												style={{
													width: '140px',
													minWidth: '140px',
													height: '44px',
													padding: '0 12px',
													boxSizing: 'border-box',
													...(actualizandoWord ? { backgroundColor: '#6b7280', color: '#fff' } : {}),
												}}
											>
												<Row alignItems="center">
													<FaWandMagicSparkles style={{ fontSize: "18px" }} />
													<div>Actualizar</div>
												</Row>
											</ButtonAction>

										</Row>
										<WordFilesGrid>
											{actualizandoWord
												? Array.from({ length: Math.max(wordFiles.length, 1) }).map((_, index) => (
													<FileCardSkeleton key={`word-loading-${index}`} />
												))
												: wordFiles.map((data: any, index: number) => (
													<TrimestralCard
														key={index}
														year={anio ?? ''}
														quarter={quarter ?? ''}
														data={data}
														icon={<FaFileWord size={52} style={{ color: '#2f80ed', flexShrink: 0 }} />}
													/>
												))}
										</WordFilesGrid>
									</Column>
								</CardUI>
							</motion.div>
						)}
					</AnimatePresence>

				</Column>
			</Column>
		</Container>
	)
}
export default HomePage


const FilesGrid = styled.div`
	display: grid;
	grid-template-columns: repeat(auto-fit, minmax(min(100%, 160px), 1fr));
	gap: 12px;
	width: 100%;
	align-items: stretch;
`;

const WordFilesGrid = styled(FilesGrid)`
	grid-template-columns: repeat(auto-fill, minmax(min(100%, 160px), 1fr));
`;

const LastUpdateLabel = styled.div`
	display: flex;
	align-items: center;
	justify-content: center;
	gap: 8px;
	color: #b8c0ca;
	font-size: 0.85rem;
	white-space: nowrap;

	@media (max-width: 540px) {
		white-space: normal;
	}
`;

const FileCardSkeleton: React.FC = () => (
	<CardUI style={{ height: '150px', boxSizing: 'border-box' }}>
		<Column style={{ alignItems: 'center', gap: '14px' }}>
			<Skeleton
				variant="rounded"
				width={52}
				height={52}
				sx={{ bgcolor: 'rgba(156, 163, 175, 0.48)' }}
			/>
			<Skeleton
				variant="text"
				width="75%"
				height={24}
				sx={{ bgcolor: 'rgba(156, 163, 175, 0.48)' }}
			/>
		</Column>
	</CardUI>
);

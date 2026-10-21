import { Box, Skeleton } from '@mui/material';
import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import Header from '../../../app/components/header';
import type { PageProps } from '../../../app/components/interface/router_interface';
import type { RootState } from '../../../core/store/store';
import { Column, Container, Row } from '../../../core/styled_ui/styled_ui';
import { useThemeContext } from '../../../core/theme/ThemeContext';
import { useUI } from '../../../core/theme/ui_context';
import { PerfilDropdown } from '../../perfil/components/perfil_dropdown';
import type { comentario } from './comment_slice';
import { getComentariosEstadosSource, getComentarioSource, getPeriodsSource, getYearsSource } from './comment_source';
import AccordionComponents from './components/accordion_components';
import { useForm, useWatch } from 'react-hook-form';
import SelectField from '../../../app/components/select/select_field';

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

const CommentPage: React.FC<PageProps> = () => {

	const { currentTheme } = useThemeContext();

	const { control, setValue, formState: { errors }, } = useForm<{
		years: string | null,
		periods: string | null,

	}>({
		defaultValues: getInitialPublicationPeriod(),
	});
	const [selectedYear, selectedPeriod] = useWatch({ control, name: ['years', 'periods'] });

	const { dispatch } = useUI()
	const { comentario, loading, years, periods } = useSelector((state: RootState) => state.comment)
	const { employee } = useSelector((state: RootState) => state.perfil)

	useEffect(() => {
		dispatch(getPeriodsSource());
		dispatch(getYearsSource());
	}, []);

	useEffect(() => {
		if (!selectedYear || !selectedPeriod) return;
		dispatch(getComentarioSource(selectedYear, selectedPeriod, true));
	}, [dispatch, selectedYear, selectedPeriod]);

	useEffect(() => {
		if (!employee?.role?.id) return;
		dispatch(getComentariosEstadosSource({ employee }));
	}, [dispatch, employee]);

	return (
		<Container>
			<Column alignItems='center'>
				<Row style={{ width: '100%', marginBottom: '1rem', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '12px' }}>
					<Header
						title={"Informe Técnico "}
						subtitle={' Elaboración de comentarios, cuadros y graficos '}
					/>
					<Row style={{ flexWrap: 'wrap', gap: '8px' }}>
						<Box sx={{ width: { xs: '100%', sm: '220px' }, flexShrink: 0 }}>
							<SelectField
								name="years"
								label="Año"
								control={control}
								options={years.map((prop: any) => ({
									value: prop.anio?.toString() || '',
									label: prop.anio?.toString(),
								})
								)}
								error={errors.years}
								onChange={() => setValue('periods', null)}
							/>
						</Box>
						<Box sx={{ width: { xs: '100%', sm: '240px' }, flexShrink: 0 }}>
							<SelectField
								name="periods"
								label="Periodo"
								control={control}
								options={periods.map((prop: any) => ({
									value: prop.trimestre || '',
									label: prop.trimestre,
								})
								)}
								error={errors.periods}
							/>
						</Box>
					</Row>
					<PerfilDropdown />
				</Row>
				<section style={{ width: '100%', height: 'calc(100vh - 100px)', overflowY: 'auto' }}>
					<Column gap='0px' style={{ width: '100%', height: '100%', padding: '0px 0px', boxSizing: 'border-box' }}>
						{loading.comentario ? (
							<Box sx={{ width: '100%', padding: '0 0 10px' }}>
								{Array.from({ length: 10 }).map((_, index) => (
									<Box
										key={index}
										sx={{
											width: '100%',
											height: '52px',
											display: 'grid',
											gridTemplateColumns: '42% 38% 20%',
											alignItems: 'center',
											padding: '0 20px',
											marginBottom: '8px',
											boxSizing: 'border-box',
											backgroundColor: currentTheme.background,
											border: `1px solid ${currentTheme.borderColor}`,
											borderRadius: '6px',
										}}
									>
										<Skeleton
											variant="text"
											width="65%"
											height={22}
											sx={{ backgroundColor: 'rgba(255,255,255,0.10)' }}
										/>

										<Skeleton
											variant="text"
											width="70%"
											height={20}
											sx={{ backgroundColor: 'rgba(255,255,255,0.08)' }}
										/>

										<Box
											sx={{
												display: 'flex',
												alignItems: 'center',
												gap: '8px',
											}}
										>
											<Skeleton
												variant="circular"
												width={16}
												height={16}
												sx={{ backgroundColor: 'rgba(255,255,255,0.10)' }}
											/>

											<Skeleton
												variant="text"
												width="55%"
												height={20}
												sx={{ backgroundColor: 'rgba(255,255,255,0.08)' }}
											/>
										</Box>
									</Box>
								))}
							</Box>
						) : (
							comentario.map((item: comentario) => (
								<AccordionComponents
									key={item.id}
									item={item}
								/>
							))
						)}
					</Column>
				</section>
			</Column>
		</Container>
	)
}
export default CommentPage

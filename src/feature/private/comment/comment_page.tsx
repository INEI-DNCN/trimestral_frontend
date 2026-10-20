import { Box, Skeleton } from '@mui/material';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import Header from '../../../app/components/header';
import type { PageProps } from '../../../app/components/interface/router_interface';
import type { RootState } from '../../../core/store/store';
import { Column, Container, Row } from '../../../core/styled_ui/styled_ui';
import { useThemeContext } from '../../../core/theme/ThemeContext';
import { useUI } from '../../../core/theme/ui_context';
import { PerfilDropdown } from '../../perfil/components/perfil_dropdown';
import type { comentario, yearsInterface } from './comment_slice';
import { getComentariosEstadosSource, getComentarioSource, getPeriodsSource, getYearsSource } from './comment_source';
import AccordionComponents from './components/accordion_components';
import { useForm } from 'react-hook-form';
import SelectField from '../../../app/components/select/select_field';

const CommentPage: React.FC<PageProps> = () => {

	const [anio, __] = useState<any>(2026);
	const [quarter, _] = useState<any>("II");
	const { currentTheme } = useThemeContext();

	const { control, handleSubmit, formState: { errors }, } = useForm<{
		years: string | null,
		periods: string | null,

	}>({
		defaultValues: { years: '2026', periods: 'III' },
	});

	const { dispatch } = useUI()
	const { comentario, loading, years, periods } = useSelector((state: RootState) => state.comment)
	const { employee } = useSelector((state: RootState) => state.perfil)

	useEffect(() => {
		dispatch(getPeriodsSource());
		dispatch(getYearsSource());
		dispatch(getComentarioSource(anio, quarter, true));
		dispatch(getComentariosEstadosSource({ employee }));
	}, []);

	const onSubmit = async (e: { years: string | null, periods: string | null }) => { };

	return (
		<Container>
			<Column alignItems='center'>
				<Row style={{ width: '100%', marginBottom: '1rem', justifyContent: 'space-between', alignItems: 'center' }}>
					<Header
						title={"Informe Técnico "}
						subtitle={' Elaboración de comentarios, cuadros y graficos '}
					/>
					<Row>
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
								onChange={() => handleSubmit(onSubmit)()}
							/>
						</Box>
						<Box sx={{ width: { xs: '100%', sm: '240px' }, flexShrink: 0 }}>
							<SelectField
								name="Period"
								label="Periodo"
								control={control}
								options={periods.map((prop: any) => ({
									value: prop.trimestre || '',
									label: prop.trimestre,
								})
								)}
								error={errors.periods}
								onChange={() => handleSubmit(onSubmit)()}
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

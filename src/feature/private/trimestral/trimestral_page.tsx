import type { SelectChangeEvent } from '@mui/material';
import { EditIcon } from 'lucide-react';
import { useEffect, useLayoutEffect, useRef, useState } from 'react';
import { FaScroll } from "react-icons/fa6";
import { useSelector } from 'react-redux';
import styled from 'styled-components';
import ButtonAction from '../../../app/components/bottons/button_action';
import { DialogAction } from '../../../app/components/enum/enum';
import Header from '../../../app/components/header';
import type { PageProps } from '../../../app/components/interface/router_interface';
import { Column, Container, Row } from '../../../app/style_components/witgets_style_components';
import { formatItem } from '../../../app/utils/util';
import { useUI } from '../../../core/theme/ui_context';
import { UserDropdown } from '../../perfil/components/perfil_dropdown';
import { getComentarioTrimestralSource, getIndicadoresSource, getMetadatosArchivosSource, getTitleTrimestralSource } from '../trimestral/Trimestral_source';
import EditText from './components/editor_text';
import TrimestralForm from './components/trimestarl_form';
import { TrimestralComment } from './components/trimestral_comment';
import TrimestralSelectTitle from './components/trimestral_select_title';
import TrimestralTable from './components/trimestral_table';
import { TrimestralJson } from './json/trimestral_json';
import { SectionRinght } from './sections/section_ringht';
import type { comentarioDTO } from './trimestral_slice';


const TrimestralPage: React.FC<PageProps> = (PageProps) => {

	const [anio, __] = useState<any>(2025);
	const [quarter, _] = useState<any>("II");
	const [hoja, setHoja] = useState<any>("Cdro1");
	const [titles, setTitles] = useState<any>(1);
	const [editorContent1, setEditorContent1] = useState<any>({});
	const [editorContent2, setEditorContent2] = useState<any>({});

	const { dispatch, onDialog } = useUI()



	const { titleTrimestral, comentariosTrimestral, metadataArchivos, indicadores } = useSelector((state: any) => state.trimestral)
	console.log(comentariosTrimestral)
	const handleChangeTitles = (event: SelectChangeEvent) => {
		dispatch(getComentarioTrimestralSource(parseInt(event.target.value as string), anio, quarter));
		dispatch(getIndicadoresSource(anio, quarter, titleTrimestral.find((element: any) => element.id === parseInt(event.target.value as string))?.id_hoja));
		setHoja(titleTrimestral.find((element: any) => element.id === parseInt(event.target.value as string))?.id_hoja)
		setTitles(event.target.value as string);
	};

	useLayoutEffect(() => {
		dispatch(getTitleTrimestralSource());
		dispatch(getMetadatosArchivosSource());
	}, []);

	const initialized = useRef(false);

	useEffect(() => {
		if (!initialized.current && titleTrimestral.length > 0) {
			initialized.current = true;
			setTitles(titleTrimestral[0].id);
			dispatch(getComentarioTrimestralSource(titleTrimestral[0].id, anio, quarter));
			dispatch(getIndicadoresSource(anio, quarter, titleTrimestral[0].id_hoja));
		}
	}, [titleTrimestral]);

	useEffect(() => {
		if (comentariosTrimestral) {
			if (Array.isArray(comentariosTrimestral)) {
				setEditorContent1(comentariosTrimestral[0] || {});
				setEditorContent2(comentariosTrimestral[1] || {});
			} else if (typeof comentariosTrimestral === "object") {
				setEditorContent1(comentariosTrimestral || {});
				setEditorContent2({});
			} else {
				setEditorContent1({});
				setEditorContent2({});
			}
		}
	}, [comentariosTrimestral]);

	const handleSave = async (editorContent: any) => {
		if (editorContent?.id) {
			try {
				// await updateComentario(editorContent.id, editorContent.contenido);
				// onSnackbar()
			} catch (error) {
			}
		}
	};

	const scrollableRef = useRef<HTMLDivElement>(null);

	const handleScrollTop = () => {
		if (scrollableRef.current) {
			scrollableRef.current.scrollTo({ top: 0, behavior: "smooth" });
		}
	};

	const handleScrollBottom = () => {
		if (scrollableRef.current) {
			scrollableRef.current.scrollTo({ top: scrollableRef.current.scrollHeight, behavior: "smooth" });
		}
	};

	const handleActions = (action: DialogAction, group?: comentarioDTO) => {

		const dialogContentMap: Record<any, any> = {
			[DialogAction.update]: <TrimestralForm action={DialogAction.update} coment={group} />,
		};

		onDialog({ children: dialogContentMap[action], maxWidth: "md", title: action });
	};

	return (
		<Container>
			<header>
				<Row style={{ marginBottom: '1rem', justifyContent: 'space-between', alignItems: 'center' }}>
					<Header
						title={"PBI " + PageProps.items?.label + ' 2025 - II'}
						subtitle={'Informe Técnico'}
					/>
					{
						comentariosTrimestral.length === 2
							? <Row>
								<ButtonAction
									children={
										<Row alignItems='center'>
											<FaScroll style={{ fontSize: "18px" }} />
											<div>Texto 1</div>
										</Row>
									}
									onClick={handleScrollTop}
								/>
								<ButtonAction
									children={
										<Row alignItems='center'>
											<FaScroll style={{ fontSize: "18px" }} />
											<div>Texto 2</div>
										</Row>
									}
									onClick={handleScrollBottom}

								/>
							</Row>
							: null
					}
					<UserDropdown />
				</Row>
			</header>
			<Row style={{ width: '100%', height: '100%', marginTop: '10px' }}>
				<section style={{
					width: '80%',
					height: 'calc(100vh - 100px)',
					overflow: 'hidden',
				}}
				>
					<Column gap='0px' style={{ width: '100%', height: '100%', padding: '0px 0px', boxSizing: 'border-box' }}>
						<TrimestralSelectTitle
							handleChange={handleChangeTitles}
							item={titles}
							items={[
								...titleTrimestral.map((item: any) => ({
									id: item.id,
									descripcion: item.nombre
								}))
							]}
						/>
						<ScrollableContainer ref={scrollableRef}>
							<Column gap='20px' style={{ padding: '0px ', paddingTop: '13px ' }}>
								<ButtonAction
									type="submit"
									startIcon={<EditIcon size={20} />}
									onClick={() => handleActions(DialogAction.update, editorContent1)}
								>
									Actualizar
								</ButtonAction>
								<TrimestralComment comment={editorContent1} />
								<EditText
									initialContent={editorContent1}
									onContentChange={(content) => setEditorContent1({ ...editorContent1, contenido: content })}
									onSave={(updatedContent) => handleSave(updatedContent)}
								/>
								<div
									style={{
										width: '100%',
										padding: '0px 40px',
										boxSizing: 'border-box' // Cambiado de 'content-box' a 'border-box'
									}}
								>
									<TrimestralTable
										data={(indicadores || []).map((e: any) => formatItem({ originalItem: e, decimal: 1 }))}
										structureHeadeJson={TrimestralJson(anio, quarter)}
										columnWidths={{ "Actividad": "150px" }}
										columnAligns={{ "Actividad": "left" }}
									>

									</TrimestralTable>
								</div>
								{
									titles === 1 || titles === 5 ?

										<EditText
											initialContent={editorContent2}
											onContentChange={(content) => setEditorContent2({ ...editorContent2, contenido: content })}
											onSave={(updatedContent) => handleSave(updatedContent)}
										/> : null
								}
								<div style={{ height: '200px' }}></div>
							</Column>
						</ScrollableContainer>
					</Column>
				</section>
				<section style={{
					width: '20%',
					height: '100%',
					display: 'flex',
					flexDirection: 'column',
					gap: '8px',
				}}>
					<SectionRinght
						year={anio}
						quarter={quarter}
						metadataArchivos={metadataArchivos}
						hoja={hoja}
						pageProps={PageProps}
					/>
				</section>
			</Row>
		</Container>
	)
}
export default TrimestralPage

const ScrollableContainer = styled.div`
	width: 100%;
	height: 100%;
	overflow: auto;
	scrollbar-width: none;
	-ms-overflow-style: none;

	&::-webkit-scrollbar {
		width: 6px;
		opacity: 0;
		transition: opacity 0.3s ease;
	}

	&::-webkit-scrollbar-thumb {
		background: rgba(0, 0, 0, 0.3);
		border-radius: 10px;
	}

	&::-webkit-scrollbar-thumb:hover {
		background: rgba(0, 0, 0, 0.5);
	}

	&::-webkit-scrollbar-track {
		background: transparent;
	}

	&:hover::-webkit-scrollbar {
		opacity: 1;
	}
`;

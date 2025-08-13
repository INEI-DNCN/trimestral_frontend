import { useForm } from 'react-hook-form';
import { useSelector } from 'react-redux';
import ButtonAction from '../../../../app/components/bottons/button_action';
import ButtonCancel from '../../../../app/components/bottons/button_cancel';
import { DialogAction, StateMessage } from '../../../../app/components/enum/enum';

import type { RootState } from '../../../../core/store/store';

import { useEffect } from 'react';
import InputField from '../../../../app/components/wrapper_field';
import { Column, Row } from '../../../../core/styled_ui/styled_ui';
import { themes } from '../../../../core/theme/ThemeContext';
import { useUI } from '../../../../core/theme/ui_context';
import type { comentarioDTO } from '../trimestral_slice';
import { getComentarioTrimestralSource, updateComentario } from '../Trimestral_source';

interface Props {
	action: DialogAction;
	coment?: comentarioDTO;
	titleTrimestralID: any;
	year: string;
	quarter: string;
}


const TrimestralForm: React.FC<Props> = ({ action, coment, titleTrimestralID, year, quarter }) => {

	const { onSnackbar, handleCloseDialog, dispatch } = useUI()

	const {
		handleSubmit,
		reset,
		register,
		trigger,
		formState: { errors },
	} = useForm<{
		comentario: string;
	}>({
		defaultValues: {
			comentario: ''
		},
	});

	const { } = useSelector((state: RootState) => state.trimestral)

	useEffect(() => {
		if (coment) {
			reset({
				comentario: coment?.contenido || '',

			});
		}
	}, [coment, reset]);


	const onSubmit = async (e: any) => {

		const data: comentarioDTO = {
			...coment,
			contenido: e.comentario
		};

		try {
			const actionMap: any = {
				[DialogAction.update]: updateComentario,
			};

			const handler = actionMap[action];

			if (handler) {
				await handler(data);
				dispatch(getComentarioTrimestralSource(titleTrimestralID, year, quarter));
			} else {
				console.warn(`No handler defined for action: ${action}`);
			}

			const messageMap: any = {
				[DialogAction.update]: 'Actualización completada exitosamente',
			};

			const typeMessageMap: any = {
				[DialogAction.update]: StateMessage.success,
			};

			onSnackbar(messageMap[action], typeMessageMap[action]);
			handleCloseDialog();
		} catch (error: any) {
			if (error.response?.status === 400) {
				onSnackbar(error.response.data.message, StateMessage.warning);
			} else {
				onSnackbar(error.response?.data?.message || 'Error desconocido', StateMessage.error);
			}
		}
	};

	return (
		<form style={{ width: '100%' }} onSubmit={handleSubmit(onSubmit)} autoComplete="off">
			<Column pt={1}>
				<InputField
					multiline={true}
					disabled={action === DialogAction.delete}
					label="Comentario"
					register={register('comentario', {
						required: 'Campo requerido',
					})}
					error={errors.comentario}
					onKeyUp={() => trigger('comentario')}
				/>
				<Row justifyContent="flex-end" mt={2}>
					<ButtonCancel onClick={handleCloseDialog}>Cancelar</ButtonCancel>
					<ButtonAction backgroundColor={action === DialogAction.delete ? themes.colors.danger : themes.colors.primary} type="submit">{action === DialogAction.delete ? 'Eliminar' : 'Aplicar'}</ButtonAction>
				</Row>
			</Column>
		</form>
	);
};

export default TrimestralForm;

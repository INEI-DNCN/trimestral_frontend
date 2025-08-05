import { useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { StateMessage } from '../../../../app/components/enum/enum';
import { Column, Row } from '../../../../app/style_components/witgets_style_components';

import InputField from '../../../../app/components/Input_field';
import ButtonAction from '../../../../app/components/bottons/button_action';
import ButtonCancel from '../../../../app/components/bottons/button_cancel';
import type { User } from '../user_slice';
import type { Meta } from '../../../../app/components/interface/pagination_response_interface';
import { getUserPagination, updateUserSource } from '../user_source';

interface Props {
	user?: User;
	meta?: Meta;
	handleClose: () => void;
	onSnackbar: (message: string, type?: StateMessage) => void;
}

const UserFormPassword: React.FC<Props> = ({ user, meta , handleClose, onSnackbar }) => {
	const dispatch: any = useDispatch();

	const {
		register,
		handleSubmit,
		formState: { errors },
		trigger,
	} = useForm({
		defaultValues: {
			password: '',
		},
	});

	const onSubmit = async (e: any) => {
		if (!user) return;
		const data: User = {
			...user,
			password: e.password,
		};

		try {
			await updateUserSource(data)
			onSnackbar('Contraseña modificada con éxito.');
			dispatch(getUserPagination({page: meta?.currentPage}));
			handleClose();
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
					label=" Nueva Contraseña"
					register={register('password', {
						required: 'Campo requerido',
					})}
					error={errors.password}
					onKeyUp={() => trigger('password')}
				/>
				<Row justifyContent="flex-end" mt={2}>
					<ButtonCancel onClick={handleClose}>Cancelar</ButtonCancel>
					<ButtonAction type="submit">Aplicar</ButtonAction>
				</Row>
			</Column>
		</form>
	);
};

export default UserFormPassword;

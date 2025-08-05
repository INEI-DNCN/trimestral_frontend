import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { StateMessage } from '../../../../app/components/enum/enum';
import { Column, Row } from '../../../../app/style_components/witgets_style_components';

import InputField from '../../../../app/components/Input_field';
import ButtonAction from '../../../../app/components/bottons/button_action';
import ButtonCancel from '../../../../app/components/bottons/button_cancel';
import type { User } from '../user_slice';
import type { Meta } from '../../../../app/components/interface/pagination_response_interface';
import { createUserSource, getUserPagination, updateUserSource } from '../user_source';
import DatePickerField from '../../../../app/components/data_picker_field';

interface Props {
	user?: User;
	meta?: Meta;
	handleClose: () => void;
	onSnackbar: (message: string, type?: StateMessage) => void;
}

const UserForm: React.FC<Props> = ({ user, meta , handleClose, onSnackbar }) => {
	const dispatch: any = useDispatch();

	const {
		control,
		register,
		handleSubmit,
		formState: { errors },
		trigger,
		reset,
	} = useForm({
		defaultValues: {
			dni: '',
			name: '',
			firtName: '',
			lastName: '',
			email: '',
			birthday: '',
		},
	});

	// Cargar datos si se va a editar
	useEffect(() => {
			if (!user) return;
			reset({
				dni: user.dni || '',
				name: user.name || '',
				firtName: user.firtName || '',
				lastName: user.lastName || '',
				email: user.email || '',
				birthday: user.birthday || '',
			});
	}, [user, reset]);

	const onSubmit = async (e: any) => {

		const data: User = {
			id: user?.id,
			dni: e.dni,
			name: e.name,
			firtName: e.firtName,
			lastName: e.lastName,
			email: e.email,
			birthday: e.birthday,
		};

		try {
			user
			? await updateUserSource(data)
			: await createUserSource(data);
			onSnackbar(user ? 'Actualización completada exitosamente' : 'Registro creado con éxito');
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
					label="DNI"
					maxLength={8}
					register={register('dni', {
						required: 'Campo requerido',
						pattern: {
							value: /^\d{8}$/,
							message: 'Debe tener exactamente 8 dígitos',
						},
					})}
					error={errors.dni}
					onKeyUp={() => trigger('dni')}
				/>
				<InputField
					label="Nombre"
					register={register('name', { required: 'Campo requerido' })}
					error={errors.name}
					onKeyUp={() => trigger('name')}
				/>
				<InputField
					label="Apellido Paterno"
					register={register('firtName', { required: 'Campo requerido' })}
					error={errors.firtName}
					onKeyUp={() => trigger('firtName')}
				/>
				<InputField
					label="Apellido Materno"
					register={register('lastName', { required: 'Campo requerido' })}
					error={errors.lastName}
					onKeyUp={() => trigger('lastName')}
				/>
				<InputField
					label="Correo electrónico"
					type="email"
					maxLength={100}
					register={register("email", {
						required: "Correo requerido",
						pattern: {
						value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
						message: "Correo inválido",
						},
					})}
					error={errors.email}
					onKeyUp={() => trigger("email")}
				/>
				<DatePickerField
					name="birthday"
					control={control}
					error={errors.birthday}
				/>
				<Row justifyContent="flex-end" mt={2}>
					<ButtonCancel onClick={handleClose}>Cancelar</ButtonCancel>
					<ButtonAction type="submit">Aplicar</ButtonAction>
				</Row>
			</Column>
		</form>
	);
};

export default UserForm;

import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { StateMessage } from '../../../../app/components/enum/enum';
import { Column, Row } from '../../../../core/styled_ui/styled_ui';

import ButtonAction from '../../../../app/components/bottons/button_action';
import ButtonCancel from '../../../../app/components/bottons/button_cancel';
import DatePickerField from '../../../../app/components/data_picker_field';
import type { Meta } from '../../../../app/components/interface/pagination_response_interface';
import InputField from '../../../../app/components/wrapper_field';
import { useUI } from '../../../../core/theme/ui_context';
import type { User } from '../../../perfil/perfil_slice';
import { updateUserSource } from '../../../perfil/perfil_source';

interface Props {
	user?: User;
	meta?: Meta;
}

const UserForm: React.FC<Props> = ({ user }) => {


	const { onSnackbar, handleCloseDialog } = useUI()

	const {
		control,
		register,
		handleSubmit,
		formState: { errors },
		trigger,
		reset,
	} = useForm({
		defaultValues: {
			username: '',
			dni: '',
			name: '',
			firstName: '',
			lastName: '',
			email: '',
			birthday: '',
		},
	});

	// Cargar datos si se va a editar
	useEffect(() => {
		if (!user) return;
		reset({
			username: user.username,
			dni: user.personal?.dni || '',
			name: user.personal?.name || '',
			firstName: user.personal?.firstName || '',
			lastName: user.personal?.lastName || '',
			email: user.personal?.email || '',
			birthday: user.personal?.birthday || '',
		});
	}, [user, reset]);

	const onSubmit = async (e: any) => {

		const data: User = {
			id: user?.id,
			username: e.username,
			personal: {
				dni: e.dni,
				name: e.name,
				firstName: e.firstName,
				lastName: e.lastName,
				email: e.email,
				birthday: e.birthday,
			}
		};

		try {
			user
				? await updateUserSource(data)
				: await updateUserSource(data);
			onSnackbar(user ? 'Actualización completada exitosamente' : 'Registro creado con éxito');
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
					label="Usuario"
					register={register('username', {
						required: 'Campo requerido',
					})}
					error={errors.username}
					onKeyUp={() => trigger('username')}
				/>
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
					label="Nombre(s)"
					register={register('name', { required: 'Campo requerido' })}
					error={errors.name}
					onKeyUp={() => trigger('name')}
				/>
				<InputField
					label="Apellido Paterno"
					register={register('firstName', { required: 'Campo requerido' })}
					error={errors.firstName}
					onKeyUp={() => trigger('firstName')}
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
					<ButtonCancel onClick={handleCloseDialog}>Cancelar</ButtonCancel>
					<ButtonAction type="submit">Aplicar</ButtonAction>
				</Row>
			</Column>
		</form>
	);
};

export default UserForm;

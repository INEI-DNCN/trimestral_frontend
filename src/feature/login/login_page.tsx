import { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import styled, { css } from "styled-components";
import ButtonAction from "../../app/components/bottons/button_action";
import { StateMessage } from "../../app/components/enum/enum";
import type { PageProps } from "../../app/components/interface/router_interface";
import InputField from "../../app/components/wrapper_field";
import { setToken } from "../../app/utils/utils_localstorage";
import Logo from "../../core/logo/logo";
import { Column, Row } from "../../core/styled_ui/styled_ui";
import { useThemeContext } from "../../core/theme/ThemeContext";
import { useUI } from "../../core/theme/ui_context";
import { signupSource } from "./login_source";


const LoginPage: React.FC<PageProps> = () => {

	const [isLoading, setIsLoading] = useState(false);
	const navigate = useNavigate();
	const { onSnackbar } = useUI()

	const {
		register,
		handleSubmit,
		formState: { errors },
		trigger,
	} = useForm({
		defaultValues: {
			usuario: '',
			password: '',
		},
	});

	const onSubmit = async (e: any) => {
		setIsLoading(true);
		const data = {
			username: e.usuario,
			password: e.password,
			clientId: import.meta.env.VITE_CLIENTE_ID
		}
		try {
			const response = await signupSource(data);
			localStorage.setItem("sidebarActiveMenu", 'trimestral');
			const token = response?.data.accessToken;
			onSnackbar("Acceso concedido", StateMessage.success);
			setToken(token);

			const checkSidebarAndNavigate = () => {
				const value = localStorage.getItem("sidebarActiveMenu");
				console.log(value)
				if (value === "trimestral") {
					navigate("/private/trimestral");
				} else {

					setTimeout(checkSidebarAndNavigate, 100);
				}
			};

			checkSidebarAndNavigate();
		} catch (error: any) {
			onSnackbar(error.response?.data?.message || "Error desconocido", StateMessage.warning);
		} finally {
			setIsLoading(false);
		}
	};

	const { theme, themes } = useThemeContext();
	return (
		<Wrapper $background={themes[theme].backgroundBase}>
			<Row alignItems="center" justifyContent="center" style={{ minHeight: '100vh' }}>
				<LoginCard
					$isLoading={isLoading}
					$background={themes[theme].background}
					$borderColor={themes[theme].borderColor}
					style={{ padding: '2.5rem 2rem', minWidth: '350px', maxWidth: '400px' }}
				>
					<Column gap="1.5rem">
						<Column alignItems="center" gap="0.5rem">
							<Row alignItems="center" gap="0.75rem">
								<Logo />
								<div
									style={{
										color: themes[theme].text,
										fontWeight: '700',
										fontSize: '1.75rem',
									}}
								>
									Login
								</div>
							</Row>
							<div
								style={{
									color: '#6e6e73',
									fontSize: '14px',
									textAlign: 'center',
								}}
							>
								Sistema de Procesamiento de Cuantas Nacionales - SPCN
							</div>
						</Column>

						<form onSubmit={handleSubmit(onSubmit)}>
							<Column gap="1.25rem">
								<InputField
									label="Usuario"
									maxLength={50}
									register={register('usuario', { required: 'Campo requerido' })}
									error={errors.usuario}
									onKeyUp={() => trigger('usuario')}
								/>
								<InputField
									label="Contraseña"
									maxLength={50}
									type="password"
									register={register('password', { required: 'Campo requerido' })}
									error={errors.password}
									onKeyUp={() => trigger('password')}
								/>
								<ButtonAction type="submit" >
									{isLoading ? 'Verificando...' : 'Acceder al Sistema'}
								</ButtonAction>
							</Column>
						</form>
					</Column>
				</LoginCard>
			</Row>
		</Wrapper>
	)
}
export default LoginPage

const Wrapper = styled.div<{ $background?: string }>`
	width: 100vw;
	height: 100vh;
	display: flex;
	justify-content: center;
	align-items: center;
	background: ${(props) => props.$background || '#f2f2f7'};
	font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif;
`;

const LoginCard = styled.div<{
	$isLoading?: boolean;
	$background?: string;
	$borderColor?: string;
}>`
	background: ${(props) => props.$background || '#ffffffcc'};
	border-radius: 28px;
	padding: 48px 36px;
	max-width: 420px;
	width: 100%;
	backdrop-filter: blur(30px);
	border: 1px solid ${(props) => props.$borderColor || '#d1d1d6'};
	box-shadow: 0 8px 30px rgba(0, 0, 0, 0.08);
	transition: all 0.3s ease-in-out;

	display: flex;
	flex-direction: column;
	gap: 24px;

	${(props) =>
		props.$isLoading &&
		css`
			pointer-events: none;
			opacity: 0.5;
		`}
`;

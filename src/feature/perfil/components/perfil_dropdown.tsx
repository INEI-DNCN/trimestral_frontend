import { jwtDecode } from "jwt-decode";
import { ChevronDown, LogOut, User2 } from "lucide-react";
import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import styled from "styled-components";
import { deleteToken, getToken } from "../../../app/utils/utils_localstorage";
import type { RootState } from "../../../core/store/store";
import { useThemeContext } from "../../../core/theme/ThemeContext";
import { useUI } from "../../../core/theme/ui_context";
import { logoutSource } from "../../login/login_source";
import type { UserPayload } from "../perfil_slice";
import { getOneUser } from "../perfil_source";

const DropdownContainer = styled.div`
	position: relative;
	display: inline-block;
`;

const TriggerButton = styled.button<{ $theme: any }>`
	background-color: transparent;
	color: ${({ $theme }) => $theme.text};
	border: none;
	display: flex;
	align-items: center;
	cursor: pointer;
	gap: 0.65rem;
	padding: 0.5rem 0.75rem;
	border-radius: 10px;
	transition: background-color 0.2s ease;

	&:hover {
		background-color: ${({ $theme }) => $theme.menu.backgroundActive};
	}
`;

const UserInfo = styled.div`
	display: flex;
	align-items: center;
	gap: 0.5rem;
	white-space: nowrap;
`;

const UserName = styled.span`
	font-size: 0.9rem;
	font-weight: 500;
`;

const RoleSeparator = styled.span`
	font-size: 0.8rem;
	font-weight: 600;
	color: #9aa4af;
	text-shadow: 0 0 4px rgba(154, 164, 175, 0.25);
	margin: 0 0.05rem;
`;

const RoleName = styled.span`
	font-size: 0.82rem;
	font-weight: 500;
	color: #66c7ff;
	text-shadow: 0 0 7px rgba(102, 199, 255, 0.4);
`;

const DropdownContent = styled.div<{ $theme: any }>`
	position: absolute;
	right: 0;
	top: calc(100% + 6px);
	background-color: ${({ $theme }) => $theme.menu.backgroundSub};
	border: 1px solid ${({ $theme }) => $theme.borderColor};
	border-radius: 10px;
	min-width: 190px;
	box-shadow: 0 8px 24px rgba(0, 0, 0, 0.18);
	z-index: 999;
	overflow: hidden;
`;

const DropdownItem = styled.button<{ $theme: any }>`
	width: 100%;
	padding: 0.75rem 1rem;
	background: none;
	border: none;
	color: ${({ $theme }) => $theme.text};
	text-align: left;
	display: flex;
	align-items: center;
	gap: 0.75rem;
	font-size: 0.9rem;
	cursor: pointer;
	transition: background-color 0.2s ease;

	&:hover {
		background-color: ${({ $theme }) => $theme.menu.backgroundActive};
	}
`;

const Divider = styled.div<{ $theme: any }>`
	height: 1px;
	background-color: ${({ $theme }) => $theme.borderColor};
	margin: 0;
`;

export const PerfilDropdown = () => {
	const { theme, themes } = useThemeContext();
	const { navigate, dispatch } = useUI();
	const currentTheme = themes[theme];
	const [isOpen, setIsOpen] = React.useState(false);
	const { employee } = useSelector((state: RootState) => state.perfil);

	const toggleDropdown = () => setIsOpen(!isOpen);

	const handleLogout = async () => {
		try {
			await logoutSource();
			deleteToken();
			navigate("/login");
		} catch (error) {
			console.error("Error en logout:", error);
			throw error;
		}
	};

	const personal = employee?.user?.personal;

	const fullName =
		employee?.user?.username === "administrador"
			? "Administrador"
			: personal
				? `${personal?.name ?? ""} ${personal?.firstName ?? ""} ${personal?.lastName ?? ""}`
				: "Usuario";

	const roleName = employee?.role?.name ?? "Sin rol";

	useEffect(() => {
		const token = getToken();
		if (token) {
			const decoded = jwtDecode<UserPayload>(token);
			dispatch(getOneUser({ id: decoded.id }));
		}
	}, []);

	return (
		<DropdownContainer>
			<TriggerButton onClick={toggleDropdown} $theme={currentTheme}>
				<User2 size={18} />
				<UserInfo>
					<UserName>{fullName}</UserName>
					<RoleSeparator>•</RoleSeparator>
					<RoleName>{roleName}</RoleName>
				</UserInfo>
				<ChevronDown size={16} />
			</TriggerButton>

			{isOpen && (
				<DropdownContent $theme={currentTheme}>
					<DropdownItem $theme={currentTheme} onClick={() => navigate("/perfil")}>
						<User2 size={16} />
						Editar Perfil
					</DropdownItem>

					<Divider $theme={currentTheme} />

					<DropdownItem $theme={currentTheme} onClick={handleLogout}>
						<LogOut size={16} />
						Cerrar Sesión
					</DropdownItem>
				</DropdownContent>
			)}
		</DropdownContainer>
	);
};
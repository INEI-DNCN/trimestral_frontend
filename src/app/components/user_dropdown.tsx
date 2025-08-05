// UserDropdown.tsx
import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { LogOut, User2 } from "lucide-react";
import { useThemeContext } from "../../core/theme/ThemeContext";
import { deleteToken, getToken } from "../utils/utils_localstorage";
import { jwtDecode } from "jwt-decode";
import { logoutSource } from "../../feature/login/login_source";
import { useNavigate } from "react-router-dom";
import type { UserPayload } from "../../feature/private/user/user_slice";

const DropdownContainer = styled.div`
	position: relative;
	display: inline-block;
`;

const TriggerButton = styled.button<{ $theme: any }>`
	background-color: transparent;
	color: ${({ $theme }) => $theme.text};
	border: none;
	font-size: 0.95rem;
	display: flex;
	align-items: center;
	cursor: pointer;
	gap: 0.5rem;
	padding: 0.5rem 0.75rem;
	border-radius: 12px;
	transition: background-color 0.2s ease;

	&:hover {
		background-color: ${({ $theme }) => $theme.menu.backgroundActive};
	}
`;

const DropdownContent = styled.div<{ $theme: any }>`
	position: absolute;
	right: 0;
	top: 110%;
	background-color: ${({ $theme }) => $theme.menu.backgroundSub};
	border: 1px solid ${({ $theme }) => $theme.borderColor};
	border-radius: 10px;
	min-width: 180px;
	box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
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
	font-size: 0.95rem;
	cursor: pointer;
	transition: background 0.2s;

	&:hover {
		background-color: ${({ $theme }) => $theme.menu.backgroundActive};
	}
`;

const Divider = styled.div<{ $theme: any }>`
	height: 1px;
	background-color: ${({ $theme }) => $theme.borderColor};
	margin: 0.25rem 0;
`;

export const UserDropdown = () => {
	const { theme, themes } = useThemeContext();
	const currentTheme = themes[theme];
	const navigate = useNavigate();
	const [isOpen, setIsOpen] = React.useState(false);
	const [user, setUser] = useState<UserPayload | null>(null);
	const toggleDropdown = () => setIsOpen(!isOpen);

	useEffect(() => {
		const token = getToken();
		if (token) {
			try {
				const decoded = jwtDecode<UserPayload>(token);
				setUser(decoded);
			} catch (err) {
				console.error("Error al decodificar token", err);
			}
		}
	}, []);

	const handleLogout = async () => {
		try {
			await logoutSource();
			deleteToken()
			navigate("/login");
		} catch (error) {
			console.error('Error en logout:', error);
			throw error;
		}
	};



	return (
		<DropdownContainer>
		<TriggerButton onClick={toggleDropdown} $theme={currentTheme}>
			<User2 size={18} />
			{user?.name +" "+ user?.firtName +" "+ user?.lastName }
		</TriggerButton>
		{isOpen && (
			<DropdownContent $theme={currentTheme}>
			<DropdownItem $theme={currentTheme} onClick={()=>navigate("/perfil")}>
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

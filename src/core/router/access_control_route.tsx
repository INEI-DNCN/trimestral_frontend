import type { AxiosError, AxiosResponse } from "axios";
import axios from "axios";
import { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import { StateMessage } from "../../app/components/enum/enum";
import WrapperLoading from "../../app/components/wrapper_loading";
import { deleteToken, getToken } from "../../app/utils/utils_localstorage";

import { validateSource } from "../../feature/login/login_source";
import { Row } from "../styled_ui/styled_ui";
import { useUI } from "../theme/ui_context";

interface Props {
	children: any;
	redirectIfAuthenticated?: boolean;
	redirectTo?: string;
}

interface ValidationResponse {
	isValid: boolean;
	user?: {
		id: string;
		dni: string;
		name: string;
		firstName: string;
		lastName: string;
	};
	token?: {
		expiresAt: Date;
		issuedAt: Date;
		remainingTime: number;
	};
	permissions?: string[];
	application?: {
		id: string;
		name: string;
	};
}

export default function AccessControlRoute({
	children,
	redirectIfAuthenticated = false,
	redirectTo = "/login",
}: Props) {

	const [isLoading, setIsLoading] = useState(false);
	const [isAuthenticated, setIsAuthenticated] = useState(false);
	const [currentToken, setCurrentToken] = useState<string | null>(null);
	const { onSnackbar } = useUI()

	const validateTokenLogic = async () => {
		const token = getToken();

		if (!token) {
			setIsAuthenticated(false);
			setIsLoading(false);
			return;
		}
		setIsLoading(true);

		let isValid
		try {
			const response: AxiosResponse = await validateSource(token)
			if (response.status !== 200) {

				return false;
			}
			const data: ValidationResponse = response.data;
			isValid = data.isValid
		} catch (error: unknown) {
			if (axios.isAxiosError(error)) {
				const serverError = error as AxiosError<{ message: string }>;
				onSnackbar(serverError.response?.data.message || "Error desconocido", StateMessage.error);
				deleteToken()
			} else {
				onSnackbar("Error inesperado");
			}
			return false;
		}

		if (!isValid) {
			deleteToken();
			setIsAuthenticated(false);
		} else {
			setIsAuthenticated(true);
		}
		setIsLoading(false);
	};

	useEffect(() => {
		validateTokenLogic();
		setCurrentToken(getToken());
	}, []);

	useEffect(() => {
		const interval = setInterval(() => {
			const token = getToken();
			if (token !== currentToken) {
				setCurrentToken(token);

				setIsLoading(true);
				validateTokenLogic();
			}
		}, 500);

		return () => clearInterval(interval);
	}, [currentToken]);


	if (isLoading) {
		return <Row alignItems="center" justifyContent="center" style={{ minHeight: '100vh', minWidth: '100vw' }}>
			<WrapperLoading text="Validando sesión..." />
		</Row>;
	}

	if (redirectIfAuthenticated && isAuthenticated) {
		return <Navigate to={redirectTo} />;
	}

	if (!redirectIfAuthenticated && !isAuthenticated) {
		return <Navigate to={redirectTo} />;
	}

	return children;
}
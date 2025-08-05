import { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import { API2 } from "../../../app/utils/utils_api";
import { deleteToken, getToken } from "../../../app/utils/utils_localstorage";

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

const validateTokenWithBackend = async (token: string): Promise<boolean> => {
	try {
		const response = await API2.post(`auth/validate`, {
			token,
			clientId: import.meta.env.VITE_CLIENTE_ID
		});

		if (response.status !== 200) {
			return false;
		}

		const data: ValidationResponse = response.data;
		return data.isValid;
	} catch (error) {
		console.error('Error validating token:', error);
		return false;
	}
};

export default function AccessControlRoute({
	children,
	redirectIfAuthenticated = false,
	redirectTo = "/login",
}: Props) {
	const [isLoading, setIsLoading] = useState(true);
	const [isAuthenticated, setIsAuthenticated] = useState(false);
	const [currentToken, setCurrentToken] = useState<string | null>(null);

	const validateTokenLogic = async () => {
		const token = getToken();

		if (!token) {
			setIsAuthenticated(false);
			setIsLoading(false);
			return;
		}

		const isValid = await validateTokenWithBackend(token);

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

	// Polling para detectar cambios en el token
	useEffect(() => {
		const interval = setInterval(() => {
			const token = getToken();
			if (token !== currentToken) {
				setCurrentToken(token);
				setIsLoading(true);
				validateTokenLogic();
			}
		}, 500); // Verificar cada 500ms

		return () => clearInterval(interval);
	}, [currentToken]);

	if (isLoading) {
		return <div>Validando sesión...</div>; // O tu componente de loading
	}

	if (redirectIfAuthenticated && isAuthenticated) {
		return <Navigate to={redirectTo} />;
	}

	if (!redirectIfAuthenticated && !isAuthenticated) {
		return <Navigate to={redirectTo} />;
	}

	return children;
}
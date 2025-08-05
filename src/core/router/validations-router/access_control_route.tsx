import { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import WrapperLoading from "../../../app/components/wrapper_loading";
import { Row } from "../../../app/style_components/witgets_style_components";
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
	const [isLoading, setIsLoading] = useState(false);
	const [isAuthenticated, setIsAuthenticated] = useState(false);
	const [currentToken, setCurrentToken] = useState<string | null>(null);

	const validateTokenLogic = async () => {
		const token = getToken();

		if (!token) {
			setIsAuthenticated(false);
			setIsLoading(false);
			return;
		}
		setIsLoading(true);
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
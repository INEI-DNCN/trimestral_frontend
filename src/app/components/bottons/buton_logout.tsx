import React from "react";
import { LogOut } from "lucide-react";
import { hexToRgba } from "../../utils/util";

interface Props {
	onLogout?: () => void;
	textColor: string;
}

const ButtonLogout: React.FC<Props> = ({ onLogout, textColor }) => {
	return (
		<div style={{ padding: "16px", textAlign: "center" }}>
		<button
			onClick={onLogout}
			style={{
			display: "flex",
			alignItems: "center",
			gap: "8px",
			backgroundColor: "transparent",
			border: "none",
			color: textColor,
			cursor: "pointer",
			fontSize: "14px",
			padding: "8px 12px",
			borderRadius: "8px",
			transition: "background 0.2s",
			}}
			onMouseOver={(e) => {
				e.currentTarget.style.background = hexToRgba(textColor, 0.1);
			}}
			onMouseOut={(e) => {
				e.currentTarget.style.background = "transparent";
			}}
		>
			<LogOut size={18} />
			Cerrar sesión
		</button>
		</div>
	);
};

export default ButtonLogout;

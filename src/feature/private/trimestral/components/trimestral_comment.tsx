
import { EditIcon } from "lucide-react";
import { useState } from "react";
import { useSelector } from "react-redux";
import { DialogAction } from "../../../../app/components/enum/enum";
import type { RootState } from "../../../../core/store/store";
import { useThemeContext } from "../../../../core/theme/ThemeContext";
import { useUI } from "../../../../core/theme/ui_context";
import type { comentarioDTO } from "../trimestral_slice";
import TrimestralForm from "./trimestarl_form";

interface Props {
	comment: comentarioDTO;
	titleTrimestralID: any;
	year: string;
	quarter: string;
}

export const TrimestralComment: React.FC<Props> = ({ comment, titleTrimestralID, year, quarter }) => {

	const { onDialog } = useUI()
	const { currentTheme } = useThemeContext();
	const { oneUser } = useSelector((state: RootState) => state.perfil)

	const [isHovered, setIsHovered] = useState<boolean>(false);
	const handleActions = (action: DialogAction, group?: comentarioDTO) => {
		const dialogContentMap: Record<any, any> = {
			[DialogAction.update]: <TrimestralForm
				action={DialogAction.update}
				titleTrimestralID={titleTrimestralID}
				year={year} quarter={quarter}
				coment={group}
			/>,
		};
		onDialog({ children: dialogContentMap[action], maxWidth: "md", title: action });
	};

	const getDynamicEditorStyle = (
		isHovered: boolean,
		textColor: string,
		background: string
	): React.CSSProperties => ({
		position: "relative",
		boxSizing: "border-box",
		width: "100%",
		borderRadius: "12px",
		fontSize: "16px",
		lineHeight: "1.6",
		textAlign: "justify",
		whiteSpace: "pre-wrap",
		cursor: "pointer",
		padding: "30px",
		outline: "none",
		fontFamily: "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif",
		color: textColor,
		transition: "box-shadow 0.3s, border 0.3s, transform 0.3s",
		boxShadow: isHovered ? "0 12px 24px rgba(0, 0, 0, 0.08)" : "none",
		transform: isHovered ? "translateY(-2px)" : "none",
		background: isHovered ? background : "none",
		backdropFilter: isHovered ? "blur(6px)" : "none",
	});

	return (
		<div
			style={getDynamicEditorStyle(isHovered, currentTheme.text, currentTheme.background)}
			onMouseEnter={() => setIsHovered(true)}
			onMouseLeave={() => setIsHovered(false)}
		>
			{isHovered && oneUser.role.name === 'Editor' && (
				<button onClick={() => handleActions(DialogAction.update, comment)} style={floatingButtonStyle}>
					<EditIcon />
				</button>
			)}
			<div>{comment.contenido}</div>
		</div>
	);
};

const floatingButtonStyle: React.CSSProperties = {
	position: "absolute",
	top: "20px",
	right: "20px",
	padding: "4px",
	backgroundColor: "#2F2F2F",
	color: "#ffffff",
	border: "none",
	borderRadius: "5px",
	cursor: "pointer",
	boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
	opacity: "70%",
	display: "flex",
	justifyContent: "center",
	alignItems: "center",
};
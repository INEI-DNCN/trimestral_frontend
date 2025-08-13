
import { EditIcon } from "lucide-react";
import { styled } from "styled-components";
import { DialogAction } from "../../../../app/components/enum/enum";
import { useThemeContext } from "../../../../core/theme/ThemeContext";
import { useUI } from "../../../../core/theme/ui_context";
import type { comentarioDTO } from "../trimestral_slice";
import TrimestralForm from "./trimestarl_form";

interface Props {
	comment: comentarioDTO
}

export const TrimestralComment: React.FC<Props> = ({ comment }) => {

	const { currentTheme } = useThemeContext();

	const { onDialog } = useUI()

	const handleActions = (action: DialogAction, group?: comentarioDTO) => {

		const dialogContentMap: Record<any, any> = {
			[DialogAction.update]: <TrimestralForm action={DialogAction.update} coment={group} />,
		};

		onDialog({ children: dialogContentMap[action], maxWidth: "md", title: action });
	};

	return (
		<StyledCard
			$bgColor={currentTheme.background}
		>
			<button onClick={() => handleActions(DialogAction.update, comment)} style={floatingButtonStyle}>
				<EditIcon />
			</button>
			<div>{comment.contenido}</div>
		</StyledCard>
	);
};

const StyledCard = styled.div<{ $bgColor: string }>`
	background: ${(props) => props.$bgColor};
	border-radius: 12px;
	padding: 20px;
	box-shadow: 0 4px 10px rgba(0, 0, 0, 0.05);
	border: 1px solid rgba(0, 0, 0, 0.05);
	transition: all 0.2s ease;

	&:hover {
		box-shadow: 0 12px 24px rgba(0, 0, 0, 0.08);
		transform: translateY(-2px);
		border-color: rgba(0, 0, 0, 0.08);
	}
`;

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
import {
	CardContent,
	IconButton,
	Typography
} from "@mui/material"
import { EditIcon, LockIcon } from "lucide-react"
import styled from "styled-components"
import AvatarBox from "../../../../app/components/avatar_box"
import ButtonActionIcon from "../../../../app/components/bottons/button_action_icon"
import ButtonToggleStatus from "../../../../app/components/bottons/button_toggle_status"
import StatusIndicator from "../../../../app/components/status_indicator"
import { Column, Row } from "../../../../app/style_components/witgets_style_components"
import { useThemeContext } from "../../../../core/theme/ThemeContext"
import type { User } from "../../../perfil/perfil_slice"

const UserCard: React.FC<{
	user: User
	onEdit: (user: User) => void
	onChangePassword: (user: User) => void
	onToggleStatus: (user: User) => void
}> = ({ user, onEdit, onChangePassword, onToggleStatus }) => {

	const { theme, themes } = useThemeContext();

	return (
		<StyledCard $bgColor={themes[theme].background}>
			<UserCardContent>
				<Row alignItems="center" gap="1rem">
					<AvatarBox name={user.name} size={48} />
					<Column flex="1" gap="0.2rem">
						<Typography variant="body2" sx={{ color: themes[theme].text, fontWeight: 500, fontSize: "0.95rem" }}>
							{user.name + " " + user.firtName + " " + user.lastName}
						</Typography>
						<Typography variant="caption" color="text.secondary" sx={{ color: themes[theme].text, fontSize: "0.75rem" }}>
							{user.email}
						</Typography>
					</Column>

					<StatusIndicator isActive={user.isActive} />

					<Row gap="0.3rem" alignItems="center">
						<ButtonActionIcon
							onClick={() => onEdit(user)}
							icon={<EditIcon size={20} />}
						/>
						<IconButton
							size="small"
							onClick={() => onChangePassword(user)}
							sx={{
								color: "#64748b",
								backgroundColor: "rgba(0, 0, 0, 0.02)",
								"&:hover": {
									color: "#3b82f6",
									backgroundColor: "rgba(59, 130, 246, 0.08)",
									transform: "scale(1.05)"
								},
								transition: "all 0.2s ease"
							}}
						>
							<LockIcon size={20} />
						</IconButton>
						<ButtonToggleStatus
							isActive={user.isActive}
							onToggle={() => onToggleStatus(user)}
						/>
					</Row>
				</Row>
			</UserCardContent>
		</StyledCard>
	)
}

export default UserCard

const StyledCard = styled.div<{ $bgColor: string }>`
	background: ${(props) => props.$bgColor};
	border-radius: 12px;
	padding: 16px;
	box-shadow: 0 4px 10px rgba(0, 0, 0, 0.05);
	border: 1px solid rgba(0, 0, 0, 0.05);
	transition: all 0.2s ease;

	&:hover {
		box-shadow: 0 12px 24px rgba(0, 0, 0, 0.08);
		transform: translateY(-2px);
		border-color: rgba(0, 0, 0, 0.08);
	}
`;

const UserCardContent = styled(CardContent)`
	padding: 0.75rem 1rem !important;
	&:last-child {
		padding-bottom: 0.75rem !important;
	}
`

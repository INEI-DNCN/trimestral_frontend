import React from "react";
import { Box, Typography } from "@mui/material";
import styled from "styled-components";
import { Column, Row } from "../style_components/witgets_style_components";

interface Props {
	isActive?: boolean;
}

const StatusIndicator: React.FC<Props> = ({ isActive }) => {
	return (
		<Column alignItems="flex-start" justifyContent="center">
		<Row alignItems="center">
			<StatusDot $status={!!isActive} />
			<StatusText $status={!!isActive}>
			{isActive ? "Activo" : "Inactivo"}
			</StatusText>
		</Row>
		</Column>
	);
};

export default StatusIndicator;

// Estilos

const StatusDot = styled(Box)<{ $status: boolean }>`
	width: 6px;
	height: 6px;
	border-radius: 50%;
	background-color: ${(props) => (props.$status ? "#34d399" : "#f87171")};
	margin-right: 0.25rem;
`;

const StatusText = styled(Typography)<{ $status: boolean }>`
	&& {
		font-size: 0.75rem;
		color: ${(props) => (props.$status ? "#059669" : "#dc2626")};
		font-weight: 500;
	}
`;

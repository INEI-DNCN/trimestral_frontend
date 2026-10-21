import type { ReactNode } from "react";
import { FaFileExcel } from "react-icons/fa6";
import { HiDownload } from "react-icons/hi";
import { styled } from "styled-components";
import { CardUI } from "../../../../app/components/card/card";
import { Column } from "../../../../core/styled_ui/styled_ui";
import { useThemeContext } from "../../../../core/theme/ThemeContext";

interface Props {
	year: string;
	quarter: string;
	data: any;
	icon?: ReactNode;
}

export const TrimestralCard: React.FC<Props> = ({ year, quarter, data, icon }) => {
	const { theme, themes } = useThemeContext();
	const fileName = data.nombre.split('.')[0].replace(/_/g, ' ');
	const downloadUrl = year && quarter
		? `http://192.168.201.212:8080/${year}_${quarter}/Informatico/1.Informe_Tecnico/${data.nombre}`
		: undefined;

	return (
		<CardLink
			href={downloadUrl}
			aria-label={`Descargar archivo ${fileName}`}
			aria-disabled={!downloadUrl}
			tabIndex={downloadUrl ? undefined : -1}
			rel="noopener noreferrer"
		>
			<CardUI style={{ height: '150px', boxSizing: 'border-box', position: 'relative' }}>
				<Column style={{ alignItems: 'center', gap: '14px' }}>
					{icon ?? <FaFileExcel size={52} style={{ color: '#22c55e', flexShrink: 0 }} />}
					<FileName $color={themes[theme].text}>{fileName}</FileName>
				</Column>
				<DownloadIndicator aria-hidden="true">
					<HiDownload size={18} />
				</DownloadIndicator>
			</CardUI>
		</CardLink>
	);
};

const CardLink = styled.a`
	display: block;
	color: inherit;
	text-decoration: none;
	cursor: pointer;
	border-radius: 12px;

	&:hover {
		color: inherit;
	}

	&:hover > div {
		filter: brightness(1.06);
		border-color: rgba(148, 163, 184, 0.45);
	}

	&:focus-visible {
		outline: 2px solid #60a5fa;
		outline-offset: 3px;
	}

	&:hover > div > div:last-child,
	&:focus-visible > div > div:last-child {
		opacity: 1;
		transform: translateY(0);
	}
`;

const FileName = styled.div<{ $color: string }>`
	width: 100%;
	color: ${({ $color }) => $color};
	font-size: 0.75rem;
	line-height: 1.35;
	text-align: center;
	display: -webkit-box;
	-webkit-box-orient: vertical;
	-webkit-line-clamp: 2;
	overflow: hidden;
	overflow-wrap: anywhere;
`;

const DownloadIndicator = styled.div`
	position: absolute;
	top: 12px;
	right: 12px;
	width: 32px;
	height: 32px;
	display: flex;
	align-items: center;
	justify-content: center;
	border-radius: 50%;
	background: rgba(15, 23, 42, 0.72);
	color: #fff;
	opacity: 0;
	transform: translateY(-3px);
	transition: opacity 0.18s ease, transform 0.18s ease;
`;

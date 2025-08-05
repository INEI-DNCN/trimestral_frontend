import { Activity } from "lucide-react";
import styled from "styled-components";

const Logo: React.FC = () => {

	return (
		<Wrapper $bg={'#1f1f1f'} >
			<Activity strokeWidth={2} size={20} />
		</Wrapper>
	);
};

export default Logo;

const Wrapper = styled.div<{ $bg: string }>`
	cursor: pointer;
	width: 20px;
	background-color: ${({ $bg }) => $bg};
	color: white;
	padding: 6px;
	border-radius: 8px;
	display: flex;
	align-items: center;
	justify-content: center;
	box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
	user-select: none;
`;
import styled from "styled-components"
import LogoPillFinder from "../../../../core/logo/logo"
import { Button } from "../components/ui/button"
import { theme } from "../../style/theme"
import { useThemeContext } from "../../../../core/theme/ThemeContext"
const HeaderSection = () => {
	const { toggled, setToggled } = useThemeContext()
	return (
		<Header>
			<Container>
				<HeaderContent>
					<Logo>
						<LogoIcon>
							<LogoPillFinder />
						</LogoIcon>
						<LogoText>PillFinder</LogoText>
					</Logo>
					<Nav>
						<NavLink href="#">Inicio</NavLink>
						{/* <NavLink href="#">Contacto</NavLink> */}
					</Nav>
					{/* Solo mostrar el botón Menú en mobile y cuando el sidebar NO está visible */}
					{!toggled && (
						<MobileMenuButton
							variant="outline"
							onClick={() => setToggled(true)}
						>
							Menú
						</MobileMenuButton>
					)}
				</HeaderContent>
			</Container>
		</Header>
	)
}

export default HeaderSection

export const Header = styled.header`
	position: sticky;
	top: 0;
	z-index: 50;
	background-color: rgba(255, 255, 255, 0.8);
	backdrop-filter: blur(8px);
	border-bottom: 1px solid ${theme.colors.primary[100]};
`

export const Container = styled.div`
	max-width: 1280px;
	margin: 0 auto;
	padding: 0 1rem;

	@media (min-width: ${theme.breakpoints.sm}) {
		padding: 0 1.5rem;
	}

	@media (min-width: ${theme.breakpoints.lg}) {
		padding: 0 2rem;
	}
`

export const HeaderContent = styled.div`
	display: flex;
	align-items: center;
	justify-content: space-between;
	padding: 1rem 0;
`

export const Logo = styled.div`
	display: flex;
	align-items: center;
	gap: 0.75rem;
`

export const LogoIcon = styled.div`
	width: 2.5rem;
	height: 2.5rem;
	border-radius: 50%;
	display: flex;
	align-items: center;
	justify-content: center;
	color: ${theme.colors.white};
`

export const LogoText = styled.h1`
	font-size: 1.5rem;
	font-weight: 700;
	color: ${theme.colors.primary[700]};
`

export const Nav = styled.nav`
	display: none;
	align-items: center;
	gap: 2rem;

	@media (min-width: ${theme.breakpoints.md}) {
		display: flex;
	}
`

export const NavLink = styled.a`
	color: ${theme.colors.gray[600]};
	font-weight: 500;
	text-decoration: none;
	transition: color 0.2s ease-in-out;

	&:hover {
		color: ${theme.colors.primary[600]};
	}
`

const MobileMenuButton = styled(Button)`
	background: transparent;
	display: inline-flex;
	@media (min-width: ${theme.breakpoints.md}) {
		display: none;
	}
`


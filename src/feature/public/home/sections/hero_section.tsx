import { Search, MapPin, DollarSign } from "lucide-react"
import styled from "styled-components"
import { theme } from "../../style/theme"
import { Button } from "../components/ui/button"

const features = [
	{
		icon: <Search className="h-6 w-6" />,
		title: "Búsqueda inteligente",
		description: "Encuentra cualquier medicamento de forma rápida y sencilla",
	},
	{
		icon: <MapPin className="h-6 w-6" />,
		title: "Farmacias cercanas",
		description: "Localiza las farmacias más próximas a tu ubicación",
	},
	{
		icon: <DollarSign className="h-6 w-6" />,
		title: "Mejores precios",
		description: "Compara precios y ahorra en tus medicamentos",
	},
]

const HeroSection = () => (
	<HeroSectionLayout>
		<HeroTitle>
		Encuentra el medicamento que necesitas,{" "}
			<ColoredText color={theme.colors.primary[600]}>cerca de ti</ColoredText> y al{" "}
			<ColoredText color={theme.colors.emerald[600]}>mejor precio</ColoredText>
		</HeroTitle>
		<HeroSubtitle>
			Compara precios en farmacias de tu zona y ahorra en tus medicamentos de forma rápida y segura
		</HeroSubtitle>

		<SearchContainer>
			<SearchIconWrapper>
				<Search size={20} />
			</SearchIconWrapper>
			<SearchInput type="text" placeholder="Busca tu medicamento (ej: paracetamol, ibuprofeno...)" />
			<SearchButton size="lg">Buscar</SearchButton>
		</SearchContainer>

		<FeaturesGrid>
			{features.map((feature, index) => (
				<FeatureItem key={index}>
				<FeatureIcon>{feature.icon}</FeatureIcon>
				<FeatureContent>
					<FeatureTitle>{feature.title}</FeatureTitle>
					<FeatureDescription>{feature.description}</FeatureDescription>
				</FeatureContent>
				</FeatureItem>
			))}
		</FeaturesGrid>
	</HeroSectionLayout>
)

export default HeroSection

export const HeroSectionLayout = styled.section`
	text-align: center;
	max-width: 64rem;
	margin: 0 auto 4rem auto;
`

export const HeroTitle = styled.h2`
	font-size: 1.8rem;
	font-weight: 700;
	color: ${theme.colors.gray[800]};
	line-height: 1.2;
	margin-bottom: 1.5rem;

	@media (min-width: ${theme.breakpoints.sm}) {
		font-size: 2.2rem;
	}

	@media (min-width: ${theme.breakpoints.md}) {
		font-size: 2.5rem;
	}

	@media (min-width: ${theme.breakpoints.lg}) {
		font-size: 3rem;
	}

	@media (min-width: ${theme.breakpoints.xl}) {
		font-size: 3.5rem;
	}
`;

const ColoredText = styled.span<{ color: string }>`
	color: ${(props) => props.color};
`

export const HeroSubtitle = styled.p`
	font-size: 1rem;
	color: ${theme.colors.gray[600]};
	max-width: 32rem;
	margin: 0 auto 2rem auto;
	line-height: 1.6;
	text-align: center;

	@media (min-width: ${theme.breakpoints.sm}) {
		font-size: 1.125rem;
	}

	@media (min-width: ${theme.breakpoints.md}) {
		font-size: 1.25rem;
	}

	@media (min-width: ${theme.breakpoints.lg}) {
		font-size: 1.375rem;
	}
`;

export const SearchContainer = styled.div`
  width: 100%;
  max-width: 100%;
  margin: 0 auto 2rem auto;
  position: relative;
  padding: 0 1rem;
  box-sizing: border-box;

  @media (min-width: 768px) {
    max-width: 32rem;
  }
`;


export const SearchIconWrapper = styled.div`
	position: absolute;
	left: 1rem;
	top: 50%;
	transform: translateY(-50%);
	color: ${theme.colors.primary[500]};
`

export const SearchButton = styled(Button)`
	position: absolute;
	right: 0.5rem;
	top: 50%;
	transform: translateY(-50%);
	border-radius: ${theme.borderRadius.full};
	padding: 0 2rem;
`

export const FeaturesGrid = styled.div`
	display: grid;
	gap: 1.5rem;
	margin-bottom: 4rem;

	@media (min-width: ${theme.breakpoints.md}) {
		grid-template-columns: repeat(3, 1fr);
	}
`

export const FeatureItem = styled.div`
	display: flex;
	align-items: center;
	justify-content: center;
	gap: 0.75rem;
	color: ${theme.colors.gray[600]};
`

export const FeatureIcon = styled.div`
	color: ${theme.colors.primary[500]};
`

export const FeatureContent = styled.div`
	text-align: left;
`

export const FeatureTitle = styled.div`
	font-weight: 600;
`

export const FeatureDescription = styled.div`
	font-size: 0.875rem;
`
export const Input = styled.input`
  width: 100%;
  padding: 0.75rem 1rem;
  font-size: 1rem;
  border: 2px solid ${theme.colors.gray[200]};
  border-radius: ${theme.borderRadius.md};
  box-sizing: border-box;
  transition: border-color 0.2s ease, box-shadow 0.2s ease;

  &::placeholder {
    color: ${theme.colors.gray[400]};
  }

  &:focus {
    outline: none;
    border-color: ${theme.colors.primary[400]};
    box-shadow: 0 0 0 3px ${theme.colors.primary[100]};
  }

  &:disabled {
    background-color: ${theme.colors.gray[50]};
    cursor: not-allowed;
    color: ${theme.colors.gray[400]};
  }
`;

export const SearchInput = styled(Input)`
  font-size: 0.95rem;
  height: 3rem;
  padding-left: 2.5rem;
  padding-right: 5rem;
  border-radius: ${theme.borderRadius.full};
  border-color: ${theme.colors.primary[200]};
  box-shadow: ${theme.shadows.lg};

  &:focus {
    border-color: ${theme.colors.primary[400]};
    box-shadow: 0 0 0 3px ${theme.colors.primary[100]}, ${theme.shadows.lg};
  }

  /* Tablets */
  @media (min-width: 481px) {
    height: 3.25rem;
    font-size: 1rem;
    padding-left: 3rem;
    padding-right: 6rem;
  }

  /* Laptops/Desktops */
  @media (min-width: 768px) {
    height: 3.5rem;
    font-size: 1.125rem;
    padding-right: 8rem;
  }
`;


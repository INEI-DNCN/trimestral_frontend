import styled from "styled-components";
import { Column, Row } from "../../../core/styled_ui/styled_ui";
import { useThemeContext } from "../../../core/theme/ThemeContext";

// Logo oficial Swagger como componente SVG
const SwaggerIcon = ({ size = 40 }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={size}
    height={size}
    viewBox="0 0 122.88 122.88"
    fill="#3b82f6"
  >
    <path d="M61.44 0C27.5 0 0 27.5 0 61.44s27.5 61.44 61.44 61.44 61.44-27.5 61.44-61.44S95.38 0 61.44 0zm0 112.19c-28 0-50.75-22.75-50.75-50.75S33.44 10.69 61.44 10.69 112.19 33.44 112.19 61.44 89.44 112.19 61.44 112.19z" />
    <path d="M61.44 35.89a25.55 25.55 0 0 0-25.55 25.55c0 4.84 1.31 9.36 3.6 13.26l-2.54 9.5c-.3 1.13.74 2.08 1.85 1.74l9.12-2.9a25.46 25.46 0 0 0 13.52 3.9 25.55 25.55 0 1 0 0-51.05zm0 36.5a10.95 10.95 0 1 1 0-21.9 10.95 10.95 0 0 1 0 21.9z" />
  </svg>
);

const SwaggerCard = styled.div`
  width: 70%;
  padding: 20px;
  border-radius: 16px;
  border: 1px solid rgba(0, 0, 0, 0.06);
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.06);
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
  transition: all 0.25s ease-in-out;

  &:hover {
    transform: translateY(-4px);
    box-shadow: 0 8px 20px rgba(0, 0, 0, 0.12);
  }
`;



const Title = styled.div`
  font-size: 18px;
  font-weight: 600;
`;

const Subtitle = styled.div`
  font-size: 14px;
  text-align: center;
`;

const GoButton = styled.a`
  padding: 8px 16px;
  background-color: #3b82f6;
  color: #323232;
  font-size: 14px;
  font-weight: 500;
  text-decoration: none;
  border-radius: 8px;
  transition: background-color 0.2s ease;

  &:hover {
    background-color: #3b82f6;
  }
`;

export default function CardSwagger() {

  const { currentTheme, themes } = useThemeContext()
  return (
    <Row width="100%" justifyContent="center" mt={2}>
      <SwaggerCard style={{ background: currentTheme.background }}>
        <Column alignItems="center">
          <Row>
            <SwaggerIcon size={28} />
            <Title style={{ color: currentTheme.text }}>Swagger</Title>
          </Row>
          <Subtitle style={{ color: themes.colors.disabled }}>Ver documentación del API</Subtitle>
          <GoButton
            href="http://192.168.201.212:681/api/docs"
            target="_blank"
            rel="noopener noreferrer"
            style={{ color: currentTheme.background }}
          >
            Ir →
          </GoButton>
        </Column>
      </SwaggerCard>
    </Row>
  );
}

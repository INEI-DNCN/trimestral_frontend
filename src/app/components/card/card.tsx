import { CardStyled } from "../../../core/styled_ui/styled_ui";
import { useThemeContext } from "../../../core/theme/ThemeContext";

interface Props {
  children: React.ReactNode;
  style?: React.CSSProperties; // para que puedas pasar estilos inline opcionales
}

export const CardUI: React.FC<Props> = ({ children, style }) => {
  const { currentTheme } = useThemeContext();

  return (
    <CardStyled
      style={style}
      $background={currentTheme.background}
      $color={currentTheme.text}
    >
      {children}
    </CardStyled>
  );
};
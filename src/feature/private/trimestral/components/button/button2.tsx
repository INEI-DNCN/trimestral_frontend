import { Button } from "@mui/material";

interface Props {
  onClick?: () => void;
  title: string;
  icon: React.ReactNode;
  toolcolor?: string;        // Color del texto y el icono
  bordercolor?: string;      // Color del borde
  bgcolor?: string;          // Fondo opcional (por defecto blanco)
}

const Button2: React.FC<Props> = ({
  onClick,
  title,
  icon,
  toolcolor = "#c11",
  bordercolor = "#c11",
  bgcolor = "#fff",
}) => {
  return (
    <Button
      onClick={onClick}
      startIcon={icon}
      sx={{
        background: bgcolor,
        color: toolcolor,
        textTransform: "none",
        fontWeight: 600,
        letterSpacing: 1,
        borderRadius: "18px",
        // Sombra interna siempre presente, más una externa suave
        boxShadow: `inset 0 2px 8px 0 ${bordercolor}22, 0 2px 8px 0 #0001`,
        border: `2px solid ${bordercolor}`,
        transition: "box-shadow 0.25s, border-color 0.2s, background 0.2s",
        '&:hover': {
          background: bgcolor,
          // Mantén la sombra interna y haz la externa más notoria al hacer hover
          boxShadow: `inset 0 2px 8px 0 ${bordercolor}22, 0 4px 16px 0 #0002`,
          borderColor: bordercolor,
          opacity: 1,
        },
        '& .MuiButton-startIcon': {
          color: toolcolor,
          filter: "none",
        },
      }}
      variant="contained"
    >
      {title}
    </Button>
  );
};

export default Button2;

import { Box, Typography } from "@mui/material";
import { Cloud, Cpu, Database, RefreshCw, Settings } from "lucide-react"; // o tus íconos favoritos
import React, { useEffect, useState } from "react";
import { themes } from "../../core/theme/ThemeContext";

const icons = [Cpu, Database, Settings, RefreshCw, Cloud];

interface Props {
  text?: string; // opcional, por si no lo pasan
  color?: string
}

const WrapperLoading: React.FC<Props> = ({ text = "Cargando...", color = themes.colors.disabled }) => {

  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % icons.length);
    }, 900);
    return () => clearInterval(interval);
  }, []);


  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        height: "100%",
        width: "100%",
        gap: 4,
      }}
    >
      <Box
        sx={{
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "center",
          gap: 3,
          transition: "transform 0.3s ease-in-out",
        }}
      >
        {icons.map((Icon, index) => {
          const isActive = index === activeIndex;
          return (
            <Box
              key={index}
              sx={{
                transform: isActive ? "scale(1.6)" : "scale(1)",
                opacity: isActive ? 1 : 0.5,
                transition: "transform 0.3s ease, opacity 0.3s ease",
                color: color, // azul grisáceo elegante
              }}
            >
              <Icon size={isActive ? 42 : 28} />
            </Box>
          );
        })}
      </Box>
      <Typography
        variant="subtitle1"
        sx={{
          color: color,
          fontWeight: 500,
          letterSpacing: "0.5px",
          animation: "fadeInOut 2s infinite ease-in-out",
        }}
      >
        {text}
      </Typography>
    </Box>
  );
};

export default WrapperLoading;

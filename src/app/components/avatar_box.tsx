import React from "react";
import { Avatar } from "@mui/material";

interface Props {
  name: string;
  size?: number; // opcional: permite cambiar tamaño
}

const AvatarBox: React.FC<Props> = ({ name, size = 40 }) => {
  const getAvatarColor = (name: string) => {
    const colors = ["#3b82f6", "#8b5cf6", "#06b6d4", "#10b981", "#f59e0b", "#ef4444"];
    const index = name.charCodeAt(0) % colors.length;
    return colors[index];
  };

  const initials = name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .substring(0, 2)
    .toUpperCase();

  return (
    <Avatar
      sx={{
        bgcolor: getAvatarColor(name),
        width: size,
        height: size,
        fontSize: size * 0.4,
        fontWeight: 500,
        boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
      }}
    >
      {initials}
    </Avatar>
  );
};

export default AvatarBox;

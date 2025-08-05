import React, { createContext, useContext, useState } from "react";

export const themes = {
  colors: {
    primary: '#3b82f6',
    primaryHover: '#2563eb',
    danger: '#e74c3c',
    success: '#10b981',
    disabled: '#6c757d',
  },
  light: {
    text: '#212529',
    background: '#ffffff',
    backgroundBase: '#F5F6F8',
    borderColor: '#e4e4e4',
    menu:{
      backgroundSub:"#ffffff",
      backgroundActive :'#e2e6ea',
    },
  },
  dark: {
    text: '#f8f9fa',
    background: '#343a40',
    backgroundBase: '#2C2F36',
    borderColor: '#2d3136',
    menu:{
      backgroundSub:"#212529",
      backgroundActive :'#495057',
    }
  }
};

type Theme = 'light' | 'dark';


export const ThemeContext = createContext<{
  theme: Theme;
  setTheme: (theme: Theme) => void;
  themes: typeof themes;
  toggled: boolean;
  setToggled: (v: boolean) => void;
}>({
  theme: 'light',
  setTheme: () => {},
  themes,
  toggled: false,
  setToggled: () => {},
});

export const useThemeContext = () => useContext(ThemeContext);

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [theme, setTheme] = useState<Theme>(
    localStorage.getItem("sidebarTheme") === "dark" ? "dark" : "light"
  );

  const [toggled, setToggled] = useState(false);

  return (
    <ThemeContext.Provider value={{
      theme,
      setTheme,
      themes,
      toggled,
      setToggled,
    }}>
      {children}
    </ThemeContext.Provider>
  );
};

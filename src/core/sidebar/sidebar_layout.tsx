// src/components/sidebar/SidebarPublicComponent.tsx
import { Typography } from "@mui/material";
import { AppWindow, BadgeCheck, Key, Layers3, List, Users } from "lucide-react";
import React, { useEffect, useState } from "react";
import {
  Menu,
  MenuItem,
  Sidebar,
  SubMenu,
  menuClasses,
  type MenuItemStyles
} from "react-pro-sidebar";
import { Outlet } from "react-router-dom";
import styled from "styled-components";
import CardSwagger from "../../app/components/card/card_swagger";
import { hexToRgba } from "../../app/utils/util";
import { useThemeContext } from "../theme/ThemeContext";
import { useUI } from "../theme/ui_context";
import { SidebarHeader } from "./components/sidebar_header";

interface SidebarProps {
  menuItems: any[];
  basePath: string;
}

const Sidebar_layout: React.FC<SidebarProps> = ({ menuItems, basePath }) => {
  const [collapsed, setCollapsed] = useState(() => JSON.parse(localStorage.getItem("sidebarCollapsed") || "false"));
  const [hasImage] = useState(false);
  const [toggled, setToggled] = useState(false);
  const { navigate, location } = useUI()

  const [openSubMenus, setOpenSubMenus] = useState<{ [key: string]: boolean }>(
    () => JSON.parse(localStorage.getItem("sidebarOpenSubMenus") || "{}")
  );

  const [activeMenu, setActiveMenu] = useState(() => localStorage.getItem("sidebarActiveMenu") || location.pathname);
  const { themes, currentTheme } = useThemeContext();

  const iconsMap: Record<string, React.FC<{ size?: number }>> = {
    AppWindow,
    Layers3,
    List,
    Key,
    BadgeCheck,
    Users
  };

  const getLastPathSegment = (path: string) => {
    const parts = path.split("/").filter(Boolean); // elimina vacíos
    return parts[parts.length - 1]; // devuelve el último segmento
  };

  useEffect(() => {
    const lastSegment = getLastPathSegment(location.pathname);
    setActiveMenu(lastSegment);
    localStorage.setItem("sidebarActiveMenu", lastSegment);
  }, [location.pathname]);

  const handleChange = (menu: string) => {
    setActiveMenu(menu);
    localStorage.setItem("sidebarActiveMenu", menu);
    navigate(`${basePath}/${menu}`);
  };

  const handleCollapseToggle = () => {
    const newCollapsedState = !collapsed;
    setCollapsed(newCollapsedState);
    localStorage.setItem("sidebarCollapsed", JSON.stringify(newCollapsedState));
  };

  const handleSubMenuToggle = (key: string) => {
    setOpenSubMenus((prev) => {
      const updated = { ...prev, [key]: !prev[key] };
      localStorage.setItem("sidebarOpenSubMenus", JSON.stringify(updated));
      return updated;
    });
  };

  const isSubMenuOpen = (key: string) => !!openSubMenus[key];

  const menuItemStyles: MenuItemStyles = {
    root: {
      fontSize: "13px", fontWeight: 400,
    },
    icon: {
      color: themes.colors.primaryHover,
      [`&.${menuClasses.disabled}`]: { color: themes.colors.disabled },
    },
    SubMenuExpandIcon: { color: "#b6b7b9" },
    subMenuContent: ({ level }) => ({
      backgroundColor: level === 0 ? hexToRgba(currentTheme.menu.backgroundSub, hasImage && !collapsed ? 0.4 : 1) : "transparent",
    }),
    button: ({ active }) => ({
      [`&.${menuClasses.disabled}`]: { color: themes.colors.disabled },
      "&:hover": {
        backgroundColor: hexToRgba(themes.colors.primary, hasImage ? 0.8 : 1),
        color: "#fff",
      },
      backgroundColor: active ? hexToRgba(currentTheme.menu.backgroundActive, hasImage ? 0.8 : 1) : undefined,
      color: active ? currentTheme.text : undefined,
      fontWeight: active ? 700 : undefined,
    }),
    label: ({ open }) => ({
      fontWeight: open ? 200 : undefined,
    }),
  };

  const renderMenuItems = (items: any[]) =>
    items.map((item) => {
      if (item.sectionTitle) {
        return (
          <div key={item.label} style={{ padding: "0 24px", marginBottom: "8px" }}>
            <Typography
              variant="body2"
              fontWeight={600}
              style={{ opacity: collapsed ? 0 : 0.7, letterSpacing: "0.5px", fontFamily: "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif" }}
            >
              {item.label}
            </Typography>
          </div>
        );
      }

      if (item.children) {
        return (
          <SubMenu
            key={item.key}
            icon={iconsMap[item.icon] && React.createElement(iconsMap[item.icon], { size: 18 })}
            label={item.label}
            defaultOpen={isSubMenuOpen(item.key)}
            onOpenChange={() => handleSubMenuToggle(item.key)}
          >
            {renderMenuItems(item.children)}
          </SubMenu>
        );
      }

      return (
        <MenuItem
          key={item.path}
          icon={iconsMap[item.icon] && React.createElement(iconsMap[item.icon], { size: 18 })}
          onClick={() => handleChange(item.path)}
          active={activeMenu === item.path}
        >
          {item.label}
        </MenuItem>
      );
    });

  return (
    <SidebarWrapper $backgroundColor={currentTheme.backgroundBase}>
      <Sidebar
        collapsed={collapsed}
        toggled={toggled}
        onBackdropClick={() => setToggled(false)}
        breakPoint="md"
        backgroundColor={hexToRgba(currentTheme.backgroundBase, hasImage ? 0.9 : 1)}
        rootStyles={{
          color: currentTheme.text,
          zIndex: 1200,
          borderRight: `0px`,
        }}
      >
        <SidebarHeader onIconClick={handleCollapseToggle} />
        <WrapperMenu $backgroundColor={currentTheme.background}>
          <Menu menuItemStyles={menuItemStyles}>
            {renderMenuItems(menuItems)}
          </Menu>
        </WrapperMenu>
        {!collapsed && (<CardSwagger />)}

      </Sidebar>
      <SidebarContent $theme={currentTheme}>
        <Outlet />
      </SidebarContent>
    </SidebarWrapper>
  );
};

export default Sidebar_layout;


const SidebarWrapper = styled.div<{ $backgroundColor: any }>`
  display: flex;
  width: 100vw;
  height: 100vh;
  background-color: ${({ $backgroundColor }) => $backgroundColor};
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif;
`;

const SidebarContent = styled.div<{ $theme: any }>`
  flex-grow: 1;
  transition: margin-left 0.3s ease;
  padding: 16px 20px;
  overflow: hidden;
`;

const WrapperMenu = styled.div<{ $backgroundColor: any }>`
  background: ${({ $backgroundColor }) => $backgroundColor};
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.05);
  border: 1px solid rgba(0, 0, 0, 0.05);
  border-radius: 0px 12px 12px 0px;
  padding: 16px 0px;
`;

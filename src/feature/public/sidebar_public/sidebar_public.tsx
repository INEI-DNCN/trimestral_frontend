

const SidebarPublic: React.FC = () => {
 

  // const menuItemStyles: MenuItemStyles = {
  //   root: { fontSize: "13px", fontWeight: 400 },
  //   icon: {
  //     color: colorPrimary ,
  //     [`&.${menuClasses.disabled}`]: { color: themes[theme].menu.disabled.color },
  //   },
  //   SubMenuExpandIcon: { color: "#b6b7b9" },
  //   subMenuContent: ({ level }) => ({
  //     backgroundColor: level === 0 ? hexToRgba(themes[theme].menu.menuContent, hasImage && !collapsed ? 0.4 : 1) : "transparent",
  //   }),
  //   button: ({ active }) => ({
  //     [`&.${menuClasses.disabled}`]: { color: themes[theme].menu.disabled.color },
  //     "&:hover": {
  //       backgroundColor: hexToRgba(themes[theme].menu.hover.backgroundColor, hasImage ? 0.8 : 1),
  //       color: themes[theme].menu.hover.color,
  //     },
  //     backgroundColor: active ? colorPrimary : undefined,
  //     color: active ? themes[theme].sidebar.backgroundColor : undefined,
  //     fontWeight: active ? 700 : undefined,
  //   }),
  //   label: ({ open }) => ({
  //     fontWeight: open ? 200 : undefined,
  //   }),
  // };

  return (
    <div style={{ display: "flex", width: "100vw", height: "100vh",}}>
      {/* {toggled && !isLargeScreen &&  (
        <Sidebar
          collapsed={collapsed}
          toggled={toggled}
          onBackdropClick={() => setToggled(false)}
          breakPoint="lg"
          backgroundColor={hexToRgba(themes[theme].sidebar.backgroundColor, hasImage ? 0.9 : 1)}
          rootStyles={{
            color: themes[theme].sidebar.color,
            zIndex: 1200,
            borderRight: `1px solid ${themes[theme].menu.borderRight}`,
          }}
        >
          <SidebarHeader style={{ marginBottom: "10px", marginTop: "16px" }} />

          <div
            onClick={handleCollapseToggle}
            style={{
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              justifyContent: collapsed ? "center" : "start",
              color: colorPrimary,
              paddingLeft: collapsed ? 0 : "24px",
              marginBottom: "20px",
            }}
          >
            <TbBoxAlignLeftFilled size={24} />
          </div>

          <Menu menuItemStyles={menuItemStyles}>
            {renderMenuItems(menuItems)}
            <SidebarSwitchMode sx={{ m: 1 }} checked={theme === "dark"} onChange={handleThemeChange} />
          </Menu>
        </Sidebar>
      )}
      <div
        style={{
          flexGrow: 1,
          transition: "margin-left 0.3s ease",
          overflow: "hidden",
          background: themes[theme].body.backgroundColor,
        }}
      >
        <Outlet />
      </div> */}
    </div>
  );
};

export default SidebarPublic;

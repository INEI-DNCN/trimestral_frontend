import type { JSX } from "react";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import { getToken } from "../../app/utils/utils_localstorage";
import type { RootState } from "../store/store";

const RoutePublic = ({ children }: { children: JSX.Element }) => {
  const token = getToken();
  const { menus } = useSelector((state: RootState) => state.router);

  if (token && (!menus || menus.length === 0)) {
    return null;
  }

  const validMenu = token ? menus.find(m => m?.path) : null;

  if (token && !validMenu) {
    return null;
  }

  if (token && validMenu) {
    return <Navigate to={`/private/${validMenu.path}`} replace />;
  }

  return children;
};

export default RoutePublic;
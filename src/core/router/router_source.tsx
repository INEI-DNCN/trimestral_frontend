import { API2 } from "../../app/utils/utils_api";
import type { Menu } from "../../feature/private/menu/menu_slice";
import { menusError, menusSuccess, startLoading } from "./router_slice";

export interface Props {
  applicationId?: string;
  userId?: string;
}

export const getMenusSource =
  ({ applicationId, userId }: Props) =>
    async (dispatch: any) => {
      try {
        dispatch(startLoading());
        const response = await API2.get(
          `menus-users/tree?applicationId=${applicationId}&userId=${userId}`
        );

        const cleanedData = cleanMenus(response.data);
        dispatch(menusSuccess(cleanedData));
        return cleanedData;
      } catch (err: any) {
        dispatch(menusError(err.message || "Error al cargar los menús"));
        throw err;
      }
    };

export const getMenusByAplicationSource = () =>
  async (dispatch: any) => {
    try {
      const applicationClientId = import.meta.env.VITE_CLIENTE_ID
      const response = await API2.get(`menus/by-application/${applicationClientId}`);
      const cleanedData = cleanMenus(response.data);
      dispatch(menusSuccess(cleanedData));
      return cleanedData;
    } catch (err: any) {
      throw err;
    }
  };

function cleanMenus(menus: Menu[]): Menu[] {
  return menus.map((menu) => {
    const cleanedChildren = menu.children ? cleanMenus(menu.children) : [];

    if (cleanedChildren.length > 0) {
      return { ...menu, children: cleanedChildren };
    }

    // quitar children si está vacío o no existe
    const { children, ...menuWithoutChildren } = menu;
    return menuWithoutChildren;
  });
}

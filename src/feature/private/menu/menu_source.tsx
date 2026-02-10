import type { getPagination } from "../../../app/components/interface/pagination_response_interface";
import { API } from "../../../app/utils/utils_api";
import { MenusPaginationSlice, UsersByMenuPaginationSlice, type MenuDTO, type MenuUsersDto } from "./menu_slice";


export const getMenusPagination = ({
	page = 1,
	limit = 8,
	applicationId = '',
}: getPagination) => async (dispatch: any) => {

	try {
		const response = await API.get('menus/pagination/tree', {
			params: { page, limit, applicationId },
		});

		dispatch(MenusPaginationSlice(response.data));
	} catch (error) {
		console.error('Error en getAplicationPagination:', error);
	}

};

export async function createMenuSource(menu: MenuDTO) {
	return await API.post(`menus`, menu);
}

export async function updateMenuSource(menu: MenuDTO) {
	try {
		const response = await API.put(`menus/${menu.id}`, menu);
		return response
	} catch (error) {
		console.error("Error en updateMenuSource:", error);
	}
}

export async function deleteMenuSource(menuDTO: MenuDTO) {
	return await API.delete(`menus/${menuDTO.id}`);
}

// usuarios por grupo
export const getUsersByMenuPagination = ({
	id,
	page = 1,
	limit = 4,
	search = '',
}: getPagination) => async (dispatch: any) => {

	try {
		const response = await API.get(`menus-users/with-menu-flag/${id}`, {
			params: { page, limit, search },
		});
		dispatch(UsersByMenuPaginationSlice(response.data));
	} catch (error) {
		console.error('Error en getUsersByMenusPagination:', error);
	}
};

export async function createMenuUserSource(menuUsersDto: MenuUsersDto) {
	return await API.post(`menus-users`, menuUsersDto);
}

export async function updateMenuUserSource(menuUsersDto: MenuUsersDto, id: string) {
	return await API.put(`menus-users`, {
		id,
		roleId: menuUsersDto.roleId
	});
}

export async function deleteMenuUserSource(menuUsersDto: MenuUsersDto) {
	return await API.delete(`menus-users`, { data: menuUsersDto });
}




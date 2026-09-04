import type { getPagination } from "../../../app/components/interface/pagination_response_interface";
import { API } from "../../../app/utils/utils_api";
import { UsersByMenuPaginationSlice } from "./menu_slice";

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





import type { getPagination } from "../../../app/components/interface/pagination_response_interface";
import { API } from "../../../app/utils/utils_api";
import { UsersByMenuPaginationSlice } from "./menu_slice";


// export const getMenusPagination = ({
// 	page = 1,
// 	limit = 8,
// 	applicationId = '',
// }: getPagination) => async (dispatch: any) => {

// 	try {
// 		const response = await API.get('menus/pagination/tree', {
// 			params: { page, limit, applicationId },
// 		});

// 		dispatch(MenusPaginationSlice(response.data));
// 	} catch (error) {
// 		console.error('Error en getAplicationPagination:', error);
// 	}

// };


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





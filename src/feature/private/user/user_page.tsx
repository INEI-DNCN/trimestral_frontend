import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getUserPagination, updateUserSource } from "./user_source";
import { DialogAction } from "../../../app/components/enum/enum";
import { Plus } from "lucide-react";
import UserCard from "./components/user_card";
import { Column, Container, Row, ScrollFade } from "../../../app/style_components/witgets_style_components";
import UserForm from "./components/user_form";
import ButtonAction from "../../../app/components/bottons/button_action";
import InputfieldSearch from "../../../app/components/Input_field_search";
import type { RootState } from "../../../core/store/store";

import Header from "../../../app/components/header";
import { getPaginationProgress } from "../../../app/components/interface/pagination_response_interface";
import EmptyState from "../../../app/components/empty_state";
import UserFormPassword from "./components/user_form_password";
import { getAplicationPagination } from "../aplication/aplication_source";
import PaginationCircle from "../../../app/components/pagination_circle";
import type { User } from "./user_slice";
import type { PageProps } from "../../../app/components/interface/router_interface";
import { UserDropdown } from "../../../app/components/user_dropdown";


const UserPage : React.FC<PageProps>  = (PageProps) => {
	const dispatch:any = useDispatch()

	const [searchTerm, setSearchTerm] = useState("")

	const { usersPagination } = useSelector((state: RootState) => state.user )

	useEffect(() => {
		dispatch(getUserPagination({}))
	}, [])

	const handleToggleStatus = async (user: User) => {
		const updatedIsActive = !user.isActive;
		const updatedData = {
			...user,
			isActive: updatedIsActive,
		};
		await updateUserSource(updatedData);
		dispatch(getUserPagination( {page: usersPagination?.meta?.currentPage} ));
	};

	const handlePageChange = (_: React.ChangeEvent<unknown>, value: number) => {
		dispatch(getAplicationPagination( { page:value } ))
	}

	const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		setSearchTerm(event.target.value)

	}

	const handleActions = (action: DialogAction, user?: User) => {
		const dialogContentMap: Record<any, any> = {
			[DialogAction.create]: <UserForm onSnackbar={PageProps.onSnackbar} meta={usersPagination?.meta } handleClose={PageProps.handleCloseDialog}/>,
			[DialogAction.update]: <UserForm onSnackbar={PageProps.onSnackbar} meta={usersPagination?.meta } user={user} handleClose={PageProps.handleCloseDialog} />,
			[DialogAction.password]: <UserFormPassword  onSnackbar={PageProps.onSnackbar} meta={usersPagination?.meta } user={user} handleClose={PageProps.handleCloseDialog}/>,
		};

		PageProps.onDialog({ children: dialogContentMap[action], maxWidth: "sm", title: action });
	};

	const { shownCount, totalItems } = getPaginationProgress(usersPagination?.meta);

	return (
		<Container >
			<header style={{padding: '20px 20px 0px 20px'}}>
				<Row style={{marginBottom:'1rem', justifyContent:'space-between', alignItems: 'center'}}>
					<Header
						title={PageProps.items?.label}
						filteredCount={shownCount}
						totalCount={totalItems}
					/>
					{/* <Status
						activeUsers={user?.items.filter((e:User ) => e.isActive).length ?? 0}
						inactiveUsers={user?.items.filter((e:User ) => !e.isActive).length ?? 0}
						totalUsers={(user?.meta?.itemCount ?? 0)}
					/> */}
					<UserDropdown />
				</Row>
				<Row>
					<InputfieldSearch
						value={searchTerm}
						onChange={handleSearchChange}
					/>
					<ButtonAction
						type="submit"
						startIcon={<Plus size={20} />}
						onClick={() => handleActions(DialogAction.create)}
					>
						Nuevo
					</ButtonAction>

				</Row>
			</header>
			<article>
				<ScrollFade>
					<Column gap="0.5rem">
						{usersPagination?.items.map((user:any) => (
							<UserCard
								key={user.id}
								user={user}
								onEdit={ ()=>handleActions(DialogAction.update, user) }
								onChangePassword={()=>handleActions(DialogAction.password, user)}
								onToggleStatus={handleToggleStatus}
							/>
						))}
						{(usersPagination?.meta?.itemCount ?? 0) === 0 && (
							<EmptyState/>
						)}
					</Column>
				</ScrollFade>

				{(usersPagination?.meta?.totalPages ?? 0) > 1 && (
					<Row justifyContent="center" style={{ marginTop: '1rem' }}>
						<PaginationCircle
							count={usersPagination?.meta?.totalPages ?? 1}
							page={usersPagination?.meta?.currentPage ?? 1}
							onChange={handlePageChange}
						/>
					</Row>
				)}
			</article>
		</Container>
	)
}
export default UserPage


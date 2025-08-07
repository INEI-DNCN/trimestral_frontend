import type { AlertColor } from "@mui/material";
import { useState } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import { StateMessage } from "../../app/components/enum/enum";
import type { OnDialogParams, PageProps } from "../../app/components/interface/router_interface";
import WrapperDialog from "../../app/components/wrapper_dialog";
import LoginPage from "../../feature/login/login_page";
import ProfilePage from "../../feature/perfil/perfil_page";
import HomePublicPage from "../../feature/public/home/home_page";
import SidebarPublic from "../../feature/public/sidebar_public/sidebar_public";
import NotFoundPage from '../404/404_page';
import { menuItems } from "../sidebar/private/sidebar_config";
import SidebarPrivate from "../sidebar/private/sidebar_private";
import { CustomSnackbar } from "../snackbar/custom_snackbar";
import AccessControlRoute from "./validations-router/access_control_route";

function Routers() {
	const [message, setMessage] = useState('');
	const [open, setOpen] = useState(false);
	const [snackbarStado, setSnackbarStado] = useState<StateMessage | any>(StateMessage.success);
	const [openDialog, setOpenDialog] = useState(false);
	const [childrenDialog, setChildrenDialog] = useState<any>({});
	const [maxWidthDialog, setMaxWidthDialog] = useState<'sm' | 'md' | 'sm' | 'lg' | 'xs' | 'xl'>('sm');
	const [titleDialog, setTitleDialog] = useState<string | undefined>('');

	const handleCloseDialog = () => setOpenDialog(false)

	const handleCloses = () => {
		setOpen(false);
	};

	const onSnackbar = (data: any, alertColor: AlertColor) => {
		setMessage(data)
		setSnackbarStado(alertColor)
		setOpen(true);
	};

	const onDialog = ({ maxWidth, children, title }: OnDialogParams) => {
		setChildrenDialog(children)
		setMaxWidthDialog(maxWidth)
		setTitleDialog(title)
		setOpenDialog(true);
	};


	function renderRoutesFromMenu({
		items,
		onSnackbar,
		onDialog,
		handleCloseDialog,
		basePath = ""
	}: PageProps) {
		return items.flatMap((item: any) => {
			if (item.sectionTitle) return [];

			const fullPath = `${basePath}/${item.path}`.replace(/\/+/g, "/");

			const routes = [];

			if (item.component) {
				const Component = item.component;
				routes.push(
					<Route
						key={fullPath}
						path={fullPath.replace(basePath, "").replace(/^\//, "")}
						element={
							<Component
								onSnackbar={onSnackbar}
								onDialog={onDialog}
								handleCloseDialog={handleCloseDialog}
								items={{ label: item.label, path: item.path }}
							/>
						}
					/>
				);
			}

			if (item.children && item.children.length > 0) {
				routes.push(...renderRoutesFromMenu({
					items: item.children,
					onSnackbar,
					onDialog,
					handleCloseDialog,
					basePath: fullPath
				}));
			}

			return routes;
		});
	}

	return (
		<div>
			<Routes>
				<Route path="/" element={<Navigate to="/login" replace />} />
				<Route path="login" element={
					<AccessControlRoute
						redirectIfAuthenticated={true}
						redirectTo="/private/trimestral"
						children={<LoginPage onSnackbar={onSnackbar}
							onDialog={onDialog}
							handleCloseDialog={handleCloseDialog}
							items={{ label: "Login", path: "Login" }} />} />
				}
				/>
				<Route path="perfil" element={<AccessControlRoute children={
					<ProfilePage onSnackbar={onSnackbar}
						onDialog={onDialog}
						handleCloseDialog={handleCloseDialog}
						items={{ label: "Perfil", path: "Perfil" }} />} />}
				/>
				<Route path="public" element={<SidebarPublic />}>
					<Route path="home" element={<HomePublicPage />} />
				</Route>
				<Route path="private" element={<AccessControlRoute children={<SidebarPrivate />} />}>
					{renderRoutesFromMenu({
						items: menuItems,
						onSnackbar,
						onDialog,
						handleCloseDialog,
						basePath: "/admin"
					})}
				</Route>
				<Route path="*" element={<NotFoundPage />} />
			</Routes>
			<CustomSnackbar
				open={open}
				onClose={handleCloses}
				message={message}
				severity={snackbarStado}
			/>
			<WrapperDialog
				title={titleDialog}
				maxWidth={maxWidthDialog}
				open={openDialog}
				handleClose={handleCloseDialog}
				children={childrenDialog ?? <div />}
			/>

		</div>
	);
}

export default Routers;
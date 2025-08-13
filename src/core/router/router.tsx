import { Navigate, Route, Routes } from "react-router-dom";
import type { PageProps } from "../../app/components/interface/router_interface";
import LoginPage from "../../feature/login/login_page";
import ProfilePage from "../../feature/perfil/perfil_page";
import HomePublicPage from "../../feature/public/home/home_page";
import SidebarPublic from "../../feature/public/sidebar_public/sidebar_public";
import NotFoundPage from '../404/404_page';
import { menuItems } from "../sidebar/private/sidebar_config";
import SidebarPrivate from "../sidebar/private/sidebar_private";
import { UIProvider } from "../theme/ui_context";
import AccessControlRoute from "./access_control_route";

function Routers() {

	function renderRoutesFromMenu({
		items,
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
								items={{ label: item.label, path: item.path }}
							/>
						}
					/>
				);
			}

			if (item.children && item.children.length > 0) {
				routes.push(...renderRoutesFromMenu({
					items: item.children,
					basePath: fullPath
				}));
			}

			return routes;
		});
	}

	return (
		<UIProvider>
			<Routes>
				<Route path="/" element={<Navigate to="/login" replace />} />
				<Route path="login" element={
					<AccessControlRoute
						redirectIfAuthenticated={true}
						redirectTo={`/private/${localStorage.getItem("sidebarActiveMenu")}`}
						children={<LoginPage
							items={{ label: "Login", path: "Login" }} />} />
				}
				/>
				<Route path="perfil" element={<AccessControlRoute children={
					<ProfilePage items={{ label: "Perfil", path: "Perfil" }} />} />}
				/>
				<Route path="public" element={<SidebarPublic />}>
					<Route path="home" element={<HomePublicPage />} />
				</Route>
				<Route path="private" element={<AccessControlRoute children={<SidebarPrivate />} />}>
					{renderRoutesFromMenu({
						items: menuItems,
						basePath: "/admin"
					})}
				</Route>
				<Route path="*" element={<NotFoundPage />} />
			</Routes>
		</UIProvider>
	);
}

export default Routers;
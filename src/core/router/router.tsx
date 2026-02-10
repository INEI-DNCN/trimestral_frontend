import { AnimatePresence, motion } from "framer-motion";
import { jwtDecode } from "jwt-decode";
import { useEffect, type JSX } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Navigate, Route, Routes } from "react-router-dom";
import type { PageProps } from "../../app/components/interface/router_interface";
import WrapperLoading from "../../app/components/wrapper_loading";
import { getToken } from "../../app/utils/utils_localstorage";
import LoginPage from "../../feature/login/login_page";
import ProfilePage from "../../feature/perfil/perfil_page";
import type { UserPayload } from "../../feature/perfil/perfil_slice";
import { getOneUser } from "../../feature/perfil/perfil_source";
import TrimestralPage from "../../feature/private/trimestral/trimestral_page";
import NotFoundPage from '../404/404_page';
import Sidebar_layout from "../sidebar/sidebar_layout";
import type { AppDispatch, RootState } from "../store/store";
import { UIProvider } from "../theme/ui_context";
import RoutePrivate from "./route_private";
import RoutePublic from "./route_public";
import { getMenusByAplicationSource } from "./router_source";

function Routers() {

	const componentsMap: Record<string, React.FC<any>> = {
		TrimestralPage
	};


	function renderRoutesFromMenu({
		items,
		basePath = ""
	}: PageProps): JSX.Element[] {
		return items.flatMap((item: any) => {
			if (item.sectionTitle) return [];

			const fullPath = `${basePath}/${item.path}`.replace(/\/+/g, "/");

			const routes: JSX.Element[] = [];

			if (item.component) {
				const Component = componentsMap[item.component];
				if (Component) {
					routes.push(
						<Route
							key={fullPath}
							path={fullPath.replace(basePath, "").replace(/^\//, "")}
							element={
								<Component items={{ label: item.label, path: item.path }} />
							}
						/>
					);
				}
			}

			if (item.children?.length) {
				routes.push(
					...renderRoutesFromMenu({
						items: item.children,
						basePath: fullPath,
					})
				);
			}

			return routes;
		});
	}

	const dispatch = useDispatch<AppDispatch>();
	const { menus, loading, error } = useSelector((state: RootState) => state.router);
	console.log("Menus en router:", menus);

	useEffect(() => {
		const token = getToken();

		if (token) {
			try {
				const decoded = jwtDecode<UserPayload>(token);
				dispatch(getOneUser({ id: decoded.id }));
				dispatch(getMenusByAplicationSource());

			} catch (err) {
				console.error("Error al decodificar token", err);
			}
		} else {
			localStorage.setItem("sidebarActiveMenu", 'aplication');
			dispatch(getMenusByAplicationSource());
		}
	}, []);


	if (loading) {
		return (
			<AnimatePresence>
				<motion.div
					key="loader"
					style={{
						position: "fixed",
						top: 0,
						left: 0,
						display: "flex",
						alignItems: "center",
						justifyContent: "center",
						height: "100vh",
						width: "100vw",
						overflow: "hidden",
					}}
					initial={{ opacity: 0 }}
					animate={{ opacity: 1 }}
					exit={{ opacity: 0 }}
					transition={{ duration: 0.4 }}
				>
					<WrapperLoading text="Cargando..." />
				</motion.div>
			</AnimatePresence>
		);
	}

	if (error) {
		return (
			<AnimatePresence>
				<motion.div
					key="error"
					className="flex items-center justify-center h-screen w-screen"
					initial={{ opacity: 0 }}
					animate={{ opacity: 1 }}
					exit={{ opacity: 0 }}
					transition={{ duration: 0.4 }}
				>
					<p className="text-red-500 font-semibold">
						Error al cargar menús: {error}
					</p>
				</motion.div>
			</AnimatePresence>
		);
	}

	return (
		<AnimatePresence mode="wait">
			<motion.div
				key="routes"
				initial={{ opacity: 0 }}
				animate={{ opacity: 1 }}
				exit={{ opacity: 0 }}
				transition={{ duration: 0.4 }}
			>
				<UIProvider>
					<Routes>
						<Route path="/" element={<Navigate to="/login" replace />} />
						<Route
							path="login"
							element={
								<RoutePublic>
									<LoginPage items={{ label: "Login", path: "Login" }} />
								</RoutePublic>
							}
						/>
						<Route
							path="perfil"
							element={
								<RoutePrivate>
									<ProfilePage items={{ label: "Perfil", path: "Perfil" }} />
								</RoutePrivate>
							}
						/>
						<Route
							path="private"
							element={
								<RoutePrivate>
									<Sidebar_layout basePath="private" menuItems={menus} />
								</RoutePrivate>
							}
						>
							{/* <Route
								path="home"
								element={
									<RoutePrivate>
										<TrimestralPage basePath="private" items={"ga"} />
									</RoutePrivate>
								}
							></Route> */}
							{renderRoutesFromMenu({
								items: menus,
							})}
						</Route>
						<Route path="*" element={<NotFoundPage />} />
					</Routes>
				</UIProvider>
			</motion.div>
		</AnimatePresence>

	);
}

export default Routers;
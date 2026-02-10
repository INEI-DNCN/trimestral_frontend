import { AppWindow } from "lucide-react";
import TrimestralPage from "../../../feature/private/trimestral/trimestral_page";



export const menuItems = [
	{ sectionTitle: true, label: "General" },
	{
		label: "Aplicaciones",
		icon: <AppWindow size={18} />,
		path: "aplication",
		component: TrimestralPage,
	}
];


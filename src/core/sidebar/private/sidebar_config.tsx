import { AppWindow } from "lucide-react";
import TrimestralPage from "../../../feature/private/trimestral/trimestral_page";

export const menuItems = [
	{ sectionTitle: true, label: "Procesamiento" },
	{
		label: "Trimestral",
		icon: <AppWindow size={18} />,
		path: "trimestral",
		component: TrimestralPage,
	},
];


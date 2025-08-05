export interface PageProps {
	items: any; // puedes tipar mejor si conoces la estructura del menú
	onSnackbar: any;
	onDialog: (params: OnDialogParams) => void;
	handleCloseDialog: () => void;
	basePath?: string;
}

export interface OnDialogParams {
	maxWidth: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
	children: any;
	title: string;
}

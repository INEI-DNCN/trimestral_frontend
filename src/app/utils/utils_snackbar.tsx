export function getAppleStyleColor(severity: 'success' | 'info' | 'warning' | 'error') {
	switch (severity) {
		case 'success':
		return 'rgba(34, 197, 94, 0.9)'; // verde manzana
		case 'info':
		return 'rgba(59, 130, 246, 0.9)'; // azul claro
		case 'warning':
		return 'rgba(245, 158, 11, 0.9)'; // amarillo suave
		case 'error':
		return 'rgba(239, 68, 68, 0.9)'; // rojo suave
		default:
		return 'rgba(30, 41, 59, 0.9)'; // gris azulado
	}
}
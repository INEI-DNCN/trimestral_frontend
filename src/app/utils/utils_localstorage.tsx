import Axios from 'axios';

const TOKEN_KEY = 'token'
const FULLNAME_KEY = 'fullname'
const ROL_KEY = 'rol'

export function setToken(token: string) {
	localStorage.setItem(TOKEN_KEY, token)
}

export function getToken() {
	return localStorage.getItem(TOKEN_KEY)
}

export function deleteToken() {
	localStorage.removeItem(TOKEN_KEY)
}

export function setFullName(token: string) {
	localStorage.setItem(FULLNAME_KEY, token)
}

export function getFullName() {
	return localStorage.getItem(FULLNAME_KEY)
}

export function setRol(token: string) {
	localStorage.setItem(ROL_KEY, token)
}

export function getRol() {
	return localStorage.getItem(ROL_KEY)
}

export function initAxiosInterceptors() {
	Axios.interceptors.request.use(function (config) {
		const token = getToken();
		if (token) {
			// config.headers.Authorization = `bearer ${token}`
		}
		return config
	});
}


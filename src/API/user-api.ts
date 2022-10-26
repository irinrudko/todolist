import { instance } from './instance'

export const userAPI = {
	me() {
		return instance.get('auth/me')
	},
	login(data: LoginParamsType) {
		return instance.post('auth/login', data)
	},
	logout() {
		return instance.delete('auth/login')
	},
}

//types
export type LoginParamsType = {
	email: string
	password: string
	rememberMe: boolean
	captcha?: string
}

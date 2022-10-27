import { instance } from './instance'

export const userAPI = {
	me() {
		return instance.get('auth/me')
	},
	login(data: LoginParamsData) {
		return instance.post('auth/login', data).then((res) => res.data)
	},
	logout() {
		return instance.delete('auth/login').then(({ data }) => data)
	},
}

//types
export type LoginParamsData = {
	email: string
	password: string
	rememberMe: boolean
	captcha?: string
}

import axios from 'axios'

export const instance = axios.create({
	baseURL: 'https://social-network.samuraijs.com/api/1.1/',
	withCredentials: true,
	headers: { 'API-KEY': '77e9ebd2-efbf-4b5a-82fe-4b2ad908357b' },
})

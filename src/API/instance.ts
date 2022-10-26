import axios from 'axios'

export const instance = axios.create({
	baseURL: 'https://social-network.samuraijs.com/api/1.1/',
	withCredentials: true,
	headers: { 'API-KEY': 'dcfcafd7-85ce-4812-a7da-28eb32543b9d' },
})

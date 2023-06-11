import { axiosInstance } from "../utils/axiosInstance";

class GithubService {
	async getUserDetails(userID: string) {
		return await axiosInstance.get(`/users/${userID}`);
	}

	async getUser(query?: string) {
		if (query) {
			const res = await axiosInstance.get(`/search/users?q=${query}`);
			return res.data.items;
		} else {
			const res = await axiosInstance.get(`/users`);
			return res.data;
		}
	}
	async getRepository(query?: string) {
		if (query) {
			const res = await axiosInstance.get(`/search/repositories?q=${query}`);
			return res.data.items;
		} else {
			const res = await axiosInstance.get(`/repositories`);
			return res.data;
		}
	}
}

export default new GithubService();

import { axiosInstance } from "../utils/axiosInstance";

class GithubService {
	async getUserDetails(userID: string) {
		return await axiosInstance.get(`/users/${userID}`);
	}

	async getUser(page: number, per_page: number, query?: string) {
		if (query) {
			return await axiosInstance.get(
				`/search/users?page=${page ?? 1}&per_page=${per_page ?? 10}&q=${query}`
			);
		} else {
			return await axiosInstance.get(
				`/users?page=${page ?? 1}&per_page=${per_page ?? 10}`
			);
		}
	}
	async getRepository(page: number, per_page: number, query?: string) {
		if (query) {
			return await axiosInstance.get(
				`/search/repositories?page=${page ?? 1}&per_page=${
					per_page ?? 10
				}&q=${query}`
			);
		} else {
			return await axiosInstance.get(
				`/repositories?page=${page ?? 1}&per_page=${per_page ?? 10}`
			);
		}
	}
}

export default new GithubService();

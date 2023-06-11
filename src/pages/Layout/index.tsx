import { useEffect, useMemo, useState } from "react";

import { Navbar, Pagination, SpinningLoader } from "@/components";
import { ApiResponse } from "@/interfaces";
import githubServices from "@/services/github.services";

import Homepage from "../Homepage/Homepage";

const LandingPage = () => {
	const [query, setQuery] = useState<string>("");
	const [filter, setFilter] = useState<string>("repositories");
	const [data, setData] = useState<ApiResponse[]>([]);
	const [page, setPage] = useState<number>(1);
	const [perPage, setPerPage] = useState<number>(10);
	const [loading, setLoading] = useState<boolean>(false);
	const [networkError, setNetworkError] = useState<boolean>(false);

	const currentTableData = useMemo(() => {
		const firstPage = (page - 1) * perPage;
		const lastPage = firstPage + perPage;
		return data?.slice(firstPage, lastPage);
	}, [page, perPage, data]);

	useEffect(() => {
		if (filter == "users") {
			setLoading(true);
			githubServices
				.getUser(query)
				.then((res) => {
					setData(res);
					setLoading(false);
				})
				.catch(() => {
					setNetworkError(true);
				});
		} else {
			setLoading(true);
			githubServices
				.getRepository(query)
				.then((res) => {
					setData(res);
					setLoading(false);
				})
				.catch(() => {
					setNetworkError(true);
				});
		}
	}, [query, filter, page, perPage]);

	return (
		<>
			<Navbar
				handleFilterChange={(value) => setFilter(value)}
				handleSearchQuery={(query) => setQuery(query)}
			/>
			{networkError ? (
				<div className="grid place-items-center h-[100vh]">
					<p className="border bg-blue-500 p-20 rounded text-3xl font-bold text-white">
						Network Error !!
					</p>
				</div>
			) : !loading ? (
				<div>
					<Homepage
						data={currentTableData}
						page={page}
						totalData={data?.length}
						filter={filter}
						handlePerPageChange={(perPage) => setPerPage(perPage)}
					/>
					<div className="flex justify-center pb-10">
						{currentTableData.length < data?.length && (
							<Pagination
								currPageNumber={page}
								itemsPerPage={perPage}
								onPageChange={(page) => setPage(page)}
								totalItems={data?.length}
							/>
						)}
					</div>
				</div>
			) : (
				<div className="absolute h-[100vh] w-[100vw] grid place-items-center">
					<SpinningLoader />
				</div>
			)}
		</>
	);
};

export default LandingPage;

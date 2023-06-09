import { useEffect, useState } from "react";
import Homepage from "./pages/Homepage";
import githubServices from "./services/github.services";
import Navbar from "./components/Navbar/Navbar";
import { ApiResponse } from "./interfaces/interface";

function App() {
	const [query, setQuery] = useState<string>("");
	const [filter, setFilter] = useState<string>("repositories");
	const [data, setData] = useState<ApiResponse[]>([]);
	const [page, setPage] = useState<number>(1);
	const [perPage, setPerPage] = useState<number>(25);

	useEffect(() => {
		if (filter == "users") {
			githubServices
				.getUser(page, perPage, query)
				.then((res) => setData(res.data));
		} else {
			githubServices
				.getRepository(page, perPage, query)
				.then((res) => setData(res.data));
		}
	}, [query, filter, page, perPage]);
	return (
		<div className="flex flex-col">
			<Navbar
				handleFilterChange={(value) => setFilter(value)}
				handleSearchQuery={(query) => setQuery(query)}
			/>
			<Homepage
				data={data}
				page={page}
				perPage={perPage}
				handlePageChange={(page) => setPage(page)}
				handlePerPageChange={(perPage) => setPerPage(perPage)}
			/>
		</div>
	);
}

export default App;

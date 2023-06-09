import SearchBar from "../Searchbar";
import Filter from "../Filter";
import { useState } from "react";

const Navbar = ({
	handleFilterChange,
	handleSearchQuery,
}: {
	handleFilterChange: (query: string) => void;
	handleSearchQuery: (query: string) => void;
}) => {
	const [open, setOpen] = useState(false);

	return (
		<>
			<div className="shadow-md w-full">
				<div className="md:flex items-center justify-between bg-[#24292F] md:px-10 px-7">
					<div className="flex gap-20 items-center">
						<div
							className="font-bold text-2xl cursor-pointer flex items-center font-[Poppins] 
      text-gray-800"
						>
							<a href="https://www.github.com" target="__blank">
								<img
									src="github-icon.svg"
									className="object-contain rounded-full py-3"
								/>
							</a>
						</div>
						<span className={`flex md:hidden text-white font-bold text-xl`}>
							GitHub
						</span>
					</div>

					<div
						onClick={() => setOpen(!open)}
						className="text-3xl absolute right-8 top-6 cursor-pointer md:hidden"
					>
						<svg
							className="w-6 h-6"
							aria-hidden="true"
							fill="white"
							viewBox="0 0 20 20"
							xmlns="http://www.w3.org/2000/svg"
						>
							<path
								fill-rule="evenodd"
								d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"
								clip-rule="evenodd"
							></path>
						</svg>
					</div>

					<ul
						className={`flex flex-col md:flex-row  md:items-center absolute md:static md:z-auto  left-0 md:w-auto md:pl-0 pl-9 transition-all duration-200 gap-4 ${
							open
								? "top-18 py-4 w-screen bg-gray-600 md:bg-[#24292F] gap-4"
								: "top-[-490px]"
						}`}
					>
						<li>
							<SearchBar handleSearch={handleSearchQuery} />
						</li>

						<li>
							<Filter
								opts={[
									{ label: "Repositories", value: "repositories" },
									{ label: "Users", value: "users" },
								]}
								handleChange={handleFilterChange}
							/>
						</li>
					</ul>
				</div>
			</div>
		</>
	);
};

export default Navbar;

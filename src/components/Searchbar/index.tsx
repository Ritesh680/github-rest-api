import React, { useEffect, useState } from "react";
import useDebounce from "../../hooks/useDebounce";

const SearchIcon = ({ extraStyles }: { extraStyles?: string }) => {
	return (
		<svg
			xmlns="http://www.w3.org/2000/svg"
			width="16"
			height="16"
			fill="none"
			className={extraStyles}
		>
			<path
				fill="currentColor"
				d="M12.627 11.513 16 14.886 14.886 16l-3.373-3.373a7.057 7.057 0 0 1-4.424 1.55A7.091 7.091 0 0 1 0 7.09 7.091 7.091 0 0 1 7.089 0a7.091 7.091 0 0 1 7.088 7.089 7.057 7.057 0 0 1-1.55 4.424Zm-1.58-.585a5.495 5.495 0 0 0 1.555-3.84A5.512 5.512 0 0 0 7.09 1.576 5.511 5.511 0 0 0 1.575 7.09a5.512 5.512 0 0 0 5.514 5.513 5.495 5.495 0 0 0 3.84-1.555l.118-.119Z"
			/>
		</svg>
	);
};

const SearchBar = ({
	handleSearch,
}: {
	handleSearch: (query: string) => void;
}) => {
	const [query, setQuery] = useState<string>("");
	const debouncedValue = useDebounce(query, 500);

	const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		setQuery(event.target.value);
	};

	useEffect(() => {
		handleSearch(debouncedValue);
	}, [debouncedValue, handleSearch]);
	return (
		<div className="relative flex items-center border rounded border-[#9E9E9E] pl-3 w-fit">
			<input
				type="text"
				placeholder="Search github"
				className="h-10 border-0 ml-5 flex outline-none bg-transparent text-white"
				value={query}
				onChange={handleChange}
			/>
			<SearchIcon extraStyles="absolute text-[#9E9E9E]" />
		</div>
	);
};

export default SearchBar;

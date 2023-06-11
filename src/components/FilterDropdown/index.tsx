import React from "react";

const Filter = ({
	opts,
	filterName,
	handleChange,
	extraStyles,
}: {
	opts: { label: string; value: string }[];
	filterName?: string;
	handleChange: (value: string) => void;
	extraStyles?: string;
}) => {
	const handleFilterChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
		handleChange(e.target.value);
	};
	return (
		<div className={`border rounded w-fit px-4 ${extraStyles}`}>
			<span>{filterName || "Filter:"}</span>
			<select
				onChange={handleFilterChange}
				className="border p-3 rounded-md outline-none bg-transparent  border-none"
			>
				{opts?.map((opt, i) => (
					<option key={i} value={opt?.value} className="p-3 bg-gray-500">
						{opt?.label}
					</option>
				))}
			</select>
		</div>
	);
};

export default Filter;

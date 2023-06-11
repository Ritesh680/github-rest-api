import { useMemo, useState } from "react";

import { Filter, Pagination } from "@/components";
import { IssuesAPI } from "@/interfaces";

const IssueContent = ({ data }: { data: IssuesAPI[] }) => {
	const [currentPage, setCurrentPage] = useState<number>(1);
	const [perPage, setPerPage] = useState<number>(10);

	const currentTableData = useMemo(() => {
		const firstPage = (currentPage - 1) * perPage;
		const lastPage = firstPage + perPage;
		return data?.slice(firstPage, lastPage);
	}, [currentPage, perPage, data]);
	return (
		<div className="border rounded-md p-4 m-4">
			<div className="border-b py-2 bg-gray-50">
				<span className="font-bold text-sm">{data?.length} open Issues</span>
			</div>

			{currentTableData?.map((d) => (
				<div
					key={d.id}
					className="flex flex-col border-b py-5 px-2 hover:bg-gray-50 cursor-pointer gap-3"
				>
					<a
						href={d?.html_url}
						target="__blank"
						className="text-sm font-semibold hover:text-blue-500"
					>
						{d.title}
					</a>
					<p className="flex items-center text-neutral-600 gap-1 text-sm">
						<span>#{d.number} </span> opened on {d?.created_at.split("T")[0]} by{" "}
						{d?.user?.login}
					</p>
				</div>
			))}

			<div className="flex justify-between items-center mt-4">
				{currentTableData.length < data.length && (
					<Pagination
						totalItems={data?.length}
						currPageNumber={currentPage}
						itemsPerPage={10}
						onPageChange={(value) => setCurrentPage(value)}
					/>
				)}

				<div className="flex justify-end w-full">
					<Filter
						handleChange={(perPage) => setPerPage(Number(perPage))}
						opts={[
							{ label: "10", value: "10" },
							{ label: "25", value: "25" },
							{ label: "50", value: "50" },
						]}
						filterName="PerPage"
						extraStyles="flex items-center text-black self-end bg-blue-500 text-white"
					/>
				</div>
			</div>
		</div>
	);
};

export default IssueContent;

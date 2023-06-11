import { useState } from "react";

import { Pagination } from "@/components";
import { IssuesAPI } from "@/interfaces";

const IssueContent = ({ data }: { data: IssuesAPI[] }) => {
	const [currentPage, setCurrentPage] = useState<number>(1);
	return (
		<div className="border rounded-md p-4 m-4">
			<div className="border-b py-2 bg-gray-50">
				<span className="font-bold text-sm">{data?.length} open Issues</span>
			</div>
			{data?.map((d) => (
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
			<Pagination
				totalItems={data?.length}
				currPageNumber={currentPage}
				itemsPerPage={10}
				onPageChange={(value) => setCurrentPage(value)}
				extraClasses="mt-4 mx-auto w-full"
			/>
		</div>
	);
};

export default IssueContent;

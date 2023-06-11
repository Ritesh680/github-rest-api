import { useEffect, useState } from "react";

import CodeContent from "./CodeContent";
import IssueContent from "./IssueContent";

import { TabContainer } from "@/components";
import { axiosInstance } from "@/utils/axiosInstance";
import { DataResponse, IssuesAPI } from "@/interfaces";
import { EyeIcon, ForkIcon, StarIcon } from "@/assets/Icons";

const DetailPage = () => {
	const repo = window.location.pathname;
	const [data, setData] = useState<DataResponse>();
	const [issueData, setIssueData] = useState<IssuesAPI[]>([]);

	async function fetchData(url: string) {
		const res = await axiosInstance.get(url);

		return res.data;
	}

	const gitdata = [
		{
			icon: <EyeIcon extraClasses="w-5" />,
			value: data?.watchers_count,
			label: "Watchers",
		},
		{
			icon: <ForkIcon extraClasses="w-5" />,
			value: data?.forks_count,
			label: "Forks",
		},
		{
			icon: <StarIcon extraClasses="w-5" />,
			value: data?.stargazers_count,
			label: "Stars",
		},
	];

	useEffect(() => {
		fetchData(`repos${repo}`).then((res) => setData(res));

		fetchData(`/repos${repo}/issues`).then((data) => setIssueData(data));
	}, [repo]);

	const tabs = [
		{
			label: "Code",
			content: (
				<CodeContent
					defaultBranch={data?.default_branch}
					githubUrl={data?.html_url}
					branchUrl={data?.branches_url?.split("{").shift()}
				/>
			),
		},
		{
			label: `Issues (${issueData.length})`,
			content: <IssueContent data={issueData} />,
		},
	];
	return (
		<div className="flex flex-col">
			<div className="flex justify-between items-center px-4 bg-gray-50 py-6">
				<div className="flex gap-4">
					<img src="/git-repository-icon.svg" className="w-6" />
					<p className="font-bold text-blue-500">{data?.full_name}</p>
				</div>
				<div className="flex gap-4">
					{gitdata?.map((git) => (
						<label className="flex items-center gap-2 border p-2 rounded-md border-neutral-300 text-sm">
							{git.icon}
							{git.label}
							<span className="font-bold text-lg">{git.value}</span>
						</label>
					))}
				</div>
			</div>
			<p className="bg-gray-50 px-4 pb-4 flex">{data?.description}</p>
			<TabContainer tabs={tabs} />
		</div>
	);
};

export default DetailPage;

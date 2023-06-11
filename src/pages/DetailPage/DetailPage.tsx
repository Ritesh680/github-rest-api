import { useEffect, useState } from "react";

import CodeContent from "./CodeContent";
import IssueContent from "./IssueContent";

import { TabContainer } from "@/components";
import { axiosInstance } from "@/utils/axiosInstance";
import { DataResponse, IssuesAPI } from "@/interfaces";

const DetailPage = () => {
	const repo = window.location.pathname;
	const [data, setData] = useState<DataResponse>();
	const [issueData, setIssueData] = useState<IssuesAPI[]>([]);
	async function fetchData(url: string) {
		const res = await axiosInstance.get(url);

		return res.data;
	}
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
		<div>
			<TabContainer tabs={tabs} />
		</div>
	);
};

export default DetailPage;

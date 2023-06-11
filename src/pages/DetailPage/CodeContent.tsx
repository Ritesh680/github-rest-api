import { useEffect, useState } from "react";

import { Filter } from "@/components";
import { CommitApiRes } from "@/interfaces";
import { axiosInstance } from "@/utils/axiosInstance";

const CodeContent = ({
	defaultBranch,
	githubUrl,
	branchUrl,
}: {
	defaultBranch?: string;
	githubUrl?: string;
	branchUrl?: string;
}) => {
	const [githubBranch, setGithubBranch] = useState<
		{ label: string; value: string }[]
	>([]);

	const [commitData, setCommitData] = useState<CommitApiRes>();
	const [branch, setBranch] = useState<string>(defaultBranch ?? "master");

	async function getCommitDetails(branchURL: string, branch: string) {
		return await axiosInstance.get(`${branchURL}/${branch}`);
	}

	async function getData(url: string) {
		const res: any = await axiosInstance.get(url);
		res.data?.map((d: { name: string }) =>
			setGithubBranch((prev) => [...prev, { label: d?.name, value: d.name }])
		);
	}
	useEffect(() => {
		branchUrl && getData(branchUrl);
	}, [branchUrl]);

	useEffect(() => {
		branchUrl &&
			getCommitDetails(branchUrl, branch).then((res) =>
				setCommitData(res.data)
			);
	}, [branch, branchUrl]);

	console.log(commitData);
	return (
		<div className="p-4 flex flex-col gap-4">
			<div className="flex justify-between items-center">
				<Filter
					filterName="Branch"
					opts={githubBranch}
					handleChange={(value) => setBranch(value)}
					extraStyles="text-black border-black"
				/>

				<a
					href={githubUrl}
					className="bg-blue-400 text-white rounded-md px-2 py-2 hover:opacity-80 cursor-pointer"
				>
					Go to Github Profile
				</a>
			</div>
			<div className="border rounded-md">
				<div className="flex justify-between items-center bg-neutral-100 py-2 md:px-4">
					<div className="text-sm gap-4 flex truncate items-center w-4/5">
						<img
							src={commitData?.commit?.author?.avatar_url}
							className="w-8 rounded-full"
						/>
						<span className="font-bold">
							{commitData?.commit?.author?.login}
						</span>
						{commitData?.commit?.commit?.message}
					</div>
					<span>{commitData?.commit?.commit?.comment_count}</span>
				</div>
				<div className="flex items-center justify-center py-10 flex-col">
					<p>Please Visit original github page for more details</p>
					<a
						className="text-blue-500 underline hover:opacity-80"
						href={githubUrl}
					>
						Github
					</a>
				</div>
			</div>
		</div>
	);
};

export default CodeContent;

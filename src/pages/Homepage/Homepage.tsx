import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

import { ApiResponse, UserAPIRes } from "../../interfaces";
import { Filter } from "../../components";

async function getStars(owner?: string, repo?: string) {
	const url = `https://api.github.com/repos/${owner}/${repo}`;
	const stargazersUrl = await getUrlData(url);
	return stargazersUrl;
}

async function getUrlData(url: string) {
	return new Promise((resolve) => {
		fetch(url)
			.then((res) => res.json())
			.then((data) => resolve(data));
	});
}

const RepositoryDataDisplay = ({
	fullName,
	description,
	owner,
	repo,
}: {
	fullName?: string;
	description?: string;
	star?: string;
	owner?: string;
	repo?: string;
}) => {
	const initialState = {
		starData: 0,
		language: "",
		license: "",
		topics: [],
	};
	const [gitData, setGitData] = useState(initialState);
	useEffect(() => {
		getStars(owner, repo).then((res: any) =>
			setGitData({
				starData: res?.stargazers_count,
				language: res?.language,
				license: res?.license?.name,
				topics: [],
			})
		);
	}, [owner, repo]);
	return (
		<div className="flex gap-4 border rounded items-start p-4">
			<img src="git-repository-icon.svg" className="w-6  flex" />
			<div className="flex flex-col">
				<Link to={`/${fullName}`} className="text-blue-400 hover:underline ">
					{fullName}
				</Link>
				<p>{description || "This is a test description"}</p>
				<div className="flex flex-wrap gap-10 text-xs text-gray-600">
					<div className="flex items-center">
						<img src="star-svgrepo-com.svg" className="w-3" />
						{gitData?.starData}
					</div>
					<span>{gitData?.language}</span>
					<span>{gitData?.license}</span>
				</div>
			</div>
		</div>
	);
};

const UserDataDisplay = ({ userInfoUrl }: { userInfoUrl: string }) => {
	const [userData, setUserData] = useState<UserAPIRes>();
	useEffect(() => {
		axios.get(userInfoUrl).then((res: any) => setUserData(res.data));
	}, [userInfoUrl]);
	return (
		<a
			href={userData?.html_url}
			className="flex items-start gap-4 border-b py-4 hover:bg-gray-100 cursor-pointer p-2 rounded-md"
		>
			<img
				src={userData?.avatar_url}
				alt={userData?.login}
				className="w-8 rounded-full"
			/>
			<div className="flex flex-col gap-2">
				<p className="flex gap-10 items-center">
					<span className="font-bold text-lg">{userData?.name}</span>{" "}
					<span className="text-sm text-neutral-600">{userData?.login}</span>
				</p>
				<p className="text-sm text-neutral-600">{userData?.bio}</p>
				<div className="flex justify-between text-sm">
					<span>{userData?.location}</span>
					<span>
						<b>{userData?.followers}</b> Followers
					</span>
					<span>
						<b>{userData?.following}</b> Followings
					</span>
				</div>
			</div>
		</a>
	);
};

const Homepage = ({
	data,
	handlePerPageChange,
	filter,
	totalData,
}: {
	data: ApiResponse[];
	page: number;
	filter: string;
	totalData?: number;
	handlePerPageChange: (perPage: number) => void;
}) => {
	return (
		<div className="flex flex-col gap-4 px-4 md:px-20 w-full py-5 mx-auto">
			<span>
				Showing {data.length} of {totalData}
			</span>
			<Filter
				handleChange={(perPage) => handlePerPageChange(Number(perPage))}
				opts={[
					{ label: "10", value: "10" },
					{ label: "25", value: "25" },
					{ label: "50", value: "50" },
				]}
				filterName="Per Page"
				extraStyles="text-black self-end bg-blue-500 text-white"
			/>
			{data?.map((d) =>
				filter == "repositories" ? (
					<RepositoryDataDisplay
						key={d?.id}
						fullName={d?.full_name}
						description={d?.description}
						star={d?.stargazers_url}
						owner={d?.owner?.login}
						repo={d?.name}
					/>
				) : (
					<UserDataDisplay key={d.id} userInfoUrl={d?.url} />
				)
			)}
		</div>
	);
};

export default Homepage;

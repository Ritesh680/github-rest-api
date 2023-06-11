import React, { useState } from "react";

type TabProps = {
	label: string;
	selected: boolean;
	onClick: () => void;
};

const Tab = ({ label, selected, onClick }: TabProps) => (
	<div
		className={`py-2 px-6 hover:cursor-pointer transition-colors duration-300 ${
			selected
				? "font-semibold border-b-2 border-[#FD8C73]"
				: "text-neutral-600 hover:bg-neutral-100 rounded-2xl"
		}`}
		onClick={onClick}
	>
		{label}
	</div>
);

type TabContentProps = {
	children: React.ReactNode;
};

const TabContent: React.FC<TabContentProps> = ({ children }) => (
	<div className="tab-content">{children}</div>
);

type TabData = {
	label: string;
	content?: React.ReactNode;
};

type TabContainerProps = {
	tabs: TabData[];
};

const TabContainer = ({ tabs }: TabContainerProps) => {
	const [selectedTab, setSelectedTab] = useState(0);

	return (
		<div className="">
			<div className="flex bg-neutral-100">
				{tabs.map((tab, index) => (
					<Tab
						key={index}
						label={tab.label}
						selected={selectedTab === index}
						onClick={() => setSelectedTab(index)}
					/>
				))}
			</div>
			{tabs[selectedTab].content && (
				<TabContent>{tabs[selectedTab].content}</TabContent>
			)}
		</div>
	);
};

export default TabContainer;

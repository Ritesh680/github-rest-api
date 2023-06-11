interface PaginationProps {
	currPageNumber: number;
	totalItems: number;
	itemsPerPage: number;
	onPageChange: (pageNumber: number) => void;
	extraClasses?: string;
}

function Pagination({
	currPageNumber,
	totalItems,
	itemsPerPage,
	onPageChange,
	extraClasses,
}: PaginationProps) {
	const totalPages = Math.ceil(totalItems / itemsPerPage);

	const handlePageClick = (pageNumber: number) => {
		onPageChange(pageNumber);
	};
	const handlePrev = () => {
		onPageChange(currPageNumber - 1);
	};
	const handleNext = () => {
		onPageChange(currPageNumber + 1);
	};

	const renderPageNumbers = () => {
		const activeClass = "bg-blue-400 py-1 px-3 rounded text-white";
		const pageNumbers = [];
		const ellipsis = <li key={"ellipsis"}>...</li>;
		const firstPage = (
			<li key={1}>
				<a onClick={() => handlePageClick(1)} href="#">
					1
				</a>
			</li>
		);
		const lastPage = (
			<li key={totalPages}>
				<a onClick={() => handlePageClick(totalPages)} href="#">
					{totalPages}
				</a>
			</li>
		);

		if (totalPages <= 7) {
			for (let i = 1; i <= totalPages; i++) {
				pageNumbers.push(
					<li
						key={i}
						className={currPageNumber === i ? activeClass : undefined}
					>
						<a onClick={() => handlePageClick(i)} href="#">
							{i}
						</a>
					</li>
				);
			}
		} else if (currPageNumber < 4) {
			// Render first few pages and ellipsis
			for (let i = 1; i <= 4; i++) {
				pageNumbers.push(
					<li
						key={i}
						className={currPageNumber === i ? activeClass : undefined}
					>
						<a onClick={() => handlePageClick(i)} href="#">
							{i}
						</a>
					</li>
				);
			}
			pageNumbers.push(ellipsis);
			pageNumbers.push(lastPage);
		} else if (currPageNumber > totalPages - 3) {
			// Render last few pages and ellipsis
			pageNumbers.push(firstPage);
			pageNumbers.push(ellipsis);
			for (let i = totalPages - 3; i <= totalPages; i++) {
				pageNumbers.push(
					<li
						key={i}
						className={currPageNumber === i ? activeClass : undefined}
					>
						<a onClick={() => handlePageClick(i)} href="#">
							{i}
						</a>
					</li>
				);
			}
		} else {
			// Render first and last few pages, and ellipses
			pageNumbers.push(firstPage);
			pageNumbers.push(ellipsis);
			for (let i = currPageNumber - 1; i <= currPageNumber + 1; i++) {
				pageNumbers.push(
					<li
						key={i}
						className={currPageNumber === i ? activeClass : undefined}
					>
						<a onClick={() => handlePageClick(i)} href="#">
							{i}
						</a>
					</li>
				);
			}
			pageNumbers.push(ellipsis);
			pageNumbers.push(lastPage);
		}

		return pageNumbers;
	};

	return (
		<div className={extraClasses}>
			<ul className="flex gap-5 items-center">
				{currPageNumber != 1 && (
					<button
						className="border px-3 py-1 rounded cursor-pointer hover:opacity-90 flex items-center gap-2"
						onClick={handlePrev}
						disabled={currPageNumber === 1}
					>
						Prev
					</button>
				)}
				{renderPageNumbers()}
				{currPageNumber !== totalPages && (
					<button
						className="border px-3 py-1 rounded cursor-pointer hover:opacity-90 flex items-center gap-2"
						onClick={handleNext}
						disabled={currPageNumber === totalPages}
					>
						Next
					</button>
				)}
			</ul>
		</div>
	);
}

export default Pagination;

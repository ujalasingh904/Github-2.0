const SortButton = ({ label, sortType, currentSortType, onSort }) => (
	<button
		type='button'
		className={`py-2.5 px-5 me-2 mb-2 text-xs sm:text-sm font-medium focus:outline-none rounded-lg bg-glass 
			${currentSortType === sortType ? 'border-blue-500' : ''}`}
		onClick={() => onSort(sortType)}
	>
		{label}
	</button>
);

const SortRepos = ({ onSort, sortType }) => {
	return (
		<div className='mb-2 flex justify-center  lg:justify-end'>
			<SortButton label="Most Recent" sortType="recent" currentSortType={sortType} onSort={onSort} />
			<SortButton label="Most Stars" sortType="stars" currentSortType={sortType} onSort={onSort} />
			<SortButton label="Most Forks" sortType="forks" currentSortType={sortType} onSort={onSort} />
		</div>
	);
};

export default SortRepos;

import useTableSSR from '@/hooks/useTableSSR';

import TableColumnFilter from './column-filter';
import FilterButtons from './filter-buttons';

const PinFilters = () => {
	const { pinFilters } = useTableSSR();

	if (!pinFilters || pinFilters.length === 0) return null;

	return (
		<div className='bg-gradient mt-4 space-y-4 rounded-md border px-4 pb-3 pt-2'>
			<div className='flex flex-wrap gap-4'>
				{pinFilters.map((option, index) => (
					<TableColumnFilter isPin key={index} option={option} />
				))}
			</div>
			<FilterButtons />
		</div>
	);
};

export default PinFilters;

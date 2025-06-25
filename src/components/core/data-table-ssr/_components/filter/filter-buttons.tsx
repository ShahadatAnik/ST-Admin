import { X } from 'lucide-react';
import useTableFilter from '@/hooks/useTableFilter';
import useTableSSR from '@/hooks/useTableSSR';

import { Button } from '@/components/ui/button';

const FilterButtons = () => {
	const { handleSearchParams, clearSearchParams } = useTableSSR();
	const { filters, isFiltered, clearFilters } = useTableFilter();

	if (!isFiltered()) return null;

	return (
		<div className='flex w-full items-center gap-4'>
			<Button
				onClick={() => {
					clearFilters();
					clearSearchParams();
				}}
				variant={'destructive'}
				size={'sm'}
			>
				<X className='size-5' />
				Clear
			</Button>
			<Button
				onClick={() => {
					clearSearchParams();

					const params: any = {};
					Object.keys(filters).forEach((key: any) => {
						if (filters[key].name && filters[key].value) {
							params[filters[key].name] = filters[key].value;
						}
					});
					handleSearchParams(params);
				}}
				variant={'default'}
				size={'sm'}
			>
				Apply
			</Button>
		</div>
	);
};

export default FilterButtons;

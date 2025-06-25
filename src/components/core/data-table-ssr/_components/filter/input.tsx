import { ITableFilterOptionSSR } from '@/types';
import useTableFilter from '@/hooks/useTableFilter';

import DebouncedInput from '@/components/ui/debounce-input';

function Input<T>({ label, accessor }: ITableFilterOptionSSR<T>) {
	const { addFilter, filters } = useTableFilter();

	return (
		<DebouncedInput
			value={filters?.find((filter) => filter.name === accessor)?.value || ''}
			onChange={(value) => addFilter(accessor as string, value as string)}
			name={label}
		/>
	);
}

export default Input;

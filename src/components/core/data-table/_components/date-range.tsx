import { format } from 'date-fns';
import useTableSSR from '@/hooks/useTableSSR';

import { DateRangePicker } from '@/components/ui/date-range-picker';

import { TTableDateRange } from '../types';

const TableDateRange = ({
	start_date,
	end_date,
	table,
	onUpdate,
	onClear,
	isClear,
	isSSR,
	isModal,
	isMobile,
	className,
}: TTableDateRange<any>) => {
	const column = table.getColumn('created_at');

	const { handleSearchParams } = useTableSSR();

	return (
		<DateRangePicker
			initialDateFrom={start_date}
			initialDateTo={end_date}
			align={'center'}
			onUpdate={({ range }) => {
				if (!onUpdate) {
					if (!isSSR) {
						column?.setFilterValue((old: [Date, Date]) => [
							new Date(range.from),
							range.to ? new Date(range.to) : old[1],
						]);
					} else {
						handleSearchParams({
							start_date: format(range.from, 'yyyy-MM-dd'),
							end_date: range.to && format(range.to, 'yyyy-MM-dd'),
						});
					}

					return;
				}
				onUpdate({ range });
			}}
			onClear={!isClear && onUpdate && onClear ? onClear : undefined}
			isModal={isModal}
			isMobile={isMobile}
			className={className}
		/>
	);
};

export default TableDateRange;

import { useCallback } from 'react';
import { TableFilterProvider } from '@/context';
import { ITableFilter } from '@/context/TableFilterContext';
import { Cross2Icon } from '@radix-ui/react-icons';
import { isValid } from 'date-fns';
import { CirclePlus } from 'lucide-react';
import { useSearchParams } from 'react-router-dom';
import usePage from '@/hooks/usePage';
import useTableSSR from '@/hooks/useTableSSR';

import TableTitle from '@/components/core/data-table/_components/title';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';

import { cn } from '@/lib/utils';

import TableDateRange from '../../data-table/_components/date-range';
import TableExportCSV from '../../data-table/_components/export-csv';
import TableRefresh from '../../data-table/_components/refresh';
import { TableViewOptions } from '../../data-table/_components/view-options';
import TableFilter from './filter';
import PinFilters from './filter/pin-filters';
import { TableOrderBy } from './order-by';

const Toolbar = () => {
	const { createAccess } = usePage();
	const {
		title,
		subtitle,
		handleRefetch,
		handleCreate,
		table,
		start_date,
		end_date,
		initialDateRange,
		onUpdate,
		onClear,
		isClear,
		filterOptions,
		isEntry,
		isFiltered,
		clearSearchParams,
	} = useTableSSR();

	const [searchParams] = useSearchParams();

	const column = table.getColumn('created_at');
	const columnFilterValue = column?.getFilterValue() as [Date, Date];

	const startDate = start_date || columnFilterValue?.[0] || initialDateRange[0];
	const endDate = end_date || columnFilterValue?.[1] || initialDateRange[1];

	const defaultFilterValues: ITableFilter[] = [];

	searchParams.forEach((value, key) => defaultFilterValues.push({ name: key, value }));

	/**
	 * Renders the left section of the toolbar
	 */
	const renderLeftSection = useCallback(
		() => (
			<div className='flex flex-1 items-center space-x-2'>
				{filterOptions && <TableFilter options={filterOptions} />}
				<TableViewOptions table={table} />
				<TableOrderBy table={table} />
				<TableDateRange
					isSSR
					table={table}
					start_date={startDate}
					end_date={endDate}
					onUpdate={onUpdate}
					onClear={onClear}
					isClear={isClear}
				/>

				{isFiltered && (
					<Button
						aria-label='Reset filters'
						variant='outline-destructive'
						onClick={clearSearchParams}
						className='h-8'
					>
						Reset
						<Cross2Icon className='size-4' />
					</Button>
				)}

				<Separator orientation='vertical' className='h-6' />

				{isValid(startDate) && isValid(endDate) && (
					<TableExportCSV
						table={table}
						title={title}
						isEntry={isEntry}
						start_date={startDate}
						end_date={endDate}
					/>
				)}
			</div>
		),
		[
			table,
			endDate,
			startDate,
			isClear,
			onClear,
			onUpdate,
			isEntry,
			title,
			filterOptions,
			clearSearchParams,
			isFiltered,
		]
	);

	/**
	 * Renders the right section of the toolbar
	 */
	const renderRightSection = useCallback(
		() => (
			<div className='flex h-fit gap-4'>
				{handleRefetch && <TableRefresh handleRefetch={handleRefetch} />}
				{createAccess && (
					<Button aria-label='Create new entry' onClick={handleCreate} variant='accent' size='sm'>
						<CirclePlus className='size-4' />
						New
					</Button>
				)}
			</div>
		),
		[handleRefetch, createAccess, handleCreate]
	);

	return (
		<TableFilterProvider defaultValues={defaultFilterValues}>
			<div className={cn('mb-4 flex w-full flex-col overflow-hidden')}>
				<div
					className={cn(
						'mb-4 flex w-full flex-col justify-between gap-2 border-b pb-4 lg:flex-row lg:items-end'
					)}
				>
					<TableTitle title={title} subtitle={subtitle} />
				</div>

				<div className={cn('flex items-center justify-between')}>
					{renderLeftSection()}
					{renderRightSection()}
				</div>

				<PinFilters />
			</div>
		</TableFilterProvider>
	);
};

export default Toolbar;

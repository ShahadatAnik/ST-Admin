import { createContext, useCallback, useEffect, useLayoutEffect, useMemo, useState } from 'react';
import { IPagination, IPaginationQuery, IResponse, ITableFilterOptionSSR } from '@/types';
import { RankingInfo } from '@tanstack/match-sorter-utils';
import { QueryObserverResult, RefetchOptions } from '@tanstack/react-query';
import {
	ColumnDef,
	ColumnFiltersState,
	FilterFn,
	getCoreRowModel,
	getFacetedRowModel,
	getFacetedUniqueValues,
	getFilteredRowModel,
	Row,
	RowData,
	Table,
	useReactTable,
	VisibilityState,
} from '@tanstack/react-table';
import { max, min } from 'date-fns';
import { DateRange } from 'react-day-picker';
import { useSearchParams } from 'react-router-dom';

import DataTableSSR from '@/components/core/data-table-ssr';
import { TableRowSelection } from '@core/data-table/_components/row/selection';
import { dateRange } from '@core/data-table/_helpers/dateRange';
import { fuzzyFilter } from '@core/data-table/_helpers/fuzzyFilter';
import useDefaultColumns from '@core/data-table/_helpers/useDefaultColumns';

declare module '@tanstack/react-table' {
	//allows us to define custom properties for our columns
	// eslint-disable-next-line @typescript-eslint/no-unused-vars
	interface ColumnMeta<TData extends RowData, TValue> {
		filterVariant?: 'text' | 'range' | 'select' | 'dateRange';
		hidden?: boolean;
		disableFullFilter?: boolean;
	}

	//add fuzzy filter to the filterFns
	interface FilterFns {
		fuzzy: FilterFn<unknown>;
		dateRange: FilterFn<unknown>;
	}
	interface FilterMeta {
		itemRank: RankingInfo;
	}
}

interface ITableContextSSR<TData> {
	title: string;
	subtitle?: string;
	pagination: IPagination;
	handleSearchParams: (params: Partial<IPaginationQuery>) => void;
	clearSearchParams: () => void;
	isEntry?: boolean;
	table: Table<TData>;
	isLoading?: boolean;
	handleCreate?: () => void;
	handleUpdate?: (row: Row<TData>) => void;
	handleDelete?: (row: Row<TData>) => void;
	handleRefetch?: (options?: RefetchOptions) => Promise<QueryObserverResult<IResponse<any>, Error>>;
	handleDeleteAll?: (rows: Row<TData>[]) => void;
	initialDateRange: [Date | string, Date | string];
	enableRowSelection?: boolean;
	enableDefaultColumns?: boolean;
	start_date?: Date | string;
	end_date?: Date | string;
	onUpdate?: ({ range }: { range: DateRange }) => void;
	onClear?: () => void;
	isClear?: boolean;
	filterOptions?: ITableFilterOptionSSR<any>[];
	isFiltered?: boolean;
	pinFilters: [] | ITableFilterOptionSSR<any>[];
	setPinFilters: React.Dispatch<React.SetStateAction<ITableFilterOptionSSR<any>[] | []>>;
	addPinFilter: (filter: ITableFilterOptionSSR<any>) => void;
	removePinFilter: (filter: ITableFilterOptionSSR<any>) => void;
}

export const TableContextSSR = createContext({} as ITableContextSSR<any>);

interface ITableProviderProps<TData, TValue> {
	title: string;
	subtitle?: string;
	pagination: IPagination;
	isEntry?: boolean;
	children?: React.ReactNode;
	columns: ColumnDef<TData, TValue>[];
	data: TData[];
	isLoading?: boolean;
	enableRowSelection?: boolean;
	enableDefaultColumns?: boolean;
	handleCreate?: () => void;
	handleUpdate?: (row: Row<TData>) => void;
	handleDelete?: (row: Row<TData>) => void;
	handleRefetch?: (options?: RefetchOptions) => Promise<QueryObserverResult<IResponse<any>, Error>>;
	handleDeleteAll?: (rows: Row<TData>[]) => void;
	defaultVisibleColumns?: VisibilityState;
	start_date?: Date | string;
	end_date?: Date | string;
	onUpdate?: ({ range }: { range: DateRange }) => void;
	onClear?: () => void;
	isClear?: boolean;
	filterOptions?: ITableFilterOptionSSR<any>[];
}

function TableProviderSSR<TData, TValue>({
	title,
	subtitle,
	pagination,
	isEntry = false,
	children,
	columns,
	data,
	isLoading,
	enableRowSelection = false,
	enableDefaultColumns = true,
	handleCreate,
	handleUpdate,
	handleDelete,
	handleRefetch,
	handleDeleteAll,
	defaultVisibleColumns = {},
	start_date,
	end_date,
	onUpdate,
	onClear,
	isClear,
	filterOptions,
}: ITableProviderProps<TData, TValue>) {
	const [searchParams, setSearchParams] = useSearchParams();
	const [pinFilters, setPinFilters] = useState<ITableFilterOptionSSR<any>[] | []>(
		filterOptions?.filter((f) => f.isPinned) || []
	);
	const [isMounted, setIsMounted] = useState(false);
	const [isFiltered, setIsFiltered] = useState(false);

	// react table hook, and other codes...
	const tableData = useMemo(() => data, [data]);
	const tableColumns = useMemo(() => columns, [columns]);
	const defaultColumns = useDefaultColumns<TData, TValue>({ isSSR: true });
	const renderColumns = enableDefaultColumns ? tableColumns.concat(defaultColumns) : tableColumns;

	const visibleColumns = renderColumns.filter((column) => !column.meta?.hidden);

	const [rowSelection, setRowSelection] = useState({});
	const [columnVisibility, setColumnVisibility] = useState<VisibilityState>(defaultVisibleColumns);

	const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);

	const addPinFilter = useCallback(
		(filter: ITableFilterOptionSSR<any>) => {
			const exist = pinFilters.find((f) => f.accessor === filter.accessor);
			if (exist) {
				setPinFilters((prev) => prev.filter((f) => f.accessor !== filter.accessor));
				setPinFilters((prev) => [...prev, filter]);
			} else {
				setPinFilters((prev) => [...prev, filter]);
			}
		},
		[pinFilters]
	);

	const removePinFilter = useCallback((filter: ITableFilterOptionSSR<any>) => {
		setPinFilters((prev) => prev.filter((f) => f.accessor !== filter.accessor));
	}, []);

	// Fix error on react table, when the table is not mounted
	useLayoutEffect(() => {
		setIsMounted(true);
	}, []);

	const handleSearchParams = useCallback(
		(params: Partial<IPaginationQuery>) => {
			Object.entries(params).forEach(([key, value]) => {
				if (key !== 'limit' && key !== 'page') {
					setIsFiltered(true);
				}

				if (searchParams.has(key)) searchParams.delete(key);

				searchParams.append(key, String(value));
			});

			searchParams.sort();
			setSearchParams(searchParams);
		},
		[searchParams, setSearchParams]
	);

	const clearSearchParams = useCallback(() => {
		searchParams.forEach((value, key) => searchParams.delete(key));
		setSearchParams({});
		setIsFiltered(false);
	}, [searchParams, setSearchParams]);

	useEffect(() => {
		// set the isFiltered state based on the search params if the table is mounted
		if (isMounted) {
			const params: any = {};
			searchParams.forEach((value, key) => {
				if (key !== 'limit' && key !== 'page') params[key] = value;
			});
			setIsFiltered(Object.keys(params).length > 0 ? true : false);
		}
	}, [searchParams, isMounted]);

	const table = useReactTable({
		data: tableData,
		columns: enableRowSelection ? [TableRowSelection<TData, TValue>(), ...visibleColumns] : visibleColumns,
		initialState: {
			columnPinning: { right: ['actions'] },
		},
		state: {
			columnVisibility,
			rowSelection,
			columnFilters,
		},
		enableRowSelection: true,
		filterFns: {
			dateRange: (row, columnId, value) => dateRange(row, columnId, value),
			fuzzy: fuzzyFilter,
		},
		globalFilterFn: 'fuzzy',
		onRowSelectionChange: setRowSelection,
		onColumnFiltersChange: setColumnFilters,
		onColumnVisibilityChange: setColumnVisibility,
		getCoreRowModel: getCoreRowModel(),
		getFilteredRowModel: getFilteredRowModel(),
		getFacetedRowModel: getFacetedRowModel(),
		getFacetedUniqueValues: getFacetedUniqueValues(),
	});

	const allDates: Date[] = [];
	const createdColumn = table.getColumn('created_at');
	const uniqueCreatedValues = createdColumn?.getFacetedUniqueValues();

	uniqueCreatedValues?.forEach((key, value) => {
		allDates.push(new Date(value));
	});

	const minDate = min(allDates);
	const maxDate = max(allDates);

	const value = useMemo<ITableContextSSR<TData>>(
		() => ({
			title,
			subtitle,
			pagination,
			isEntry,
			isLoading,
			table,
			handleSearchParams,
			clearSearchParams,
			handleCreate,
			handleUpdate,
			handleDelete,
			handleRefetch,
			handleDeleteAll,
			initialDateRange: [minDate, maxDate],
			enableRowSelection,
			enableDefaultColumns,
			start_date,
			end_date,
			onUpdate,
			onClear,
			isClear,
			filterOptions,
			isFiltered,
			pinFilters,
			setPinFilters,
			addPinFilter,
			removePinFilter,
		}),
		[
			title,
			subtitle,
			pagination,
			isEntry,
			isLoading,
			table,
			handleSearchParams,
			clearSearchParams,
			handleCreate,
			handleUpdate,
			handleDelete,
			handleRefetch,
			handleDeleteAll,
			minDate,
			maxDate,
			enableRowSelection,
			enableDefaultColumns,
			start_date,
			end_date,
			onUpdate,
			onClear,
			isClear,
			filterOptions,
			isFiltered,
			pinFilters,
			addPinFilter,
			removePinFilter,
		]
	);

	// Fix error on react table, when the table is not mounted
	if (!isMounted) return null;

	return (
		<TableContextSSR.Provider value={value}>
			<DataTableSSR />
			{children}
		</TableContextSSR.Provider>
	);
}

export default TableProviderSSR;

import React, { createContext, useCallback, useMemo, useState } from 'react';

export type ITableFilter = {
	name: string;
	value: string;
};

interface ITableFilterContext {
	filters: ITableFilter[];
	clearFilters: () => void;
	addFilter: (name: string, value: string) => void;
	isFiltered: () => boolean;
}

export const TableFilterContext = createContext<ITableFilterContext>({} as ITableFilterContext);

interface IFilterProviderProps {
	children: React.ReactNode;
	defaultValues?: ITableFilter[];
}

const TableFilterProvider: React.FC<IFilterProviderProps> = ({ children, defaultValues }) => {
	const [filters, setFilters] = useState<ITableFilter[]>(defaultValues || []);

	const clearFilters = useCallback(() => setFilters([]), []);

	const addFilter = useCallback(
		(name: string, value: string) => {
			// remove duplicate filters
			const filtered = filters.filter((filter) => filter.name !== name);
			setFilters([...filtered, { name, value }]);
		},
		[filters]
	);

	const isFiltered = useCallback(
		() =>
			filters.length > 0 &&
			filters.some((filter) => filter.value !== '' && filter.value !== null && filter.value !== undefined),
		[filters]
	);

	const value = useMemo(
		(): ITableFilterContext => ({
			filters: filters.filter((filter) => filter.value !== ''),
			clearFilters,
			addFilter,
			isFiltered,
		}),
		[filters, clearFilters, addFilter, isFiltered]
	);

	return <TableFilterContext.Provider value={value}>{children}</TableFilterContext.Provider>;
};

export default TableFilterProvider;

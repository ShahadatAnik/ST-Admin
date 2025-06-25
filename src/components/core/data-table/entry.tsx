import { TableProvider } from '@/context';

import { IDataTableEntryProps } from './types';

const DataTableEntry = <TData, TValue>({
	title,
	columns,
	data,
	toolbarOptions,
	defaultVisibleColumns,
}: IDataTableEntryProps<TData, TValue>) => {
	return (
		<TableProvider
			title={title}
			columns={columns}
			data={data}
			enableRowSelection={false}
			toolbarOptions={toolbarOptions}
			defaultVisibleColumns={defaultVisibleColumns}
			isEntry
		/>
	);
};

export default DataTableEntry;

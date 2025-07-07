import { ColumnDef } from '@tanstack/react-table';

import { IJobTableData } from './columns.type';

// Department Columns
export const jobColumns = (): ColumnDef<IJobTableData>[] => [
	{
		accessorKey: 'client_name',
		header: 'Client Name',
		enableColumnFilter: false,
		cell: (info) => info.getValue(),
	},
	{
		accessorKey: 'work_order',
		header: 'Work Order',
		enableColumnFilter: false,
		cell: (info) => info.getValue(),
	},
];

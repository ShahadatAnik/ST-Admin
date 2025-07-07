import { ColumnDef } from '@tanstack/react-table';

import { IClientTableData } from './columns.type';

// Department Columns
export const clientColumns = (): ColumnDef<IClientTableData>[] => [
	{
		accessorKey: 'name',
		header: 'Name',
		enableColumnFilter: false,
		cell: (info) => info.getValue(),
	},
	{
		accessorKey: 'contact_name',
		header: 'Contact Name',
		enableColumnFilter: false,
		cell: (info) => info.getValue(),
	},
	{
		accessorKey: 'contact_number',
		header: 'Contact No.',
		enableColumnFilter: false,
		cell: (info) => info.getValue(),
	},
	{
		accessorKey: 'email',
		header: 'Email',
		enableColumnFilter: false,
		cell: (info) => info.getValue(),
	},
	{
		accessorKey: 'address',
		header: 'Address',
		enableColumnFilter: false,
		cell: (info) => info.getValue(),
	},
];

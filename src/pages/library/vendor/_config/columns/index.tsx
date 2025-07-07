import { ColumnDef } from '@tanstack/react-table';

import DateTime from '@/components/ui/date-time';

import { IVendorTableData } from './columns.type';

// Department Columns
export const vendorColumns = (): ColumnDef<IVendorTableData>[] => [
	{
		accessorKey: 'name',
		header: 'Name',
		enableColumnFilter: false,
		cell: (info) => info.getValue(),
	},
	{
		accessorKey: 'phone',
		header: 'Phone',
		enableColumnFilter: false,
		cell: (info) => info.getValue(),
	},
	{
		accessorKey: 'address',
		header: 'Address',
		enableColumnFilter: false,
		cell: (info) => info.getValue(),
	},
	{
		accessorKey: 'purpose',
		header: 'Purpose',
		enableColumnFilter: false,
		cell: (info) => info.getValue(),
	},
	{
		accessorKey: 'starting_date',
		header: 'Starting Date',
		enableColumnFilter: false,
		cell: (info) => <DateTime date={info.getValue() as Date} isTime={false} />,
	},
	{
		accessorKey: 'ending_date',
		header: 'Ending Date',
		enableColumnFilter: false,
		cell: (info) => <DateTime date={info.getValue() as Date} isTime={false} />,
	},
	{
		accessorKey: 'product_type',
		header: 'Product Type',
		enableColumnFilter: false,
		cell: (info) => info.getValue(),
	},
];

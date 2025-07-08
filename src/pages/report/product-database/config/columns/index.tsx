import { ColumnDef } from '@tanstack/react-table';

import DateTime from '@/components/ui/date-time';

import { IProductDatabaseTableData } from './columns.type';

// Department Columns
export const productDatabaseColumns = (): ColumnDef<IProductDatabaseTableData>[] => [
	{
		accessorKey: 'product_name',
		header: 'Product',
		enableColumnFilter: false,
		cell: (info) => info.getValue(),
	},
	{
		accessorKey: 'serial_number',
		header: 'Serial Number',
		enableColumnFilter: false,
		cell: (info) => info.getValue(),
	},
	{
		accessorKey: 'client_name',
		header: 'Client',
		enableColumnFilter: false,
		cell: (info) => info.getValue(),
	},
	{
		accessorKey: 'job_id',
		header: 'Job No.',
		enableColumnFilter: false,
		cell: (info) => {
			const { uuid, job_id } = info.row.original;
			return (
				<a href={`/lib/job/${uuid}/details`} className='underline' target='_blank'>
					{job_id}
				</a>
			);
		},
	},
	{
		accessorKey: 'purchase_unit_price',
		header: 'Unit Price (Purchase)',
		enableColumnFilter: false,
		cell: (info) => info.getValue(),
	},
	{
		accessorKey: 'selling_unit_price',
		header: 'Unit Price (Selling)',
		enableColumnFilter: false,
		cell: (info) => info.getValue(),
	},
	{
		accessorKey: 'warranty_days',
		header: 'Warranty (Days)',
		enableColumnFilter: false,
		cell: (info) => info.getValue(),
	},
	{
		accessorKey: 'date_of_purchase',
		header: 'Date of Purchase',
		enableColumnFilter: false,
		cell: (info) => <DateTime date={info.getValue() as Date} isTime={false} />,
	},
	{
		accessorKey: 'expiry_date',
		header: 'Expiry Date',
		enableColumnFilter: false,
		cell: (info) => <DateTime date={info.getValue() as Date} isTime={false} />,
	},
	{
		accessorKey: 'vendor_name',
		header: 'Vendor',
		enableColumnFilter: false,
		cell: (info) => info.getValue(),
	},
];

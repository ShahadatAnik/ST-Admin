import { ColumnDef } from '@tanstack/react-table';

import DateTime from '@/components/ui/date-time';

import { IProfitSummeryTableData } from './columns.type';

// Department Columns
export const expanseColumns = (): ColumnDef<IProfitSummeryTableData>[] => [
	{
		accessorKey: 'job_id',
		header: 'Job ID',
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
		accessorKey: 'total_purchased_cost',
		header: 'Total Purchased Cost',
		enableColumnFilter: false,
		cell: (info) => info.getValue(),
	},
	{
		accessorKey: 'operational_expenses',
		header: 'Operational Expenses',
		enableColumnFilter: false,
		cell: (info) => info.getValue(),
	},
	{
		accessorKey: 'total_sell_revenue',
		header: 'Total Sell Revenue',
		enableColumnFilter: false,
		cell: (info) => info.getValue(),
	},
	{
		accessorFn: (row) =>
			Number(row.total_sell_revenue) - Number(row.total_purchased_cost) - Number(row.operational_expenses),
		header: 'Net Profit',
		enableColumnFilter: false,
		cell: (info) => info.getValue(),
	},
];

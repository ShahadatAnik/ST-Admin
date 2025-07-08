import { ColumnDef } from '@tanstack/react-table';

import DateTime from '@/components/ui/date-time';

import { IProfitSummeryTableData } from './columns.type';

// Department Columns
export const profitSummeryColumns = (): ColumnDef<IProfitSummeryTableData>[] => [
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

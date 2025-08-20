import { ColumnDef } from '@tanstack/react-table';

import DateTime from '@/components/ui/date-time';

import { IExpanseTableData } from './columns.type';

// Department Columns
export const expanseColumns = (): ColumnDef<IExpanseTableData>[] => [
	{
		accessorKey: 'job_id',
		header: 'Job No.',
		enableColumnFilter: false,
		cell: (info) => {
			const { job_uuid, job_id } = info.row.original;
			return (
				<a href={`/lib/job/${job_uuid}/details`} className='underline' target='_blank'>
					{job_id}
				</a>
			);
		},
	},
	{
		accessorKey: 'expense_at',
		header: 'Expense At',
		enableColumnFilter: false,
		cell: (info) => <DateTime date={info.getValue() as Date} isTime={false} />,
	},
	{
		accessorKey: 'type',
		header: 'Type',
		enableColumnFilter: false,
		cell: (info) => info.getValue(),
	},
	{
		accessorKey: 'amount',
		header: 'Amount',
		enableColumnFilter: false,
		cell: (info) => info.getValue(),
	},
	{
		accessorKey: 'reason',
		header: 'Reason',
		enableColumnFilter: false,
		cell: (info) => info.getValue(),
	},
];

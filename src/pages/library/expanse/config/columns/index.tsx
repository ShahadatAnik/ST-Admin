import { ColumnDef } from '@tanstack/react-table';

import DateTime from '@/components/ui/date-time';

import { IExpanseTableData } from './columns.type';

// Department Columns
export const expanseColumns = (): ColumnDef<IExpanseTableData>[] => [
	{
		accessorKey: 'job_id',
		header: 'Job ID',
		enableColumnFilter: false,
		cell: (info) => info.getValue(),
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

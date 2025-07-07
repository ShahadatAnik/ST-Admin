import { ColumnDef, Row } from '@tanstack/react-table';

import Transfer from '@/components/buttons/transfer';
import DateTime from '@/components/ui/date-time';

import { ILoanTableData } from './columns.type';

// Department Columns
export const loanColumns = (handlePaid: (row: Row<ILoanTableData>) => void): ColumnDef<ILoanTableData>[] => [
	{
		accessorKey: 'lender_name',
		header: 'Lender Name',
		enableColumnFilter: false,
		cell: (info) => info.getValue(),
	},
	{
		accessorKey: 'type',
		header: 'Type',
		enableColumnFilter: false,
		cell: (info) => info.getValue(),
		size: 40,
	},
	{
		accessorKey: 'amount',
		header: 'Amount',
		enableColumnFilter: false,
		cell: (info) => info.getValue(),
		size: 40,
	},
	{
		accessorKey: 'total_paid_amount',
		header: 'Paid Amount',
		enableColumnFilter: false,
		cell: (info) => info.getValue(),
		size: 40,
	},
	{
		accessorFn: (row) => row.amount - row.total_paid_amount,
		header: 'Remaining',
		enableColumnFilter: false,
		cell: (info) => info.row.original.amount - info.row.original.total_paid_amount,
		size: 40,
	},

	{
		accessorKey: 'taken_at',
		header: 'Taken At',
		enableColumnFilter: false,
		cell: (info) => <DateTime date={info.getValue() as Date} isTime={false} />,
	},
	{
		id: 'action_trx',
		header: 'Paid',
		cell: (info) => <Transfer onClick={() => handlePaid?.(info.row)} />,
		size: 20,
	},
];

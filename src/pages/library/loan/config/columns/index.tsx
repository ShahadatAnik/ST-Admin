import { ColumnDef, Row } from '@tanstack/react-table';

import Add from '@/components/buttons/add';
import { CustomLink } from '@/components/others/link';
import DateTime from '@/components/ui/date-time';

import { ILoanTableData, LoanPaidTableData } from './columns.type';

//* Loan  Columns
export const loanColumns = (handlePaid: (row: Row<ILoanTableData>) => void): ColumnDef<ILoanTableData>[] => [
	{
		accessorKey: 'lender_name',
		header: 'Lender Name',
		enableColumnFilter: false,
		cell: (info) => {
			const uuid = info.row.original.uuid;
			return (
				<CustomLink url={`/lib/loan/${uuid}/details`} label={info.getValue() as string} openInNewTab={true} />
			);
		},
		size: 210,
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
		header: 'Paid | Add Payment',
		enableColumnFilter: false,
		cell: (info) => {
			return (
				<div className='flex gap-2'>
					{info?.getValue() as string | number}
					<Add onClick={() => handlePaid?.(info.row)} />
				</div>
			);
		},
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
];

//* Load Paid Columns

export const loanPaidColumns = (): ColumnDef<LoanPaidTableData>[] => [
	{
		accessorKey: 'index',
		header: 'Index',
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
];

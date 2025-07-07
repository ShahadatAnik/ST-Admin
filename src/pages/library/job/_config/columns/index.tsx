import { ColumnDef, Row } from '@tanstack/react-table';

import Transfer from '@/components/buttons/transfer';

import { IJobTableData } from './columns.type';

// Department Columns
export const jobColumns = (
	handlePayment?: (row: Row<IJobTableData>) => void // Adjust type as needed
): ColumnDef<IJobTableData>[] => [
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
	{
		id: 'payment',
		header: 'Payment',
		cell: (info) => <Transfer onClick={() => handlePayment?.(info.row)} />,
		size: 40,
		meta: {
			// hidden: !actionTrxAccess,
			disableFullFilter: true,
		},
	},
];

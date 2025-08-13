import { ColumnDef, Row } from '@tanstack/react-table';

import StatusButton from '@/components/buttons/status';
import Transfer from '@/components/buttons/transfer';
import DateTime from '@/components/ui/date-time';

import {
	IJobDetailsTableJobEntry,
	IJobDetailsTablePayment,
	IJobDetailsTableProductSerial,
	IJobTableData,
} from './columns.type';

// Department Columns
export const jobColumns = (
	handlePayment?: (row: Row<IJobTableData>) => void // Adjust type as needed
): ColumnDef<IJobTableData>[] => [
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
		header: () => (
			<>
				Client <br /> Name
			</>
		),
		enableColumnFilter: false,
		cell: (info) => info.getValue(),
	},
	{
		accessorKey: 'contact_name',
		header: () => (
			<>
				Contact <br /> Name
			</>
		),
		enableColumnFilter: false,
		cell: (info) => info.getValue(),
	},
	{
		accessorKey: 'contact_number',
		header: () => (
			<>
				Contact <br /> No.
			</>
		),
		enableColumnFilter: false,
		cell: (info) => info.getValue(),
	},
	{
		accessorKey: 'work_order',
		header: () => (
			<>
				Work <br /> Order
			</>
		),
		enableColumnFilter: false,
		cell: (info) => info.getValue(),
	},
	{
		accessorKey: 'total_buying_price',
		header: () => (
			<>
				Buying <br /> Price
			</>
		),
		enableColumnFilter: false,
		cell: (info) => info.getValue(),
	},
	{
		accessorKey: 'total_selling_price',
		header: () => (
			<>
				Selling <br /> Price
			</>
		),
		enableColumnFilter: false,
		cell: (info) => info.getValue(),
	},
	{
		accessorKey: 'total_payment',
		header: () => (
			<>
				Total <br /> Payment
			</>
		),
		enableColumnFilter: false,
		cell: (info) => info.getValue(),
	},
	{
		accessorKey: 'total_balance',
		header: 'Balance',
		enableColumnFilter: false,
		cell: (info) => info.getValue(),
	},
	// {
	// 	accessorKey: 'payment_methods',
	// 	header: () => (
	// 		<>
	// 			Payment <br /> Methods
	// 		</>
	// 	),
	// 	enableColumnFilter: false,
	// 	cell: (info) => info.getValue(),
	// },
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

export const jobEntryDetails = (
	handleSerial?: (index: number) => void // Adjust type as needed
): ColumnDef<IJobDetailsTableJobEntry>[] => [
	{
		accessorKey: 'product_name',
		header: 'Product',
		enableColumnFilter: false,
		cell: (info) => info.getValue(),
	},
	{
		accessorKey: 'vendor_name',
		header: 'Vendor',
		enableColumnFilter: false,
		cell: (info) => info.getValue(),
	},
	{
		accessorKey: 'quantity',
		header: 'Quantity',
		enableColumnFilter: false,
		cell: (info) => info.getValue(),
	},
	{
		accessorKey: 'buying_unit_price',
		header: () => (
			<>
				Buying Unit <br /> Price
			</>
		),
		enableColumnFilter: false,
		cell: (info) => info.getValue(),
	},
	{
		accessorKey: 'selling_unit_price',
		header: () => (
			<>
				Selling Unit <br /> Price
			</>
		),
		enableColumnFilter: false,
		cell: (info) => info.getValue(),
	},
	{
		accessorKey: 'warranty_days',
		header: 'Warranty',
		enableColumnFilter: false,
		cell: (info) => info.getValue(),
	},
	{
		accessorKey: 'purchased_at',
		header: 'Purchased At.',
		enableColumnFilter: false,
		cell: (info) => <DateTime date={new Date(info.getValue() as string)} isTime={false} />,
	},
	{
		accessorKey: 'is_serial_needed',
		header: 'Serial',
		enableColumnFilter: false,
		cell: (info) =>
			info.getValue() ? (
				<Transfer onClick={() => handleSerial?.(info.row.index)} />
			) : (
				<StatusButton value={info.getValue() as boolean} />
			),
	},
];

export const jobEntrySerialDetails = (): ColumnDef<IJobDetailsTableProductSerial>[] => [
	{
		accessorKey: 'index',
		header: 'Index',
		enableColumnFilter: false,
		cell: (info) => info.getValue(),
	},
	{
		accessorKey: 'serial',
		header: 'Serial',
		enableColumnFilter: false,
		cell: (info) => info.getValue(),
	},
];

export const jobPaymentDetails = (): ColumnDef<IJobDetailsTablePayment>[] => [
	{
		accessorKey: 'index',
		header: 'Index',
		enableColumnFilter: false,
		cell: (info) => info.getValue(),
	},
	{
		accessorKey: 'paid_at',
		header: 'Paid At.',
		enableColumnFilter: false,
		cell: (info) => <DateTime date={new Date(info.getValue() as string)} isTime={false} />,
	},
	{
		accessorKey: 'method',
		header: 'Method',
		enableColumnFilter: false,
		cell: (info) => info.getValue(),
	},
	{
		accessorKey: 'amount',
		header: 'Amount',
		enableColumnFilter: false,
		cell: (info) => info.getValue(),
	},
];

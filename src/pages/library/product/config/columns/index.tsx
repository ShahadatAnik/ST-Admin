import { ColumnDef } from '@tanstack/react-table';

import { IProductTableData } from './columns.type';

// Department Columns
export const productColumns = (): ColumnDef<IProductTableData>[] => [
	{
		accessorKey: 'name',
		header: 'Name',
		enableColumnFilter: false,
		cell: (info) => info.getValue(),
	},
	{
		accessorKey: 'product_category_name',
		header: 'Product Category',
		enableColumnFilter: false,
		cell: (info) => info.getValue(),
	},
];

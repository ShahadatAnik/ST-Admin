import { ColumnDef } from '@tanstack/react-table';

import { IProductCategoryTableData } from './columns.type';

// Department Columns
export const productCategoryColumns = (): ColumnDef<IProductCategoryTableData>[] => [
	{
		accessorKey: 'name',
		header: 'Name',
		enableColumnFilter: false,
		cell: (info) => info.getValue(),
	},
	{
		accessorKey: 'short_name',
		header: 'Short Name',
		enableColumnFilter: false,
		cell: (info) => info.getValue(),
	},
];

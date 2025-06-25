import { ColumnDef } from '@tanstack/react-table';

import PageAssign from '@/components/buttons/page-assign';
import ResetPassword from '@/components/buttons/reset-password';
import ColumnImage from '@/components/core/data-table/_views/column-image';
import { Switch } from '@/components/ui/switch';

import { UserColumnProps } from '../types';
import { IDepartmentTableData, IDesignationTableData, IUserTableData } from './columns.type';

// Department Columns
export const departmentColumns = (): ColumnDef<IDepartmentTableData>[] => [
	{
		accessorKey: 'name',
		header: 'Department',
		enableColumnFilter: false,
		cell: (info) => info.getValue(),
	},
];

// Designation Columns
export const designationColumns = (): ColumnDef<IDesignationTableData>[] => [
	{
		accessorKey: 'name',
		header: 'Designation',
		enableColumnFilter: false,
		cell: (info) => info.getValue(),
	},
];

// User Columns
export function userColumns(): ColumnDef<IUserTableData>[] {
	return [
		{
			accessorKey: 'image',
			header: 'Image',
			enableColumnFilter: false,
			cell: (info) => <ColumnImage src={info.getValue() as string} alt={info.row.original.name} />,
		},

		{
			accessorKey: 'name',
			header: 'Name',
			enableColumnFilter: false,
			cell: (info) => <span className='capitalize'>{info.getValue<string>()}</span>,
		},
		{
			accessorKey: 'phone',
			header: 'Phone',
			enableColumnFilter: false,
			cell: (info) => <span className='capitalize'>{info.getValue<string>()}</span>,
		},
		{
			accessorKey: 'email',
			header: 'Email',
			enableColumnFilter: false,
			cell: (info) => info.getValue(),
		},
		{
			accessorKey: 'office',
			header: 'Office',
			enableColumnFilter: false,
			cell: (info) => info.getValue(),
		},
		{
			accessorFn: (row) => {
				const { department_name, designation_name } = row;

				return `${department_name} - ${designation_name}`;
			},
			header: 'Department',
			enableColumnFilter: false,
			cell: (info) => {
				const { department_name, designation_name } = info.row.original;

				return (
					<div className='flex flex-col'>
						<span className='capitalize'>{department_name}</span>
						<span className='text-xs capitalize text-gray-400'>{designation_name}</span>
					</div>
				);
			},
		},
	];
}

export function authColumns({
	pageAssignAccess,
	resetPasswordAccess,
	statusAccess,
	handleStatus,
	handleResetPassword,
	handlePageAssign,
}: UserColumnProps): ColumnDef<IUserTableData>[] {
	return [
		{
			accessorKey: 'status',
			header: 'Status',
			enableColumnFilter: false,
			cell: (info) => {
				return (
					<Switch checked={Number(info.getValue()) === 1} onCheckedChange={() => handleStatus(info.row)} />
				);
			},
			size: 40,
			meta: {
				hidden: !statusAccess,
			},
		},
		{
			accessorKey: 'image',
			header: 'Image',
			enableColumnFilter: false,
			cell: (info) => <ColumnImage src={info.getValue() as string} alt={info.row.original.name} />,
		},

		{
			accessorKey: 'name',
			header: 'Name',
			enableColumnFilter: false,
			cell: (info) => <span className='capitalize'>{info.getValue<string>()}</span>,
		},
		{
			accessorKey: 'email',
			header: 'Email',
			enableColumnFilter: false,
		},

		{
			accessorKey: 'reset_pass_actions',
			id: 'reset_pass_actions',
			header: () => (
				<span>
					Reset <br />
					Password
				</span>
			),
			enableColumnFilter: false,
			enableSorting: false,
			cell: (info) => <ResetPassword onClick={() => handleResetPassword(info.row)} />,
			size: 40,
			meta: {
				hidden: !resetPasswordAccess,
				disableFullFilter: true,
			},
		},

		{
			accessorKey: 'page_assign_actions',
			id: 'page_assign_actions',
			header: () => (
				<span>
					Page <br />
					Assign
				</span>
			),
			enableColumnFilter: false,
			enableSorting: false,
			cell: (info) => <PageAssign onClick={() => handlePageAssign(info.row)} />,
			size: 40,
			meta: {
				hidden: !pageAssignAccess,
				disableFullFilter: true,
			},
		},
	];
}

import { stat } from 'fs';
import { lazy, useMemo, useState } from 'react';
import { PageProvider, TableProvider } from '@/context';
import { Row } from '@tanstack/react-table';
import { useNavigate } from 'react-router-dom';

import ReactSelect from '@/components/ui/react-select';

import { PageInfo } from '@/utils';
import renderSuspenseModals from '@/utils/renderSuspenseModals';

import { loanColumns } from './config/columns';
import { ILoanTableData } from './config/columns/columns.type';
import { useLibLoans } from './config/query';

const AddOrUpdate = lazy(() => import('./add-or-update'));
const DeleteModal = lazy(() => import('@core/modal/delete'));

const Loan = () => {
	const navigate = useNavigate();
	const [status, setStatus] = useState('all');
	const options = [
		{ value: 'all', label: 'All' },
		{ value: 'completed', label: 'Completed' },
		{ value: 'pending', label: 'Pending' },
	];

	const { data, isLoading, url, deleteData, postData, updateData, refetch } = useLibLoans<ILoanTableData[]>(
		`is_completed=${status}`
	);

	const pageInfo = useMemo(() => new PageInfo('Library/Loan', url, 'lib__loan'), [url]);

	// Add/Update Modal state
	const [isOpenAddModal, setIsOpenAddModal] = useState(false);

	const handleCreate = () => {
		setIsOpenAddModal(true);
	};

	const [updatedData, setUpdatedData] = useState<ILoanTableData | null>(null);

	const handleUpdate = (row: Row<ILoanTableData>) => {
		setUpdatedData(row.original);
		setIsOpenAddModal(true);
	};

	// Delete Modal state
	const [deleteItem, setDeleteItem] = useState<{
		id: string;
		name: string;
	} | null>(null);

	const handleDelete = (row: Row<ILoanTableData>) => {
		setDeleteItem({
			id: row?.original?.uuid,
			name: row?.original?.lender_name,
		});
	};

	const handlePaid = (row: Row<ILoanTableData>) => {
		navigate(`/lib/loan/${row.original.uuid}/paid`);
	};

	// Table Columns
	const columns = loanColumns(handlePaid);

	return (
		<PageProvider pageName={pageInfo.getTab()} pageTitle={pageInfo.getTabName()}>
			<TableProvider
				title={pageInfo.getTitle()}
				columns={columns}
				data={data ?? []}
				isLoading={isLoading}
				handleCreate={handleCreate}
				handleUpdate={handleUpdate}
				handleDelete={handleDelete}
				handleRefetch={refetch}
				otherToolBarComponents={
					<ReactSelect
						placeholder='Select status'
						options={options}
						value={options?.find((option) => option.value === status)}
						menuPortalTarget={document.body}
						styles={{
							menuPortal: (base) => ({ ...base, zIndex: 999 }),
							control: (base) => ({ ...base, minWidth: 120 }),
						}}
						onChange={(e: any) => {
							setStatus(e?.value);
						}}
					/>
				}
			>
				{renderSuspenseModals([
					<AddOrUpdate
						{...{
							url,
							open: isOpenAddModal,
							setOpen: setIsOpenAddModal,
							updatedData,
							setUpdatedData,
							postData,
							updateData,
						}}
					/>,

					<DeleteModal
						{...{
							deleteItem,
							setDeleteItem,
							url,
							deleteData,
						}}
					/>,
				])}
			</TableProvider>
		</PageProvider>
	);
};

export default Loan;

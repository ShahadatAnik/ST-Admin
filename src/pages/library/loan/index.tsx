import { lazy, useMemo, useState } from 'react';
import { PageProvider, TableProvider } from '@/context';
import { Row } from '@tanstack/react-table';
import { useNavigate } from 'react-router-dom';

import { PageInfo } from '@/utils';
import renderSuspenseModals from '@/utils/renderSuspenseModals';

import { loanColumns } from './config/columns';
import { ILoanTableData } from './config/columns/columns.type';
import { useLibLoans } from './config/query';

const AddOrUpdate = lazy(() => import('./add-or-update'));
const DeleteModal = lazy(() => import('@core/modal/delete'));

const Loan = () => {
	const navigate = useNavigate();
	const { data, isLoading, url, deleteData, postData, updateData, refetch } = useLibLoans<ILoanTableData[]>();

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

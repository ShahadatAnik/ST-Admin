import { lazy, useMemo, useState } from 'react';
import { PageProvider, TableProvider } from '@/context';
import { Row } from '@tanstack/react-table';

import { useOtherVendor } from '@/lib/common-queries/other';
import { PageInfo } from '@/utils';
import renderSuspenseModals from '@/utils/renderSuspenseModals';

import { vendorColumns } from './_config/columns';
import { IVendorTableData } from './_config/columns/columns.type';
import { useVendor } from './_config/query';

const AddOrUpdate = lazy(() => import('./add-or-update'));
const DeleteModal = lazy(() => import('@core/modal/delete'));

const DetailsPage = () => {
	const { data, isLoading, url, updateData, deleteData, postData, refetch } = useVendor<IVendorTableData[]>();
	const { invalidateQuery: invalidateVendor } = useOtherVendor();

	const pageInfo = useMemo(() => new PageInfo('Library/Vendor', url, 'lib__vendor'), [url]);

	// Add/Update Modal state
	const [isOpenAddModal, setIsOpenAddModal] = useState(false);

	const handleCreate = () => {
		setIsOpenAddModal(true);
	};

	const [updatedData, setUpdatedData] = useState<IVendorTableData | null>(null);
	const handleUpdate = (row: Row<IVendorTableData>) => {
		setUpdatedData(row.original);
		setIsOpenAddModal(true);
	};

	// Delete Modal state
	const [deleteItem, setDeleteItem] = useState<{
		id: string;
		name: string;
	} | null>(null);

	const handleDelete = (row: Row<IVendorTableData>) => {
		setDeleteItem({
			id: row?.original?.uuid,
			name: row?.original?.name,
		});
	};

	// Table Columns
	const columns = vendorColumns();

	return (
		<PageProvider pageName={pageInfo.getTab()} pageTitle={pageInfo.getTabName()}>
			<TableProvider
				defaultVisibleColumns={{
					created_by_name: false,
					created_at: false,
					updated_at: false,
				}}
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
							invalidateQuery: invalidateVendor,
						}}
					/>,
				])}
			</TableProvider>
		</PageProvider>
	);
};

export default DetailsPage;

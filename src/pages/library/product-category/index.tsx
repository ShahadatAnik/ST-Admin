import { lazy, useMemo, useState } from 'react';
import { PageProvider, TableProvider } from '@/context';
import { Row } from '@tanstack/react-table';

import { PageInfo } from '@/utils';
import renderSuspenseModals from '@/utils/renderSuspenseModals';

import { productCategoryColumns } from './config/columns';
import { IProductCategoryTableData } from './config/columns/columns.type';
import { useLibProductsCategory } from './config/query';

const AddOrUpdate = lazy(() => import('./add-or-update'));
const DeleteModal = lazy(() => import('@core/modal/delete'));

const ProductCategory = () => {
	const { data, isLoading, url, deleteData, postData, updateData, refetch } =
		useLibProductsCategory<IProductCategoryTableData[]>();

	const pageInfo = useMemo(() => new PageInfo('Library/Product Category', url, 'lib__product_category'), [url]);

	// Add/Update Modal state
	const [isOpenAddModal, setIsOpenAddModal] = useState(false);

	const handleCreate = () => {
		setIsOpenAddModal(true);
	};

	const [updatedData, setUpdatedData] = useState<IProductCategoryTableData | null>(null);

	const handleUpdate = (row: Row<IProductCategoryTableData>) => {
		setUpdatedData(row.original);
		setIsOpenAddModal(true);
	};

	// Delete Modal state
	const [deleteItem, setDeleteItem] = useState<{
		id: string;
		name: string;
	} | null>(null);

	const handleDelete = (row: Row<IProductCategoryTableData>) => {
		setDeleteItem({
			id: row?.original?.uuid,
			name: row?.original?.name,
		});
	};

	// Table Columns
	const columns = productCategoryColumns();

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

export default ProductCategory;

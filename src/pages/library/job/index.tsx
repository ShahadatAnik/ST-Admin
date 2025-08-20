import { lazy, useEffect, useMemo, useState } from 'react';
import { PageProvider, TableProvider } from '@/context';
import { Row } from '@tanstack/react-table';
import { se } from 'date-fns/locale';
import { useNavigate } from 'react-router-dom';

import { PageInfo } from '@/utils';
import renderSuspenseModals from '@/utils/renderSuspenseModals';

import OrderSheetPdf, { default as ChallanPdf } from '../../../components/pdf/challan-pdf';
import { default as JobPdf } from '../../../components/pdf/job-pdf';
import { jobColumns } from './_config/columns';
import { IJobDetailsTableData, IJobTableData } from './_config/columns/columns.type';
import { useJob, useJobByUUID } from './_config/query';

const DeleteModal = lazy(() => import('@core/modal/delete'));

const DetailsPage = () => {
	const navigate = useNavigate();
	const { data, isLoading, url, deleteData, refetch } = useJob<IJobTableData[]>();
	const pageInfo = useMemo(() => new PageInfo('Library/Job', url, 'lib__job'), [url]);

	const handleCreate = () => {
		navigate('/lib/job/create');
	};

	const handleUpdate = (row: Row<IJobTableData>) => {
		navigate(`/lib/job/${row.original.uuid}/update`);
	};

	// Delete Modal state
	const [deleteItem, setDeleteItem] = useState<{
		id: string;
		name: string;
	} | null>(null);

	const handleDelete = (row: Row<IJobTableData>) => {
		setDeleteItem({
			id: row?.original?.uuid,
			name: row?.original?.uuid,
		});
	};

	const handlePayment = (row: Row<IJobTableData>) => {
		navigate(`/lib/job/${row.original.uuid}/payment`);
	};

	// Table Columns
	const columns = jobColumns(handlePayment);

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

export default DetailsPage;

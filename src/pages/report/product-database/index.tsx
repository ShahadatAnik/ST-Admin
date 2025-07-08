import { useMemo } from 'react';
import { PageProvider, TableProvider } from '@/context';

import { PageInfo } from '@/utils';

import { productDatabaseColumns } from './config/columns';
import { IProductDatabaseTableData } from './config/columns/columns.type';
import { useLibReportProductDatabase } from './config/query';

const Expanse = () => {
	const { data, isLoading, url, refetch } = useLibReportProductDatabase<IProductDatabaseTableData[]>();

	const pageInfo = useMemo(() => new PageInfo('Library/Product Database', url, 'lib__product_database'), [url]);
	// Table Columns
	const columns = productDatabaseColumns();

	return (
		<PageProvider pageName={pageInfo.getTab()} pageTitle={pageInfo.getTabName()}>
			<TableProvider
				title={pageInfo.getTitle()}
				columns={columns}
				data={data ?? []}
				isLoading={isLoading}
				handleRefetch={refetch}
				defaultVisibleColumns={{ created_at: false, updated_at: false, created_by_name: false, remarks: false }}
			></TableProvider>
		</PageProvider>
	);
};

export default Expanse;

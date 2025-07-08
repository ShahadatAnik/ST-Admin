import { useMemo, useState } from 'react';
import { PageProvider, TableProvider } from '@/context';
import { Row } from '@tanstack/react-table';

import { PageInfo } from '@/utils';

import { profitSummeryColumns } from './config/columns';
import { IProfitSummeryTableData } from './config/columns/columns.type';
import { useLibReportProfitSummary } from './config/query';

const Expanse = () => {
	const { data, isLoading, url, refetch } = useLibReportProfitSummary<IProfitSummeryTableData[]>();

	const pageInfo = useMemo(() => new PageInfo('Library/Profit Summary', url, 'lib__profit_summary'), [url]);
	// Table Columns
	const columns = profitSummeryColumns();

	return (
		<PageProvider pageName={pageInfo.getTab()} pageTitle={pageInfo.getTabName()}>
			<TableProvider
				title={pageInfo.getTitle()}
				columns={columns}
				data={data ?? []}
				isLoading={isLoading}
				handleRefetch={refetch}
				defaultVisibleColumns={{ created_at: false, updated_at: false, created_by_name: false }}
			></TableProvider>
		</PageProvider>
	);
};

export default Expanse;

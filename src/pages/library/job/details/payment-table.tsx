import DataTableEntry from '@/components/core/data-table/entry';

import { jobPaymentDetails } from '../_config/columns';
import { IJobDetailsTableData } from '../_config/columns/columns.type';

const Table: React.FC<{ data: IJobDetailsTableData; isLoading: boolean }> = ({ data, isLoading }) => {
	if (isLoading) return <div>Loading...</div>;

	const columnsQ = jobPaymentDetails();
	return (
		<div className='flex flex-col gap-4'>
			<DataTableEntry
				title={'Payment'}
				columns={columnsQ}
				data={data?.payment ?? []}
				defaultVisibleColumns={{ created_by_name: false, created_at: false, updated_at: false }}
			></DataTableEntry>
		</div>
	);
};

export default Table;

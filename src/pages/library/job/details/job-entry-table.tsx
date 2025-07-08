import { Suspense, useState } from 'react';

import DataTableEntry from '@/components/core/data-table/entry';

import { jobEntryDetails } from '../_config/columns';
import { IJobDetailsTableData, IJobDetailsTableProductSerial } from '../_config/columns/columns.type';
import SerialModal from './serial';

const Table: React.FC<{ data: IJobDetailsTableData; isLoading: boolean }> = ({ data, isLoading }) => {
	const [isOpenAddModal, setIsOpenAddModal] = useState(false);
	const [serial, setSerial] = useState<IJobDetailsTableProductSerial[]>([]);

	const handleSerial = (index: number) => {
		const value = data.job_entry[index].product_serial;
		setSerial(value);
		setIsOpenAddModal(true);
	};

	if (isLoading) return <div>Loading...</div>;

	const columnsQ = jobEntryDetails(handleSerial);
	return (
		<div className='flex flex-col gap-4'>
			<DataTableEntry
				title={'Job Entry'}
				columns={columnsQ}
				data={data?.job_entry ?? []}
				defaultVisibleColumns={{ created_by_name: false, created_at: false, updated_at: false }}
			></DataTableEntry>

			<Suspense fallback={null}>
				<SerialModal
					{...{
						data: serial,
						open: isOpenAddModal,
						setOpen: setIsOpenAddModal,
					}}
				/>
			</Suspense>
		</div>
	);
};

export default Table;

import DataTableEntry from '@/components/core/data-table/entry';
import { DetailsModal } from '@core/modal';

import { jobEntrySerialDetails } from '../_config/columns';
import { IJobDetailsTableProductSerial } from '../_config/columns/columns.type';

const SerialModal: React.FC<{
	data: IJobDetailsTableProductSerial[];
	open: boolean;
	setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}> = ({ data, open, setOpen }) => {
	const onClose = () => {
		setOpen((prev: boolean) => !prev);
	};

	const columnsQ = jobEntrySerialDetails();

	return (
		<DetailsModal
			isSmall
			open={open}
			setOpen={onClose}
			content={
				<DataTableEntry
					title={'Item Work Order Entry'}
					columns={columnsQ}
					data={data ?? []}
					defaultVisibleColumns={{ created_by_name: false, created_at: false, updated_at: false }}
				></DataTableEntry>
			}
		/>
	);
};

export default SerialModal;

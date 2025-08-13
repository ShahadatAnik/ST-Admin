import { format } from 'path';
import React from 'react';

import StatusButton from '@/components/buttons/status';
import SectionContainer from '@/components/others/section-container';
import TableList, { ITableListItems } from '@/components/others/table-list';
import DateTime from '@/components/ui/date-time';

import { formatDateTable } from '@/utils/formatDate';

import { IJobDetailsTableData } from '../_config/columns/columns.type';

const Information: React.FC<{ data: IJobDetailsTableData }> = ({ data }) => {
	const renderHeaderItems = (): ITableListItems => {
		return [
			{
				label: 'Job No.',
				value: data.job_id,
			},
			{
				label: 'Client',
				value: data.client_name,
			},
			{
				label: 'Work Order',
				value: data.work_order,
			},
			{
				label: 'Subject',
				value: data.subject,
			},
			{
				label: 'To Date',
				value: data.to_date && <DateTime date={new Date(data.to_date)} isTime={false} />,
			},
			// {
			// 	label: 'Store Received',
			// 	value: <StatusButton value={data?.is_store_received as boolean} />,
			// },
			{
				label: 'Created at',
				value: data.created_at && <DateTime date={new Date(data.created_at)} isTime={false} />,
			},
			{
				label: 'Updated at',
				value: data.updated_at && <DateTime date={new Date(data.updated_at)} isTime={false} />,
			},
			{
				label: 'Created By',
				value: data.created_by_name,
			},
			{
				label: 'Remarks',
				value: data.remarks,
			},
		];
	};

	return (
		<>
			<SectionContainer title={'General Information'} className='h-1/3'>
				<TableList title='Job Details' items={renderHeaderItems()} />
			</SectionContainer>
		</>
	);
};

export default Information;

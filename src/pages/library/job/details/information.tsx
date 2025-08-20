import { format } from 'path';
import React, { useEffect, useState } from 'react';
import { Download } from 'lucide-react';

import StatusButton from '@/components/buttons/status';
import SectionContainer from '@/components/others/section-container';
import TableList, { ITableListItems } from '@/components/others/table-list';
import DateTime from '@/components/ui/date-time';

import { formatDateTable } from '@/utils/formatDate';

import { IJobDetailsTableData } from '../_config/columns/columns.type';
import { default as ChallanPdf } from '../../../../components/pdf/challan-pdf';
import { default as JobPdf } from '../../../../components/pdf/job-pdf';

const Information: React.FC<{ data: IJobDetailsTableData; jobPdf?: any; challanPdf?: any }> = ({ data }) => {
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
	const [challanUrl, setChallanUrl] = useState('');
	const [quotationUrl, setQuotationUrl] = useState('');
	const [billUrl, setBillUrl] = useState('');

	useEffect(() => {
		if (data) {
			ChallanPdf(data)?.getDataUrl((dataUrl) => {
				setChallanUrl(dataUrl);
			});
			JobPdf(data, 'Quotation').getDataUrl((dataUrl) => {
				setQuotationUrl(dataUrl);
			});
			JobPdf(data, 'Bill').getDataUrl((dataUrl) => {
				setBillUrl(dataUrl);
			});
		}
	}, [data]);
	const renderHeaderItem2 = (): ITableListItems => {
		return [
			{
				label: 'Quotation',
				value: (
					<a
						href={quotationUrl}
						download={`${data.job_id}-Quotation.pdf`}
						className='btn btn-success flex items-center gap-2'
					>
						<Download />
					</a>
				),
			},
			{
				label: 'Challan',
				value: (
					<a
						href={challanUrl}
						download={`${data.job_id}-Challan.pdf`}
						className='btn btn-success flex items-center gap-2'
					>
						<Download />
					</a>
				),
			},
			{
				label: 'Bill',
				value: (
					<a
						href={billUrl}
						download={`${data.job_id}-Bill.pdf`}
						className='btn btn-success flex items-center gap-2'
					>
						<Download />
					</a>
				),
			},
		];
	};

	return (
		<>
			<SectionContainer title={'General Information'} className='h-1/3'>
				<div className='grid w-full grid-cols-2 gap-2'>
					<TableList title='Job Details' items={renderHeaderItems()} />
					<TableList title='PDF' items={renderHeaderItem2()} />
				</div>
			</SectionContainer>
		</>
	);
};

export default Information;

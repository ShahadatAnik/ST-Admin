import React from 'react';

import SectionContainer from '@/components/others/section-container';
import TableList, { ITableListItems } from '@/components/others/table-list';

import { formatDateTable } from '@/utils/formatDate';

import { ILoanTableData } from '../config/columns/columns.type'; // TODO: update data type

const Information: React.FC<{ data: ILoanTableData }> = ({ data }) => {
	const totalPaid = data?.loan_paid.reduce((acc, item) => {
		return acc + item.amount;
	}, 0);

	const renderItems = (): ITableListItems => {
		return [
			{
				label: 'Lender Name',
				value: data.lender_name,
			},
			{ label: 'Type', value: data.type },
			{ label: 'Amount', value: data.amount },
			{ label: 'Remaining', value: data?.amount - totalPaid },
			{
				label: 'Date',
				value: formatDateTable(data.taken_at),
			},
		];
	};
	const renderItems2 = (): ITableListItems => {
		return [
			{
				label: 'Created At',
				value: formatDateTable(data.created_at),
			},
			{
				label: 'Updated At',
				value: formatDateTable(data.updated_at),
			},
			{ label: 'Paid', value: totalPaid },
			{ label: 'Remarks', value: data.remarks },
		];
	};

	return (
		<SectionContainer title={'Information'}>
			<div className='grid grid-cols-1 gap-5 md:grid-cols-2'>
				<TableList items={renderItems()} />
				<TableList items={renderItems2()} />
			</div>
		</SectionContainer>
	);
};

export default Information;

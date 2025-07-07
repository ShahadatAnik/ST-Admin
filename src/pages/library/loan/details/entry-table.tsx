import React from 'react';

import DataTableEntry from '@core/data-table/entry';

import { loanPaidColumns } from '../config/columns';
import { ILoanTableData } from '../config/columns/columns.type';

const EntryTable: React.FC<{ data: ILoanTableData }> = ({ data }) => {
	const columns = loanPaidColumns();

	return (
		<DataTableEntry
			title='Loan Paid'
			columns={columns}
			data={data?.loan_paid || []}
			defaultVisibleColumns={{ created_at: false, updated_at: false, created_by_name: false }}
		/>
	);
};

export default EntryTable;

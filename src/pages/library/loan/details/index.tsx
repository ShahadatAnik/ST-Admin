import { useEffect } from 'react';
import { useParams } from 'react-router-dom';

import { ILoanTableData } from '../config/columns/columns.type';
import { useLibLoanPaidByLoanUUID } from '../config/query'; // TODO: replace with details query
import EntryTable from './entry-table';
import Information from './information';

const DetailsPage = () => {
	const { uuid } = useParams();
	const { data, isLoading } = useLibLoanPaidByLoanUUID<ILoanTableData>(uuid as string);

	useEffect(() => {
		document.title = 'Purchase Details';
	}, []);

	if (isLoading) return <div>Loading...</div>;

	return (
		<div className='space-y-8'>
			<Information data={(data || []) as ILoanTableData} />
			<EntryTable data={(data || []) as ILoanTableData} />
		</div>
	);
};

export default DetailsPage;

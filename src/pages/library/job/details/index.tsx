import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import { IJobDetailsTableData } from '../_config/columns/columns.type';
import { useJobByUUID } from '../_config/query';
import Information from './information';
import JonEntryTable from './job-entry-table';
import PaymentTable from './payment-table';

const Index = () => {
	const { uuid } = useParams();
	const { data, isLoading } = useJobByUUID<IJobDetailsTableData>(uuid as string);

	useEffect(() => {
		document.title = 'Job Details';
	}, []);

	if (isLoading) return <div>Loading...</div>;

	return (
		<div className='space-y-8'>
			<Information data={(data || []) as IJobDetailsTableData} />
			<JonEntryTable data={(data || []) as IJobDetailsTableData} isLoading={isLoading} />
			<PaymentTable data={(data || []) as IJobDetailsTableData} isLoading={isLoading} />
		</div>
	);
};

export default Index;

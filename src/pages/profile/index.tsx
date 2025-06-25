import { useEffect } from 'react';
import useAuth from '@/hooks/useAuth';

import { IUserTableData } from './_config/columns/columns.type';
import { useHrUsersByUUID } from './_config/query'; // TODO: replace with details query

import Information from './information';

const DetailsPage = () => {
	const { user } = useAuth();
	const { data, isLoading, url, updateData, imageUpdateData, postData } = useHrUsersByUUID<IUserTableData>(
		user?.uuid as string
	);

	useEffect(() => {
		document.title = 'Profile';
	}, []);

	if (isLoading) return <div>Loading...</div>;

	return (
		<div className='space-y-8'>
			<Information
				data={(data || []) as IUserTableData}
				imageUpdateData={imageUpdateData}
				updateData={updateData}
				postData={postData}
				url={url}
			/>
		</div>
	);
};

export default DetailsPage;

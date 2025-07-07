import React, { lazy, useState } from 'react';
import useAccess from '@/hooks/useAccess';

import SectionContainer from '@/components/others/section-container';
import TableList, { ITableListItems } from '@/components/others/table-list';
import { Button } from '@/components/ui/button';

import { formatDateTable } from '@/utils/formatDate';
import renderSuspenseModals from '@/utils/renderSuspenseModals';

import { IResetPassword, IUserTableData } from './_config/columns/columns.type'; // TODO: update data type

const AddOrUpdate = lazy(() => import('./add-or-update'));
const ResetPassword = lazy(() => import('../hr/auth/reset-password'));

const Information: React.FC<{
	data: IUserTableData;
	imageUpdateData: any;
	updateData: any;
	postData: any;
	url: string;
}> = ({ data, imageUpdateData, updateData, postData, url }) => {
	// Add state for AddOrUpdate modal
	const [isOpenAddModal, setIsOpenAddModal] = useState(false);
	const [updatedData, setUpdatedData] = useState<IUserTableData | null>(null);
	const handleEdit = () => {
		setUpdatedData(data); // Pass current data to modal
		setIsOpenAddModal(true);
	};
	// Action Trx Modal state
	const [isOpenResetPasswordModal, setIsOpenResetPasswordModal] = useState(false);
	const [updateResetPasswordData, setUpdateResetPasswordData] = useState<IResetPassword | null>(null);

	// Reset Password Handler
	const handleResetPassword = () => {
		setUpdateResetPasswordData({
			uuid: data.uuid,
			name: data.name,
		});
		setIsOpenResetPasswordModal(true);
	};
	const renderItems = (): ITableListItems => {
		return [
			{
				label: 'Name',
				value: data.name,
			},
			{
				label: 'Email',
				value: data.email,
			},
			{
				label: 'Designation',
				value: data.designation,
			},
			{
				label: 'Department',
				value: data.department,
			},
			{
				label: 'Phone',
				value: data.phone,
			},
			{
				label: 'Ext',
				value: data.ext,
			},
			{
				label: 'Created',
				value: formatDateTable(data.created_at),
			},
			{
				label: 'Updated',
				value: formatDateTable(data.updated_at),
			},
			{ label: 'Remarks', value: data.remarks },
			{
				label: 'Edit',
				value: <Button onClick={handleEdit}>Edit</Button>,
			},
			{
				label: 'Reset Password',
				value: <Button onClick={handleResetPassword}>Reset Password</Button>,
			},
		];
	};

	return (
		<>
			<SectionContainer title={`${data.name} Information`}>
				<TableList items={renderItems()} />
			</SectionContainer>
			{renderSuspenseModals([
				<AddOrUpdate
					{...{
						url: url,
						open: isOpenAddModal,
						setOpen: setIsOpenAddModal,
						updatedData,
						setUpdatedData,
						postData,
						imageUpdateData,
					}}
				/>,
				<ResetPassword
					{...{
						open: isOpenResetPasswordModal,
						setOpen: setIsOpenResetPasswordModal,
						updatedData: updateResetPasswordData,
						setUpdatedData: setUpdateResetPasswordData,
						updateData,
						url: `/hr/users/password/${updateResetPasswordData?.uuid}`,
					}}
				/>,
			])}
		</>
	);
};

export default Information;

import { useEffect } from 'react';
import useAuth from '@/hooks/useAuth';
import useRHF from '@/hooks/useRHF';

import { IFormSelectOption } from '@/components/core/form/types';
import { FormField } from '@/components/ui/form';
import CoreForm from '@core/form';
import { AddModal } from '@core/modal';

import { useOtherDepartment, useOtherDesignation } from '@/lib/common-queries/other';
import nanoid from '@/lib/nanoid';
import { getDateTime } from '@/utils';
import Formdata from '@/utils/formdata';

import { useHrUsersByUUID } from '../_config/query';
import { IUser, USER_NULL, USER_SCHEMA } from '../_config/schema';
import { IUserAddOrUpdateProps } from '../_config/types';

const AddOrUpdate: React.FC<IUserAddOrUpdateProps> = ({
	url,
	open,
	setOpen,
	updatedData,
	setUpdatedData,
	imagePostData,
	imageUpdateData,
}) => {
	const isUpdate = !!updatedData;

	const { user } = useAuth();
	const { data } = useHrUsersByUUID(updatedData?.uuid as string);
	const { data: departmentData } = useOtherDepartment<IFormSelectOption[]>();
	const { data: designationData } = useOtherDesignation<IFormSelectOption[]>();

	const form = useRHF(USER_SCHEMA(isUpdate) as any, USER_NULL);

	const onClose = () => {
		setUpdatedData?.(null);
		form.reset(USER_NULL);
		setOpen((prev) => !prev);
	};

	// Reset form values when data is updated
	useEffect(() => {
		if (data && isUpdate) {
			form.reset(data);
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [data, isUpdate]);

	// Submit handler
	async function onSubmit(values: IUser) {
		const formData = Formdata<IUser>(values);

		if (isUpdate) {
			formData.append('updated_at', getDateTime());
			// UPDATE ITEM
			await imageUpdateData.mutateAsync({
				url: `${url}/${updatedData?.uuid}`,
				updatedData: formData,
				onClose,
			});

			return;
		}

		// ADD NEW ITEM
		formData.append('created_at', getDateTime());
		formData.append('created_by', user?.uuid || '');
		formData.append('uuid', nanoid());

		await imagePostData.mutateAsync({
			url,
			newData: formData,
			onClose,
		});
	}

	return (
		<AddModal
			isSmall
			open={open}
			setOpen={onClose}
			title={isUpdate ? 'Update User' : 'Add User'}
			form={form}
			onSubmit={onSubmit}
		>
			<div className='grid grid-cols-2 gap-4'>
				<FormField
					control={form.control}
					name='department_uuid'
					render={(props) => (
						<CoreForm.ReactSelect
							label='Department'
							placeholder='Select Department'
							options={departmentData!}
							{...props}
						/>
					)}
				/>

				<FormField
					control={form.control}
					name='designation_uuid'
					render={(props) => (
						<CoreForm.ReactSelect
							label='Designation'
							placeholder='Select Designation'
							options={designationData!}
							{...props}
						/>
					)}
				/>
			</div>
			<div className='grid grid-cols-2 gap-4'>
				<FormField control={form.control} name='name' render={(props) => <CoreForm.Input {...props} />} />
				<FormField control={form.control} name='email' render={(props) => <CoreForm.Input {...props} />} />
			</div>

			<div className='grid grid-cols-2 gap-4'>
				<FormField control={form.control} name='phone' render={(props) => <CoreForm.Phone {...props} />} />
				<FormField control={form.control} name='office' render={(props) => <CoreForm.Input {...props} />} />
			</div>
			<div className='grid grid-cols-2 gap-4'>
				<FormField
					control={form.control}
					name='image'
					render={(props) => <CoreForm.FileUpload fileType='image' isUpdate={isUpdate} {...props} />}
				/>
				<FormField control={form.control} name='remarks' render={(props) => <CoreForm.Textarea {...props} />} />
			</div>
		</AddModal>
	);
};

export default AddOrUpdate;

import { useEffect } from 'react';
import useRHF from '@/hooks/useRHF';

import { FormField } from '@/components/ui/form';
import CoreForm from '@core/form';
import { AddModal } from '@core/modal';

import { getDateTime } from '@/utils';
import Formdata from '@/utils/formdata';

import { useHrUsersByUUID } from './_config/query';
import { IUser, USER_NULL, USER_SCHEMA } from './_config/schema';
import { IUserAddOrUpdateProps } from './_config/types';

const AddOrUpdate: React.FC<IUserAddOrUpdateProps> = ({
	url,
	open,
	setOpen,
	updatedData,
	setUpdatedData,
	imageUpdateData,
}) => {
	const isUpdate = !!updatedData;

	const { data } = useHrUsersByUUID(updatedData?.uuid as string);

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
		formData.append('updated_at', getDateTime());
		if (isUpdate) {
			// UPDATE ITEM
			await imageUpdateData.mutateAsync({
				url: `${url}`,
				updatedData: {
					...values,
					updated_at: getDateTime(),
				},
				onClose,
			});
		}
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
				<FormField control={form.control} name='name' render={(props) => <CoreForm.Input {...props} />} />
				<FormField control={form.control} name='phone' render={(props) => <CoreForm.Phone {...props} />} />
			</div>

			<FormField control={form.control} name='remarks' render={(props) => <CoreForm.Textarea {...props} />} />
		</AddModal>
	);
};

export default AddOrUpdate;

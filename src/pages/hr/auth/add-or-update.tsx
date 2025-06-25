import { useEffect } from 'react';
import useAuth from '@/hooks/useAuth';
import useRHF from '@/hooks/useRHF';

import { IFormSelectOption } from '@/components/core/form/types';
import { FormField } from '@/components/ui/form';
import CoreForm from '@core/form';
import { AddModal } from '@core/modal';

import { useOtherUser } from '@/lib/common-queries/other';
import nanoid from '@/lib/nanoid';
import { getDateTime } from '@/utils';

import { useHrAuthByUUID } from '../_config/query';
import { AUTH_NULL, AUTH_SCHEMA, IAuth } from '../_config/schema';
import { IAuthAddOrUpdateProps } from '../_config/types';

const AddOrUpdate: React.FC<IAuthAddOrUpdateProps> = ({
	url,
	open,
	setOpen,
	updatedData,
	setUpdatedData,
	postData,
	updateData,
}) => {
	const isUpdate = !!updatedData;

	const { user } = useAuth();
	const { data } = useHrAuthByUUID(updatedData?.uuid as string);
	const { data: userOptions } = useOtherUser<IFormSelectOption[]>();

	const form = useRHF(AUTH_SCHEMA(isUpdate) as any, AUTH_NULL);

	const onClose = () => {
		setUpdatedData?.(null);
		form.reset(AUTH_NULL);
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
	async function onSubmit(values: IAuth) {
		if (isUpdate) {
			// UPDATE ITEM
			await updateData.mutateAsync({
				url: `${url}/${updatedData?.uuid}`,
				updatedData: { user_uuid: values.user_uuid, remarks: values.remarks, updated_at: getDateTime() },
				onClose,
			});

			return;
		}

		// ADD NEW ITEM

		await postData.mutateAsync({
			url,
			newData: { ...values, uuid: nanoid(), created_at: getDateTime(), created_by: user?.uuid },
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
					name='user_uuid'
					render={(props) => (
						<CoreForm.ReactSelect
							label='User'
							placeholder='Select User'
							options={userOptions!}
							{...props}
						/>
					)}
				/>
			</div>
			{!isUpdate && (
				<div className='grid grid-cols-2 gap-4'>
					<FormField
						control={form.control}
						name='pass'
						render={(props) => <CoreForm.Input label='Password' type={'password'} {...props} />}
					/>
					<FormField
						control={form.control}
						name='repeatPass'
						render={(props) => <CoreForm.Input label='Repeat Password' type={'password'} {...props} />}
					/>
				</div>
			)}

			<FormField control={form.control} name='remarks' render={(props) => <CoreForm.Textarea {...props} />} />
		</AddModal>
	);
};

export default AddOrUpdate;

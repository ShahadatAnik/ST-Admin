import { useEffect } from 'react';
import useAuth from '@/hooks/useAuth';
import useRHF from '@/hooks/useRHF';

import { FormField } from '@/components/ui/form';
import CoreForm from '@core/form';
import { AddModal } from '@core/modal';

import nanoid from '@/lib/nanoid';
import { getDateTime } from '@/utils';

import { useClientByUUID } from './_config/query';
import { CLIENT_NULL, CLIENT_SCHEMA, IClient } from './_config/schema';
import { IClientAddOrUpdateProps } from './_config/types';

const AddOrUpdate: React.FC<IClientAddOrUpdateProps> = ({
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
	const { data } = useClientByUUID(updatedData?.uuid as string);

	const form = useRHF(CLIENT_SCHEMA, CLIENT_NULL);

	const onClose = () => {
		setUpdatedData?.(null);
		form.reset(CLIENT_NULL);
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
	async function onSubmit(values: IClient) {
		if (isUpdate) {
			// UPDATE ITEM
			updateData.mutateAsync({
				url: `${url}/${updatedData?.uuid}`,
				updatedData: {
					...values,
					updated_at: getDateTime(),
				},
				onClose,
			});
		} else {
			// ADD NEW ITEM
			postData.mutateAsync({
				url,
				newData: {
					...values,
					created_at: getDateTime(),
					created_by: user?.uuid,
					uuid: nanoid(),
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
			title={isUpdate ? 'Update Client' : 'Add Client'}
			form={form}
			onSubmit={onSubmit}
		>
			<div className='grid grid-cols-2 gap-4'>
				<FormField control={form.control} name='name' render={(props) => <CoreForm.Input {...props} />} />
				<FormField
					control={form.control}
					name='contact_name'
					render={(props) => <CoreForm.Input {...props} />}
				/>
				<FormField
					control={form.control}
					name='contact_number'
					render={(props) => <CoreForm.Phone {...props} />}
				/>
				<FormField control={form.control} name='email' render={(props) => <CoreForm.Input {...props} />} />
				<FormField control={form.control} name='address' render={(props) => <CoreForm.Input {...props} />} />
			</div>

			<FormField control={form.control} name='remarks' render={(props) => <CoreForm.Textarea {...props} />} />
		</AddModal>
	);
};

export default AddOrUpdate;

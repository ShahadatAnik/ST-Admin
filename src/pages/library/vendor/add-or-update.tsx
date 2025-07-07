import { useEffect } from 'react';
import useAuth from '@/hooks/useAuth';
import useRHF from '@/hooks/useRHF';

import { FormField } from '@/components/ui/form';
import CoreForm from '@core/form';
import { AddModal } from '@core/modal';

import nanoid from '@/lib/nanoid';
import { getDateTime } from '@/utils';

import { useVendorByUUID } from './_config/query';
import { IVendor, VENDOR_NULL, VENDOR_SCHEMA } from './_config/schema';
import { IVendorAddOrUpdateProps } from './_config/types';

const AddOrUpdate: React.FC<IVendorAddOrUpdateProps> = ({
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
	const { data } = useVendorByUUID(updatedData?.uuid as string);

	const form = useRHF(VENDOR_SCHEMA, VENDOR_NULL);

	const onClose = () => {
		setUpdatedData?.(null);
		form.reset(VENDOR_NULL);
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
	async function onSubmit(values: IVendor) {
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
			title={isUpdate ? 'Update Vendor' : 'Add Vendor'}
			form={form}
			onSubmit={onSubmit}
		>
			<div className='grid grid-cols-2 gap-4'>
				<FormField control={form.control} name='name' render={(props) => <CoreForm.Input {...props} />} />
				<FormField control={form.control} name='phone' render={(props) => <CoreForm.Phone {...props} />} />
				<FormField control={form.control} name='address' render={(props) => <CoreForm.Input {...props} />} />
				<FormField
					control={form.control}
					name='starting_date'
					render={(props) => <CoreForm.DatePicker {...props} />}
				/>
				<FormField
					control={form.control}
					name='ending_date'
					render={(props) => <CoreForm.DatePicker {...props} />}
				/>
				<FormField
					control={form.control}
					name='product_type'
					render={(props) => <CoreForm.Input {...props} />}
				/>
			</div>
			<FormField control={form.control} name='purpose' render={(props) => <CoreForm.Textarea {...props} />} />
			<FormField control={form.control} name='remarks' render={(props) => <CoreForm.Textarea {...props} />} />
		</AddModal>
	);
};

export default AddOrUpdate;

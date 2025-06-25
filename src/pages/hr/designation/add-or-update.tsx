import { useEffect } from 'react';
import useAuth from '@/hooks/useAuth';
import useRHF from '@/hooks/useRHF';

import { FormField } from '@/components/ui/form';
import CoreForm from '@core/form';
import { AddModal } from '@core/modal';

import { useOtherDesignation } from '@/lib/common-queries/other';
import nanoid from '@/lib/nanoid';
import { getDateTime } from '@/utils';

import { useHrDesignationByUUID, useHrUsers } from '../_config/query';
import { DESIGNATION_NULL, DESIGNATION_SCHEMA, IDesignation } from '../_config/schema';
import { IDesignationAddOrUpdateProps } from '../_config/types';

const AddOrUpdate: React.FC<IDesignationAddOrUpdateProps> = ({
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
	const { data } = useHrDesignationByUUID(updatedData?.uuid as string);
	const { invalidateQuery: invalidateUserQuery } = useHrUsers();
	const { invalidateQuery: invalidateUserQueryDesignation } = useOtherDesignation();

	const form = useRHF(DESIGNATION_SCHEMA, DESIGNATION_NULL);

	const onClose = () => {
		setUpdatedData?.(null);
		form.reset(DESIGNATION_NULL);
		invalidateUserQuery();
		invalidateUserQueryDesignation();
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
	async function onSubmit(values: IDesignation) {
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
			open={open}
			setOpen={onClose}
			title={isUpdate ? 'Update Designation' : 'Add Designation'}
			form={form}
			onSubmit={onSubmit}
		>
			<FormField control={form.control} name='name' render={(props) => <CoreForm.Input {...props} />} />
			<FormField control={form.control} name='remarks' render={(props) => <CoreForm.Textarea {...props} />} />
		</AddModal>
	);
};

export default AddOrUpdate;

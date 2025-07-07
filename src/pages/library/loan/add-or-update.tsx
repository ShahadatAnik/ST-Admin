import { useEffect } from 'react';
import useAuth from '@/hooks/useAuth';
import useRHF from '@/hooks/useRHF';

import { FormField } from '@/components/ui/form';
import CoreForm from '@core/form';
import { AddModal } from '@core/modal';

import { useOtherDepartment } from '@/lib/common-queries/other';
import nanoid from '@/lib/nanoid';
import { getDateTime } from '@/utils';

import { ILoanTableData } from './config/columns/columns.type';
import { useLibLoanByUUID, useLibLoans } from './config/query';
import { ILoan, LOAN_NULL, LOAN_SCHEMA } from './config/schema';
import { ILoanAddOrUpdateProps } from './config/types';
import { types } from './utils';

const AddOrUpdate: React.FC<ILoanAddOrUpdateProps> = ({
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
	const { invalidateQuery: invalidateDesignations } = useLibLoans();
	const { data } = useLibLoanByUUID<ILoanTableData>(updatedData?.uuid as string);
	const { invalidateQuery: invalidateUserQuery } = useOtherDepartment();

	const form = useRHF(LOAN_SCHEMA, LOAN_NULL);

	const onClose = () => {
		setUpdatedData?.(null);
		form.reset(LOAN_NULL);
		invalidateDesignations();
		invalidateUserQuery();
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
	async function onSubmit(values: ILoan) {
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
			return;
		}

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

	return (
		<AddModal
			open={open}
			setOpen={onClose}
			title={isUpdate ? 'Update Loan' : 'Add Loan'}
			form={form}
			onSubmit={onSubmit}
		>
			<FormField control={form.control} name='lender_name' render={(props) => <CoreForm.Input {...props} />} />
			<FormField
				control={form.control}
				name='type'
				render={(props) => <CoreForm.ReactSelect options={types} placeholder='Select Types' {...props} />}
			/>
			<FormField
				control={form.control}
				name='amount'
				render={(props) => <CoreForm.Input type='number' {...props} />}
			/>
			<FormField control={form.control} name='taken_at' render={(props) => <CoreForm.DatePicker {...props} />} />
			<FormField control={form.control} name='remarks' render={(props) => <CoreForm.Textarea {...props} />} />
		</AddModal>
	);
};

export default AddOrUpdate;

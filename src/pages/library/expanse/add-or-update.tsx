import { useEffect } from 'react';
import { useLibReportProfitSummary } from '@/pages/report/profit-summery/config/query';
import useAuth from '@/hooks/useAuth';
import useRHF from '@/hooks/useRHF';

import { IFormSelectOption } from '@/components/core/form/types';
import { FormField } from '@/components/ui/form';
import CoreForm from '@core/form';
import { AddModal } from '@core/modal';

import { useOtherJob } from '@/lib/common-queries/other';
import nanoid from '@/lib/nanoid';
import { getDateTime } from '@/utils';

import { IExpanseTableData } from './config/columns/columns.type';
import { useLibExpanse, useLibExpanseByUUID } from './config/query';
import { EXPANSE_NULL, EXPANSE_SCHEMA, IExpanse } from './config/schema';
import { IExpanseAddOrUpdateProps } from './config/types';

const AddOrUpdate: React.FC<IExpanseAddOrUpdateProps> = ({
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
	const { invalidateQuery: invalidateDesignations } = useLibExpanse();
	const { invalidateQuery: invalidateExpense } = useLibReportProfitSummary();
	const { data } = useLibExpanseByUUID<IExpanseTableData>(updatedData?.uuid as string);
	const { data: jobOptions } = useOtherJob<IFormSelectOption[]>();

	const form = useRHF(EXPANSE_SCHEMA, EXPANSE_NULL);

	const onClose = () => {
		setUpdatedData?.(null);
		form.reset(EXPANSE_NULL);
		invalidateDesignations();
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
	async function onSubmit(values: IExpanse) {
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

		invalidateExpense();
	}

	return (
		<AddModal
			open={open}
			setOpen={onClose}
			title={isUpdate ? 'Update Expanse' : 'Add Expanse'}
			form={form}
			onSubmit={onSubmit}
		>
			<FormField
				control={form.control}
				name='job_uuid'
				render={(props) => (
					<CoreForm.ReactSelect label='Job' placeholder='Select Job' options={jobOptions!} {...props} />
				)}
			/>
			<FormField
				control={form.control}
				name='expense_at'
				render={(props) => <CoreForm.DatePicker {...props} />}
			/>
			<FormField control={form.control} name='type' render={(props) => <CoreForm.Input {...props} />} />
			<FormField
				control={form.control}
				name='amount'
				render={(props) => <CoreForm.Input type='number' {...props} />}
			/>
			<FormField control={form.control} name='reason' render={(props) => <CoreForm.Textarea {...props} />} />
			<FormField control={form.control} name='remarks' render={(props) => <CoreForm.Textarea {...props} />} />
		</AddModal>
	);
};

export default AddOrUpdate;

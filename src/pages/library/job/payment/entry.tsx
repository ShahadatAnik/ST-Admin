import { Suspense, useEffect, useState } from 'react';
import { useLibReportProfitSummary } from '@/pages/report/profit-summery/config/query';
import { useFieldArray } from 'react-hook-form';
import { useNavigate, useParams } from 'react-router-dom';
import useAuth from '@/hooks/useAuth';
import useRHF from '@/hooks/useRHF';

import CoreForm from '@core/form';
import { AddModal, DeleteModal, DetailsModal } from '@core/modal';

import nanoid from '@/lib/nanoid';
import { getDateTime } from '@/utils';

import { IJobTableData } from '../_config/columns/columns.type';
import { useJob, useJobPayment } from '../_config/query';
import { IJobPayment, JOB_PAYMENT_NULL, JOB_PAYMENT_SCHEMA } from '../_config/schema';
import useGenerateFieldDefs from './useGenerateFieldDefs';

type EntryProps = {
	url: string;
	open: boolean;
	setOpen: React.Dispatch<React.SetStateAction<boolean>>;
	updatedData?: IJobTableData | null;
	setUpdatedData?: React.Dispatch<React.SetStateAction<IJobTableData | null>>;
};

const Entry: React.FC<EntryProps> = ({ url, open, setOpen, updatedData, setUpdatedData }) => {
	const isUpdate = !!updatedData?.uuid;
	const navigate = useNavigate();

	const { user } = useAuth();
	const {
		data,
		updateData,
		postData,
		deleteData,
		invalidateQuery: invalidateQueryItem,
	} = useJobPayment(updatedData?.uuid as string);
	const { invalidateQuery } = useJob<IJobTableData[]>();
	const { invalidateQuery: invalidateExpense } = useLibReportProfitSummary();

	const onClose = () => {
		setUpdatedData?.(null);
		setOpen(false);
		form.reset(JOB_PAYMENT_NULL); // Reset form when closing
	};

	const form = useRHF(JOB_PAYMENT_SCHEMA, JOB_PAYMENT_NULL);

	const { fields, append, remove } = useFieldArray({
		control: form.control,
		name: 'payment',
	});

	// Reset form values when data is updated
	useEffect(() => {
		if (data && isUpdate) {
			form.reset(data);
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [data, isUpdate]);

	// Submit handler
	async function onSubmit(values: IJobPayment) {
		const { payment } = values;
		const entryUpdatePromise = payment.map((entry) => {
			if (entry.uuid) {
				const entryUpdateData = {
					...entry,
					updated_at: getDateTime(),
				};
				return updateData.mutateAsync({
					url: `/lib/payment/${entry.uuid}`,
					updatedData: entryUpdateData,
				});
			} else {
				const entryData = {
					...entry,
					created_at: getDateTime(),
					created_by: user?.uuid,
					uuid: nanoid(),
					job_uuid: updatedData?.uuid,
				};

				return postData.mutateAsync({
					url: `/lib/payment`,
					newData: entryData,
				});
			}
		});

		try {
			await Promise.all(entryUpdatePromise);
			invalidateQuery();
			invalidateQueryItem();
			invalidateExpense();
			onClose(); // Close modal after successful submission
			navigate('/lib/job');
		} catch (error) {
			console.error('Error updating payments:', error);
		}
	}

	const handleAdd = () => {
		append({
			uuid: '',
			job_uuid: '',
			index: fields.length + 1,
			paid_at: '',
			method: '',
			amount: 0,
		});
	};

	const [deleteItem, setDeleteItem] = useState<{
		id: string;
		name: string;
	} | null>(null);

	const handleRemove = (index: number) => {
		if (fields[index].uuid) {
			setDeleteItem({
				id: fields[index].uuid,
				name: fields[index].uuid,
			});
		} else {
			remove(index);
		}
	};

	// Copy Handler
	const handleCopy = (index: number) => {
		const field = form.watch('payment')[index];
		append({
			...field,
			uuid: '',
			job_uuid: '',
			paid_at: field.paid_at,
			method: field.method,
			amount: field.amount,
			index: fields.length + 1,
		});
	};

	const Total = form.watch('payment').reduce((acc, item) => {
		return acc + +item.amount;
	}, 0);

	return (
		<div>
			<AddModal open={open} setOpen={onClose} form={form} isSmall={true} onSubmit={onSubmit}>
				<CoreForm.DynamicFields
					title={isUpdate ? 'Update Payment' : 'Add Payment'}
					form={form}
					fieldName='payment'
					fieldDefs={useGenerateFieldDefs({
						data: form.getValues(),
						copy: handleCopy,
						remove: handleRemove,
						form: form,
						isUpdate,
					})}
					handleAdd={handleAdd}
					fields={fields}
				>
					<tr>
						<td colSpan={3} className='border-t px-5 text-right font-semibold'>
							Total:
						</td>
						<td colSpan={2} className='border-t px-3 py-2'>
							{Total}
						</td>
					</tr>
				</CoreForm.DynamicFields>
			</AddModal>

			<Suspense fallback={null}>
				<DeleteModal
					{...{
						deleteItem,
						setDeleteItem,
						url: `/lib/payment`,
						deleteData,
						onClose: () => {
							form.setValue(
								'payment',
								form.getValues('payment').filter((item) => item.uuid !== deleteItem?.id)
							);
						},
					}}
				/>
			</Suspense>
		</div>
	);
};

export default Entry;

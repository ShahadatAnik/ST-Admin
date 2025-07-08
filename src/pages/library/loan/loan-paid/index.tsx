import { lazy, Suspense, useEffect, useState } from 'react';
import { useFieldArray } from 'react-hook-form';
import { useNavigate, useParams } from 'react-router-dom';
import useAuth from '@/hooks/useAuth';
import useRHF from '@/hooks/useRHF';

import { ShowLocalToast } from '@/components/others/toast';
import CoreForm from '@core/form';

import nanoid from '@/lib/nanoid';
import { getDateTime } from '@/utils';

import { useLibLoanPaidByLoanUUID, useLibLoans } from '../config/query';
import { ILoanPaid, LOAN_PAID_NULL, LOAN_PAID_SCHEMA } from '../config/schema';
import useGenerateFieldDefs from './useGenerateFieldDefs';

const DeleteModal = lazy(() => import('@core/modal/delete'));

const AddOrUpdate = () => {
	const { user } = useAuth();
	const navigate = useNavigate();
	const { uuid } = useParams();
	const isUpdate: boolean = !!uuid;

	const { updateData, postData, deleteData } = useLibLoans();

	const { data, invalidateQuery: invalidateTestDetails } = useLibLoanPaidByLoanUUID<ILoanPaid>(uuid as string);

	const form = useRHF(LOAN_PAID_SCHEMA, LOAN_PAID_NULL);

	const { fields, append, remove } = useFieldArray({
		control: form.control,
		name: 'loan_paid',
	});

	useEffect(() => {
		if (isUpdate && data) {
			form.reset(data);
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [data, isUpdate]);

	async function onSubmit(values: ILoanPaid) {
		/* -------------------------------------------------------------------------- */
		/*                                 UPDATE TEST                                */
		/* -------------------------------------------------------------------------- */
		if (values.loan_paid.length === 0) {
			ShowLocalToast({
				toastType: 'error',
				message: 'Please add at least one entry',
			});
			return;
		}
		if (isUpdate) {
			const loan_paid_promise = values.loan_paid.map((item, index) => {
				if (item.uuid === undefined) {
					const newData = {
						...item,
						index: index + 1,
						loan_uuid: uuid,
						created_at: getDateTime(),
						created_by: user?.uuid,
						uuid: nanoid(),
					};

					return postData.mutateAsync({
						url: '/lib/loan-paid',
						newData: newData,
						isOnCloseNeeded: false,
					});
				} else {
					const updatedData = {
						...item,
						index: index + 1,
						loan_uuid: uuid,
						updated_at: getDateTime(),
					};
					return updateData.mutateAsync({
						url: `/lib/loan-paid/${item.uuid}`,
						updatedData,
						isOnCloseNeeded: false,
					});
				}
			});

			try {
				await Promise.all([...loan_paid_promise])
					.then(() => form.reset(LOAN_PAID_NULL))
					.then(() => {
						invalidateTestDetails(); // TODO: Update invalidate query
						navigate(`/lib/loan/${uuid}/details`);
					});
			} catch (err) {
				console.error(`Error with Promise.all: ${err}`);
			}

			return;
		}

		// const new_loan_uuid = nanoid();
		// const created_at = getDateTime();
		// const created_by = user?.uuid;

		// // Create Loan Paid description

		// const Loan Paid_data = {
		// 	...values,
		// 	uuid: new_loan_uuid,
		// 	created_at,
		// 	created_by,
		// };

		// // delete Loan Paid field from data to be sent

		// if ('loan_paid' in Loan Paid_data) {
		// 	delete (Loan Paid_data as { loan_paid?: any })['loan_paid'];
		// }

		// // TODO: Update url and variable name ⬇️
		// const Loan Paid_promise = await postData.mutateAsync({
		// 	url: Loan PaidUrl,
		// 	newData: Loan Paid_data,
		// 	isOnCloseNeeded: false,
		// });

		// // Create Loan Paid entries
		// const loan_paid_entries = [...values.loan_paid].map((item) => ({
		// 	...item,
		// 	loan_uuid: new_loan_uuid,
		// 	uuid: nanoid(),
		// 	created_at,
		// 	created_by,
		// }));

		// const loan_paid_entries_promise = loan_paid_entries.map((item) =>
		// 	postData.mutateAsync({
		// 		url: '/store/Loan Paid-entry',
		// 		newData: item,
		// 		isOnCloseNeeded: false,
		// 	})
		// );

		// try {
		// 	await Promise.all([Loan Paid_promise, ...loan_paid_entries_promise])
		// 		.then(() => form.reset(LOAN_PAID_NULL))
		// 		.then(() => {
		// 			invalidateTestDetails(); // TODO: Update invalidate query
		// 			navigate(`/store/Loan Paid/${new_loan_uuid}/details`);
		// 		});
		// } catch (err) {
		// 	console.error(`Error with Promise.all: ${err}`);
		// }
	}

	const handleAdd = () => {
		append({ uuid: undefined, type: 'cash', amount: 0, remarks: null });
	};

	const [deleteItem, setDeleteItem] = useState<{
		id: string;
		name: string;
	} | null>(null);

	// Delete Handler
	const handleRemove = (index: number) => {
		if (fields[index].uuid) {
			setDeleteItem({
				id: fields[index].uuid,
				name: String(fields[index].amount),
			});
		} else {
			remove(index);
		}
	};

	// Copy Handler
	const handleCopy = (index: number) => {
		// TODO: Update fields ⬇️
		const field = form.watch('loan_paid')[index];
		append({
			...field,
		});
	};

	const loanPaidValues = form.watch('loan_paid') || [];

	const total = loanPaidValues.reduce((sum: number, item: any) => sum + (Number(item?.amount) || 0), 0);
	return (
		<CoreForm.AddEditWrapper
			title={isUpdate ? 'Edit Loan Paid Entry' : ' Add Loan Paid Entry'}
			form={form}
			onSubmit={onSubmit}
		>
			<CoreForm.DynamicFields
				title={`Loan Paid: ${data?.lender_name}`}
				form={form}
				fieldName='loan_paid'
				fieldDefs={useGenerateFieldDefs({
					copy: handleCopy,
					remove: handleRemove,
					watch: form.watch,
					form,
				})}
				handleAdd={handleAdd}
				fields={fields}
			>
				<tr>
					<td className='border-t text-right font-semibold' colSpan={2}>
						Total paid:
						<br />
						Loan Amount:
						<br />
						Remaining:
					</td>
					<td className='border-t px-3 py-2' colSpan={3}>
						{total}
						<br />
						{data?.amount ?? 0}
						<br />
						{(data?.amount ?? 0) - total}
					</td>
				</tr>
				<tr></tr>
			</CoreForm.DynamicFields>

			<Suspense fallback={null}>
				<DeleteModal
					{...{
						deleteItem,
						setDeleteItem,
						url: `/lib/loan-paid`,
						deleteData,
						onClose: () => {
							form.setValue(
								'loan_paid',
								form.getValues('loan_paid').filter((item) => item.uuid !== deleteItem?.id)
							);
						},
					}}
				/>
			</Suspense>
		</CoreForm.AddEditWrapper>
	);
};

export default AddOrUpdate;

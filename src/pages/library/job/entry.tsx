import { lazy, Suspense, useEffect, useState } from 'react';
import { useFieldArray } from 'react-hook-form';
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from 'sonner';
import useAuth from '@/hooks/useAuth';
import useRHF from '@/hooks/useRHF';

import { IFormSelectOption } from '@/components/core/form/types';
import { FormField } from '@/components/ui/form';
import CoreForm from '@core/form';
import { DeleteModal } from '@core/modal';

import { useOtherClient } from '@/lib/common-queries/other';
import nanoid from '@/lib/nanoid';
import { getDateTime } from '@/utils';

import { IJobTableData } from './_config/columns/columns.type';
import { useJob, useJobByUUID } from './_config/query';
import { IJob, JOB_NULL, JOB_SCHEMA } from './_config/schema';
import useGenerateFieldDefs from './useGenerateFieldDefs';

const AddOrUpdate = lazy(() => import('./serial-add-update'));

const Entry = () => {
	const { uuid } = useParams();
	const isUpdate = !!uuid;
	const navigate = useNavigate();

	const { user } = useAuth();
	const {
		data,
		updateData,
		postData,
		deleteData,
		invalidateQuery: invalidateQueryItem,
	} = useJobByUUID(uuid as string);
	const { invalidateQuery } = useJob<IJobTableData[]>();
	const { data: clients } = useOtherClient<IFormSelectOption[]>();

	const form = useRHF(JOB_SCHEMA, JOB_NULL);

	const { fields, append, remove } = useFieldArray({
		control: form.control,
		name: 'job_entry',
	});

	// Reset form values when data is updated
	useEffect(() => {
		if (data && isUpdate) {
			form.reset(data);
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [data, isUpdate]);

	// Submit handler
	async function onSubmit(values: IJob) {
		const { job_entry, ...rest } = values;

		const indexes = job_entry
			.map((entry, i) =>
				entry.is_serial_needed && entry.product_serial.length !== entry.quantity ? i + 1 : null
			)
			.filter((i): i is number => i !== null);

		if (indexes.length > 0) {
			toast.warning(`Please ensure that all serials are filled for the following entries: ${indexes.join(', ')}`);
			return;
		}

		if (isUpdate) {
			// UPDATE ITEM
			const itemUpdatedData = {
				...rest,
				updated_at: getDateTime(),
			};

			updateData
				.mutateAsync({
					url: `/lib/job/${uuid}`,
					updatedData: itemUpdatedData,
				})
				.then(() => {
					const entryUpdatePromise = job_entry.map((entry) => {
						if (entry.uuid) {
							const { product_serial, ...rest } = entry;
							const entryUpdateData = {
								...rest,
								updated_at: getDateTime(),
							};
							const singleUpdatePromise = updateData
								.mutateAsync({
									url: `/lib/job-entry/${rest.uuid}`,
									updatedData: entryUpdateData,
								})
								.then(() => {
									const serialPromises = product_serial.map((serial) => {
										if (serial.uuid) {
											return updateData.mutateAsync({
												url: `/lib/product-serial/${serial.uuid}`,
												updatedData: {
													...serial,
													updated_at: getDateTime(),
												},
											});
										} else {
											return postData.mutateAsync({
												url: `/lib/product-serial`,
												newData: {
													...serial,
													job_entry_uuid: entry.uuid,
													created_at: getDateTime(),
													created_by: user?.uuid,
													uuid: nanoid(),
												},
											});
										}
									});
									return Promise.all(serialPromises);
								});
							return singleUpdatePromise;
						} else {
							const { product_serial, ...rest } = entry;

							const entry_uuid = nanoid(); // Generate UUID upfront so you can use it in both entry and serials

							const entryData = {
								...rest,
								created_at: getDateTime(),
								created_by: user?.uuid,
								job_uuid: uuid,
								uuid: entry_uuid,
							};

							const singleEntryPromise = postData
								.mutateAsync({
									url: `/lib/job-entry`,
									newData: entryData,
								})
								.then(() => {
									const arrayData = product_serial.map((serial) => ({
										...serial,
										job_entry_uuid: entry_uuid,
										created_at: getDateTime(),
										created_by: user?.uuid,
										uuid: nanoid(),
									}));

									const serialPromises = postData.mutateAsync({
										url: `/lib/product-serial`,
										newData: arrayData,
									});

									return serialPromises;
								});

							return singleEntryPromise;
						}
					});

					Promise.all(entryUpdatePromise);
				})
				.then(() => {
					invalidateQuery();
					invalidateQueryItem();
					navigate('/lib/job');
				})
				.catch((error) => {
					console.error('Error updating news:', error);
				});
		} else {
			// ADD NEW ITEM
			const itemData = {
				...rest,
				created_at: getDateTime(),
				created_by: user?.uuid,
				uuid: nanoid(),
			};

			postData
				.mutateAsync({
					url: '/lib/job',
					newData: itemData,
				})
				.then(() => {
					const entryPromises = job_entry.map((entry) => {
						const { product_serial, ...rest } = entry;

						const entry_uuid = nanoid(); // Generate UUID upfront so you can use it in both entry and serials

						const entryData = {
							...rest,
							created_at: getDateTime(),
							created_by: user?.uuid,
							job_uuid: itemData.uuid,
							uuid: entry_uuid,
						};

						const singleEntryPromise = postData
							.mutateAsync({
								url: `/lib/job-entry`,
								newData: entryData,
							})
							.then(() => {
								const arrayData = product_serial.map((serial) => ({
									...serial,
									job_entry_uuid: entry_uuid,
									created_at: getDateTime(),
									created_by: user?.uuid,
									uuid: nanoid(),
								}));

								const serialPromises = postData.mutateAsync({
									url: `/lib/product-serial`,
									newData: arrayData,
								});

								return serialPromises;
							});

						return singleEntryPromise;
					});

					Promise.all([...entryPromises]);
				})
				.then(() => {
					invalidateQuery();
					navigate('/lib/job');
				})
				.catch((error) => {
					console.error('Error adding news:', error);
				});
		}
	}

	const handleAdd = () => {
		append({
			product_uuid: '',
			vendor_uuid: '',
			quantity: 0,
			buying_unit_price: 0,
			selling_unit_price: 0,
			warranty_days: 0,
			purchased_at: '',
			is_serial_needed: false,
			is_update: false,
			product_serial: [],
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
	const handleCopy: (index: number) => void = (index) => {
		const field = form.watch('job_entry')[index];
		append({
			product_uuid: '',
			vendor_uuid: '',
			quantity: field.quantity,
			buying_unit_price: field.buying_unit_price,
			selling_unit_price: field.selling_unit_price,
			warranty_days: field.warranty_days,
			purchased_at: field.purchased_at,
			is_serial_needed: field.is_serial_needed,
			is_update: field.is_update,
			product_serial: field.product_serial,
		});
	};

	const [isOpenAddModal, setIsOpenAddModal] = useState(false);
	const [updatedData, setUpdatedData] = useState<IJob['job_entry'][number] | null>(null);
	const handleSerial = (index: number) => {
		const field = form.watch('job_entry')[index];
		setUpdatedData({ ...field, index });
		setIsOpenAddModal(true);
	};

	return (
		<CoreForm.AddEditWrapper title={isUpdate ? 'Edit Job' : 'Add Job'} form={form} onSubmit={onSubmit}>
			<CoreForm.Section title={`Job`}>
				<FormField
					control={form.control}
					name='client_uuid'
					render={(props) => (
						<CoreForm.ReactSelect
							label='Client'
							placeholder='Select Client'
							menuPortalTarget={document.body}
							options={clients!}
							{...props}
						/>
					)}
				/>
				<FormField control={form.control} name='work_order' render={(props) => <CoreForm.Input {...props} />} />
			</CoreForm.Section>

			<CoreForm.DynamicFields
				title='Job Entries'
				form={form}
				fieldName='job_entry'
				fieldDefs={useGenerateFieldDefs({
					data: form.getValues(),
					copy: handleCopy,
					remove: handleRemove,
					form: form,
					isUpdate,
					handleSerial: handleSerial,
				})}
				handleAdd={handleAdd}
				fields={fields}
			/>
			<Suspense fallback={null}>
				<AddOrUpdate
					{...{
						url: `/lib/product-serial`,
						open: isOpenAddModal,
						setOpen: setIsOpenAddModal,
						updatedData,
						setUpdatedData,
						postData,
						updateData,
						deleteData,
						form: form,
					}}
				/>
				,
				<DeleteModal
					{...{
						deleteItem,
						setDeleteItem,
						url: `/lib/job-entry`,
						deleteData,
						onClose: () => {
							form.setValue(
								'job_entry',
								form.getValues('job_entry').filter((item) => item.uuid !== deleteItem?.id)
							);
						},
					}}
				/>
			</Suspense>
		</CoreForm.AddEditWrapper>
	);
};

export default Entry;

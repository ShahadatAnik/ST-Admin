import { lazy, Suspense, useEffect, useState } from 'react';
import { useLibReportProfitSummary } from '@/pages/report/profit-summery/config/query';
import { FileSpreadsheet } from 'lucide-react';
import { CSVLink } from 'react-csv';
import { useFieldArray } from 'react-hook-form';
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from 'sonner';
import useAuth from '@/hooks/useAuth';
import useRHF from '@/hooks/useRHF';

import ReadFile from '@/components/buttons/read-file';
import { IFormSelectOption } from '@/components/core/form/types';
import { FormField } from '@/components/ui/form';
import CoreForm from '@core/form';
import { DeleteModal } from '@core/modal';

import { useOtherClient, useOtherProduct, useOtherVendor } from '@/lib/common-queries/other';
import nanoid from '@/lib/nanoid';
import { getDateTime } from '@/utils';

import { IJobTableData } from './_config/columns/columns.type';
import { useJob, useJobByUUID } from './_config/query';
import { IJob, JOB_NULL, JOB_SCHEMA } from './_config/schema';
import useGenerateFieldDefs from './useGenerateFieldDefs';
import { transformInputToOutput } from './utils';

const AddOrUpdate = lazy(() => import('./serial-add-update'));

const Entry = () => {
	const { uuid } = useParams();
	const isUpdate = !!uuid;
	const navigate = useNavigate();
	const [isLoading, setIsLoading] = useState(false);
	const { user } = useAuth();
	const {
		data,
		updateData,
		postData,
		deleteData,
		invalidateQuery: invalidateQueryItem,
	} = useJobByUUID(uuid as string);

	const { invalidateQuery } = useJob<IJobTableData[]>();
	const { invalidateQuery: invalidateExpense } = useLibReportProfitSummary();
	const { data: clients } = useOtherClient<IFormSelectOption[]>();
	const { data: products, invalidateQuery: invalidateProducts } = useOtherProduct<IFormSelectOption[]>();
	const { data: vendors, invalidateQuery: invalidateVendors } = useOtherVendor<IFormSelectOption[]>();

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

	const handleUploadFile = async (data: any[]) => {
		try {
			setIsLoading(true);
			const createdVendors = new Map<string, string>();
			const createdProducts = new Map<string, string>();
			for (const item of data) {
				const existingProduct = products?.find((product) => product.label === item?.product);

				if (!existingProduct && item?.product) {
					if (createdProducts.has(item.product)) {
						item.product = createdProducts.get(item.product);
					} else {
						const productUuid = nanoid();
						await postData.mutateAsync({
							url: `/lib/product`,
							newData: {
								uuid: productUuid,
								name: item.product,
								created_by: user?.uuid,
								created_at: getDateTime(),
							},
						});

						createdProducts.set(item.product, productUuid);
						item.product = productUuid;
						await invalidateProducts();
					}
				} else if (existingProduct) {
					item.product = existingProduct.value;
				}

				const existingVendor = vendors?.find((vendor) => vendor.label === item?.vendor);

				if (!existingVendor && item?.vendor) {
					if (createdVendors.has(item.vendor)) {
						item.vendor = createdVendors.get(item.vendor);
					} else {
						const vendorUuid = nanoid();
						await postData.mutateAsync({
							url: `/lib/vendor`,
							newData: {
								uuid: vendorUuid,
								name: item.vendor,
								created_by: user?.uuid,
								created_at: getDateTime(),
							},
						});

						createdVendors.set(item.vendor, vendorUuid);
						item.vendor = vendorUuid;
						await invalidateVendors();
					}
				} else if (existingVendor) {
					item.vendor = existingVendor.value;
				}
			}

			const newData = await transformInputToOutput(data);
			form.setValue('job_entry', newData, { shouldDirty: true });
			setIsLoading(false);
		} catch (error) {
			console.error('Error uploading file:', error);
		}
	};

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
					const entryUpdatePromise = job_entry.map((entry, index) => {
						if (entry.uuid) {
							const { product_serial, ...rest } = entry;
							const entryUpdateData = {
								...rest,
								index: index,
								updated_at: getDateTime(),
								updated_by: user?.uuid,
							};
							const singleUpdatePromise = updateData
								.mutateAsync({
									url: `/lib/job-entry/${rest.uuid}`,
									updatedData: entryUpdateData,
								})
								.then(() => {
									if (product_serial.length === 0) return;

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

							const entry_uuid = nanoid();

							const entryData = {
								...rest,
								created_at: getDateTime(),
								created_by: user?.uuid,
								job_uuid: uuid,
								uuid: entry_uuid,
								index: index,
							};

							const singleEntryPromise = postData
								.mutateAsync({
									url: `/lib/job-entry`,
									newData: entryData,
								})
								.then(() => {
									if (product_serial.length === 0) return;

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
					invalidateExpense();
				})
				.then(() => {
					navigate(`/lib/job/${uuid}/details`);
				})
				.catch((error) => {
					console.error('Error updating news:', error);
				});
		} else {
			// ADD NEW ITEM
			const jobUUID = nanoid();
			const itemData = {
				...rest,
				created_at: getDateTime(),
				created_by: user?.uuid,
				uuid: jobUUID,
			};

			postData
				.mutateAsync({
					url: '/lib/job',
					newData: itemData,
				})
				.then(() => {
					const entryPromises = job_entry.map((entry, index) => {
						const { product_serial, ...rest } = entry;

						const entry_uuid = nanoid();

						const entryData = {
							...rest,
							created_at: getDateTime(),
							created_by: user?.uuid,
							job_uuid: itemData.uuid,
							uuid: entry_uuid,
							index: index,
						};

						const singleEntryPromise = postData
							.mutateAsync({
								url: `/lib/job-entry`,
								newData: entryData,
							})
							.then(() => {
								if (product_serial.length === 0) return;

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
					invalidateExpense();
				})
				.then(() => {
					navigate(`/lib/job/${jobUUID}/details`);
				})
				.catch((error) => {
					console.error('Error adding news:', error);
				});
		}
	}

	const handleAdd = () => {
		append({
			product_uuid: '',
			vendor_uuid: null,
			quantity: 0,
			buying_unit_price: 0,
			selling_unit_price: 0,
			warranty_days: 0,
			purchased_at: null,
			is_serial_needed: false,
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
			vendor_uuid: null,
			quantity: field.quantity,
			buying_unit_price: field.buying_unit_price,
			selling_unit_price: field.selling_unit_price,
			warranty_days: field.warranty_days,
			purchased_at: field.purchased_at,
			is_serial_needed: field.is_serial_needed,
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

	const csvData = [
		'product',
		'vendor',
		'quantity',
		'buying_unit_price',
		'selling_unit_price',
		'warranty_days',
		'purchased_at',
	];
	const fieldDefs = useGenerateFieldDefs({
		data: form.getValues(),
		copy: handleCopy,
		remove: handleRemove,
		form: form,
		isUpdate,
		handleSerial: handleSerial,
	});
	return (
		<CoreForm.AddEditWrapper title={isUpdate ? 'Edit Job' : 'Add Job'} form={form} onSubmit={onSubmit}>
			<CoreForm.Section
				title={`Job`}
				className='grid grid-cols-2 gap-2.5 rounded-md border bg-base p-4 shadow-sm'
			>
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
				<FormField
					control={form.control}
					name='to_date'
					render={(props) => <CoreForm.DatePicker {...props} />}
				/>
				<FormField control={form.control} name='work_order' render={(props) => <CoreForm.Input {...props} />} />
				<FormField control={form.control} name='subject' render={(props) => <CoreForm.Input {...props} />} />
			</CoreForm.Section>
			{isLoading && <div>Loading...</div>}
			{!isLoading && (
				<CoreForm.DynamicFields
					title='Job Entries'
					form={form}
					fieldDefs={fieldDefs}
					extraButton={
						<div className='flex items-center gap-4'>
							{csvData && Array.isArray(csvData) && csvData.length > 0 && (
								<CSVLink
									title='Demo Sheet'
									type='button'
									className='btn btn-warning btn-xs flex gap-1 rounded bg-yellow-500 p-2'
									data={[csvData]}
								>
									<FileSpreadsheet className='size-4 text-white' />
									<span className='text-xs text-slate-100'>Demo</span>
								</CSVLink>
							)}

							<ReadFile onChange={handleUploadFile} />
						</div>
					}
					fieldName='job_entry'
					handleAdd={handleAdd}
					fields={fields}
				/>
			)}
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

import { Suspense, useEffect, useState } from 'react';
import { useFieldArray } from 'react-hook-form';

import CoreForm from '@core/form';
import { AddModal, DeleteModal, DetailsModal } from '@core/modal';

import { ISerialAddOrUpdateProps } from './_config/types';
import useGenerateSerial from './useGenerateSerial';

const AddOrUpdate: React.FC<ISerialAddOrUpdateProps> = ({
	url,
	open,
	setOpen,
	updatedData,
	setUpdatedData,
	postData,
	updateData,
	deleteData,
	form,
}) => {
	const isUpdate = !!updatedData?.uuid;

	const { fields, replace, remove } = useFieldArray({
		control: form.control,
		name: `job_entry.${updatedData?.index || 0}.product_serial`,
	});

	const onClose = () => {
		setUpdatedData?.(null);
		setOpen((prev) => !prev);
	};

	// set form values if it's an update
	useEffect(() => {
		if (isUpdate) {
			const existingSerials = form.getValues(`job_entry.${updatedData.index || 0}.product_serial`);
			const newSerials = Array.from({ length: updatedData.quantity }, (_, i) => ({
				...existingSerials[i],
				index: i + 1,
			}));
			replace(newSerials);
		}
	}, [isUpdate, updatedData, replace, form]);

	useEffect(() => {
		if (updatedData && !isUpdate) {
			// If it's a new entry, we need to create an array of serials based on the quantity
			if (form.getValues(`job_entry.${updatedData.index || 0}.product_serial`).length === 0) {
				const newSerials = Array.from({ length: updatedData.quantity }, (_, i) => ({
					index: i + 1,
					serial: '',
				}));
				replace(newSerials); // replaces the product_serial array entirely
			} else {
				const existingSerials = form.getValues(`job_entry.${updatedData.index || 0}.product_serial`);
				const newSerials = Array.from({ length: updatedData.quantity }, (_, i) => ({
					...existingSerials[i],
					index: i + 1,
				}));
				replace(newSerials);
			}
		}
	}, [updatedData, isUpdate, replace, form]);

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

	return (
		<>
			<DetailsModal
				isSmall
				open={open}
				setOpen={onClose}
				title={isUpdate ? 'Update Serial' : 'Add Serial'}
				content={
					<CoreForm.DynamicFields
						title='Serial Entries'
						form={form}
						fieldName={`job_entry.${updatedData?.index}.product_serial`}
						fieldDefs={useGenerateSerial({
							form: form,
							remove: handleRemove,
							isUpdate,
						})}
						fields={fields}
					/>
				}
			/>
			<Suspense fallback={null}>
				<DeleteModal
					{...{
						deleteItem,
						setDeleteItem,
						url: `/lib/product-serial`,
						deleteData,
						onClose: () => {
							form.setValue(
								`job_entry.${updatedData?.index || 0}.product_serial`,
								form
									.getValues(`job_entry.${updatedData?.index || 0}.product_serial`)
									.filter((item) => item.uuid !== deleteItem?.id)
							);
						},
					}}
				/>
			</Suspense>
		</>
	);
};

export default AddOrUpdate;

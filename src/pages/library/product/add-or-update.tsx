import { useEffect } from 'react';
import useAuth from '@/hooks/useAuth';
import useRHF from '@/hooks/useRHF';

import { IFormSelectOption } from '@/components/core/form/types';
import { FormField } from '@/components/ui/form';
import CoreForm from '@core/form';
import { AddModal } from '@core/modal';

import { useOtherProduct, useOtherProductCategory } from '@/lib/common-queries/other';
import nanoid from '@/lib/nanoid';
import { getDateTime } from '@/utils';

import { IProductTableData } from './config/columns/columns.type';
import { useLibProductByUUID, useLibProducts } from './config/query';
import { IProduct, PRODUCT_NULL, PRODUCT_SCHEMA } from './config/schema';
import { IProductAddOrUpdateProps } from './config/types';

const AddOrUpdate: React.FC<IProductAddOrUpdateProps> = ({
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
	const { invalidateQuery: invalidateDesignations } = useLibProducts();
	const { invalidateQuery: invalidateProduct } = useOtherProduct();
	const { data } = useLibProductByUUID<IProductTableData>(updatedData?.uuid as string);
	const { data: productCategoryOptions } = useOtherProductCategory<IFormSelectOption[]>();

	const form = useRHF(PRODUCT_SCHEMA, PRODUCT_NULL);

	const onClose = () => {
		setUpdatedData?.(null);
		form.reset(PRODUCT_NULL);
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
	async function onSubmit(values: IProduct) {
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

		invalidateProduct();
	}

	return (
		<AddModal
			open={open}
			setOpen={onClose}
			title={isUpdate ? 'Update Product' : 'Add Product'}
			form={form}
			onSubmit={onSubmit}
		>
			<FormField control={form.control} name='name' render={(props) => <CoreForm.Input {...props} />} />
			<FormField
				control={form.control}
				name='product_category_uuid'
				render={(props) => (
					<CoreForm.ReactSelect
						label='Product Category'
						placeholder='Select Product Category'
						options={productCategoryOptions!}
						{...props}
					/>
				)}
			/>
			<FormField control={form.control} name='remarks' render={(props) => <CoreForm.Textarea {...props} />} />
		</AddModal>
	);
};

export default AddOrUpdate;

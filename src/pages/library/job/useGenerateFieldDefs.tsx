import { UseFormWatch } from 'react-hook-form';

import FieldActionButton from '@/components/buttons/field-action';
import Transfer from '@/components/buttons/transfer';
import { IFormSelectOption } from '@/components/core/form/types';
import { FormField } from '@/components/ui/form';
import CoreForm from '@core/form';
import { FieldDef } from '@core/form/form-dynamic-fields/types';

import { useOtherProduct, useOtherVendor } from '@/lib/common-queries/other';

import { IJob } from './_config/schema';

interface IGenerateFieldDefsProps {
	data: IJob;
	copy: (index: number) => void;
	remove: (index: number) => void;
	watch?: UseFormWatch<IJob>;
	form: any;
	isUpdate: boolean;
	handleSerial: (index: number) => void;
}

const useGenerateFieldDefs = ({ data, copy, remove, form, handleSerial }: IGenerateFieldDefsProps): FieldDef[] => {
	const { data: products } = useOtherProduct<IFormSelectOption[]>();
	const { data: vendors } = useOtherVendor<IFormSelectOption[]>();

	return [
		{
			header: 'Product',
			accessorKey: 'product_uuid',
			type: 'select-create',
			placeholder: 'Select Product',
			options: products || [],
			width: 'min-w-40',
			unique: true,
			excludeOptions: data.job_entry.map((item) => item.product_uuid) || [],
		},
		{
			header: 'Quantity',
			accessorKey: 'quantity',
			type: 'number',
		},
		{
			header: 'Buying Unit Price',
			accessorKey: 'buying_unit_price',
			type: 'number',
		},
		{
			header: 'Selling Unit Price',
			accessorKey: 'selling_unit_price',
			type: 'number',
		},
		{
			header: 'Vendor',
			accessorKey: 'vendor_uuid',
			type: 'select-create',
			placeholder: 'Select Vendor',
			options: vendors || [],
		},
		{
			header: 'Warranty Days',
			accessorKey: 'warranty_days',
			type: 'number',
		},
		{
			header: 'Purchased At',
			accessorKey: 'purchased_at',
			type: 'custom',
			component: (index: number) => {
				return (
					<FormField
						control={form.control}
						name={`job_entry.${index}.purchased_at`}
						render={(props) => <CoreForm.DatePicker {...props} disableLabel />}
					/>
				);
			},
		},
		{
			header: 'Serial Needed',
			accessorKey: 'is_serial_needed',
			type: 'custom',
			component: (index: number) => {
				return (
					<div className='flex justify-evenly gap-2'>
						<FormField
							control={form.control}
							name={`job_entry.${index}.is_serial_needed`}
							render={(props) => (
								<CoreForm.Checkbox
									{...props}
									disableLabel
									disabled={form.watch(`job_entry.${index}.product_serial`).length > 0}
								/>
							)}
						/>
						{form.watch(`job_entry.${index}.is_serial_needed`) && (
							<Transfer
								onClick={() => handleSerial(index)}
								disabled={!form.watch(`job_entry.${index}.is_serial_needed`)}
								type='button'
							/>
						)}
					</div>
				);
			},
		},
		{
			header: 'Actions',
			accessorKey: 'actions',
			type: 'custom',
			component: (index: number) => {
				return <FieldActionButton handleCopy={copy} handleRemove={remove} index={index} />;
			},
		},
	];
};

export default useGenerateFieldDefs;

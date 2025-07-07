import { UseFormWatch } from 'react-hook-form';

import FieldActionButton from '@/components/buttons/field-action';
import { FormField } from '@/components/ui/form';
import CoreForm from '@core/form';
import { FieldDef } from '@core/form/form-dynamic-fields/types';

import { IJobPayment } from '../_config/schema';

interface IGenerateFieldDefsProps {
	data: IJobPayment;
	copy: (index: number) => void;
	remove: (index: number) => void;
	watch?: UseFormWatch<IJobPayment>;
	form: any;
	isUpdate: boolean;
}

const useGenerateFieldDefs = ({ data, copy, remove, form }: IGenerateFieldDefsProps): FieldDef[] => {
	const options = [
		{ label: 'Cash', value: 'cash' },
		{ label: 'MFS', value: 'mfs' },
		{ label: 'Cheque', value: 'cheque' },
	];

	return [
		{
			header: 'Index',
			accessorKey: 'index',
			type: 'number',
		},
		{
			header: 'Paid At',
			accessorKey: 'paid_at',
			type: 'custom',
			component: (index: number) => {
				return (
					<FormField
						control={form.control}
						name={`payment.${index}.paid_at`}
						render={(props) => <CoreForm.DatePicker {...props} disableLabel />}
					/>
				);
			},
		},
		{
			header: 'Method',
			accessorKey: 'method',
			type: 'select',
			placeholder: 'Select Method',
			options: options || [],
		},
		{
			header: 'Amount',
			accessorKey: 'amount',
			type: 'number',
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

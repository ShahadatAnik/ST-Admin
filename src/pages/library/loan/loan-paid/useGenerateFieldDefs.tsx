import { UseFormWatch } from 'react-hook-form';

import FieldActionButton from '@/components/buttons/field-action';
import { FieldDef } from '@core/form/form-dynamic-fields/types';

import { ILoanPaid } from '../config/schema';
import { paidTypes } from '../utils';

interface IGenerateFieldDefsProps {
	copy: (index: any) => void;
	remove: (index: any) => void;
	watch?: UseFormWatch<ILoanPaid>;
	form: any;
}

const useGenerateFieldDefs = ({ copy, remove, watch, form }: IGenerateFieldDefsProps): FieldDef[] => {
	return [
		{
			header: 'Index',
			accessorKey: 'index',
			type: 'custom',
			component: (index: number) => {
				return <span>{index + 1}</span>;
			},
		},
		{
			header: 'Type',
			accessorKey: 'type',
			type: 'select',
			placeholder: 'Select Type',
			options: paidTypes || [],
		},
		{
			header: 'Amount',
			accessorKey: 'amount',
			type: 'number',
		},
		{
			header: 'Remarks',
			accessorKey: 'remarks',
			type: 'textarea',
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

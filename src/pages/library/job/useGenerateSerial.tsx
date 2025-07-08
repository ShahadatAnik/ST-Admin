import { UseFormWatch } from 'react-hook-form';

import FieldActionButton from '@/components/buttons/field-action';
import { FieldDef } from '@core/form/form-dynamic-fields/types';

interface IGenerateFieldDefsProps {
	form: any;
	remove: (index: number) => void;
	isUpdate: boolean;
}

const useGenerateSerial = ({ form, remove }: IGenerateFieldDefsProps): FieldDef[] => {
	return [
		{
			header: 'Index',
			accessorKey: 'index',
			type: 'number',
		},
		{
			header: 'Serial',
			accessorKey: 'serial',
			type: 'text',
		},
		{
			header: 'Actions',
			accessorKey: 'actions',
			type: 'custom',
			component: (index: number) => {
				return <FieldActionButton handleRemove={remove} index={index} />;
			},
		},
	];
};

export default useGenerateSerial;

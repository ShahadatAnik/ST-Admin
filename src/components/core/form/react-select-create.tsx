import { isArray } from 'lodash';

import { FormControl, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import ReactSelectCreatable from '@/components/ui/react-select-creatable';

import { FormReactSelectProps, IFormSelectOption } from './types';

const FormReactSelectCreate: React.FC<FormReactSelectProps> = ({
	field,
	label,
	placeholder = 'Select an option',
	optional = false,
	options,
	isDisabled = false,
	disableLabel,
	isMulti = false,
	menuPortalTarget,
	valueType = 'string',
}) => {
	return (
		<FormItem className='w-full space-y-1.5'>
			{!disableLabel && (
				<FormLabel className='flex items-center justify-between capitalize'>
					{label || field.name.split('_').join(' ')}{' '}
					{optional ? <span className='text-xs'>(Optional)</span> : ''}
				</FormLabel>
			)}
			<FormControl>
				<ReactSelectCreatable
					className='min-w-48'
					isMulti={isMulti}
					options={options}
					isDisabled={isDisabled}
					placeholder={placeholder}
					menuPortalTarget={menuPortalTarget}
					value={
						isMulti
							? isArray(field.value)
								? field.value.map((item: any) => {
										return options.filter((option: IFormSelectOption) => option.value === item);
									})
								: []
							: options.filter((option: IFormSelectOption) => option.value === field.value)
					}
					onChange={(option: any) => {
						if (option === null) {
							if (isMulti) {
								field.onChange([]);
							} else {
								field.onChange('');
							}
							return;
						}
						if (isMulti) {
							field.onChange(option.map((item: any) => item.value));
							return;
						}
						if (valueType === 'number') {
							field.onChange(Number(option.value));
						} else {
							field.onChange(option.value);
						}
					}}
					onCreateOption={(inputValue: string) => {
						const newOption = { label: inputValue, value: inputValue };
						options.push(newOption);
						if (valueType === 'number') {
							field.onChange(Number(newOption.value));
						} else {
							field.onChange(newOption.value);
						}
					}}
					isClearable
				/>
			</FormControl>
			<FormMessage />
		</FormItem>
	);
};

export default FormReactSelectCreate;

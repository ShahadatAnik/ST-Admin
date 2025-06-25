import { isArray } from 'lodash';

import { FormControl, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import ReactSelect from '@/components/ui/react-select';

import { FormReactSelectProps, IFormSelectOption } from './types';

const FormReactSelect: React.FC<FormReactSelectProps> = ({
	field,
	label,
	placeholder = 'Select an option',
	optional = false,
	options,
	unique = false,
	excludeOptions,
	isDisabled = false,
	disableLabel,
	isMulti = false,
	menuPortalTarget,
	value,
	valueType = 'string',
	onChange = () => {},
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
				<ReactSelect
					isMulti={isMulti}
					options={
						unique
							? options?.filter(
									(item: IFormSelectOption) => !excludeOptions?.includes(item.value as string)
								)
							: options
					}
					isDisabled={isDisabled}
					placeholder={placeholder}
					menuPortalTarget={menuPortalTarget}
					styles={{
						menuPortal: (base) => ({ ...base, zIndex: 999 }),
					}}
					{...field}
					value={
						value
							? value
							: isMulti
								? isArray(field.value)
									? field.value.map((item: any) => {
											return options.find((option: IFormSelectOption) => option.value === item);
										})
									: []
								: options?.filter((item: IFormSelectOption) => item.value === field.value)
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

						onChange(option, field);
					}}
				/>
			</FormControl>
			<FormMessage />
		</FormItem>
	);
};

export default FormReactSelect;

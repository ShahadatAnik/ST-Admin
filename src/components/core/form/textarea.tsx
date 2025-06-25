import { FormControl, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Textarea } from '@/components/ui/textarea';

import { cn } from '@/lib/utils';

import { FormTextareaProps } from './types';

const FormTextarea: React.FC<FormTextareaProps> = ({
	field,
	label,
	placeholder = 'Write here',
	optional = false,
	className,
	disableLabel,
	disabled = false,
}) => {
	return (
		<FormItem className='w-full space-y-1.5'>
			{!disableLabel && (
				<FormLabel className='flex items-center justify-between capitalize'>
					{label || field.name} {optional ? <span className='text-xs'>(Optional)</span> : ''}
				</FormLabel>
			)}
			<FormControl>
				<Textarea
					className={cn(className)}
					placeholder={placeholder}
					{...field}
					value={field.value === null ? '' : field.value}
					disabled={disabled}
				/>
			</FormControl>
			<FormMessage />
		</FormItem>
	);
};

export default FormTextarea;

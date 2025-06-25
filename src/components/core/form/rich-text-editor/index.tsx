import React from 'react';
import ReactQuill from 'react-quill-new';

import 'react-quill-new/dist/quill.snow.css';
import 'react-quill-new/dist/quill.bubble.css';

import { FormControl, FormItem, FormLabel, FormMessage } from '@/components/ui/form';

import { FormTextareaProps } from '../types';

const FormTextarea: React.FC<FormTextareaProps> = ({
	field,
	label,
	placeholder = 'Write here',
	optional = false,
	className,
	disableLabel,
}) => {
	return (
		<FormItem className='w-full space-y-1.5'>
			{!disableLabel && (
				<FormLabel className='flex items-center justify-between capitalize'>
					{label || field.name} {optional ? <span className='text-xs'>(Optional)</span> : ''}
				</FormLabel>
			)}
			<FormControl>
				<ReactQuill value={field.value} onChange={field.onChange} />
			</FormControl>
			<FormMessage />
		</FormItem>
	);
};

export default FormTextarea;

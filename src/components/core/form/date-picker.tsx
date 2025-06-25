import { useEffect, useState } from 'react';
import { format } from 'date-fns';
import { CalendarIcon } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import { FormControl, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';

import { cn } from '@/lib/utils';
import { formatDate } from '@/utils/formatDate';

import { FormDatePickerProps } from './types';

const FormDatePicker: React.FC<FormDatePickerProps> = ({
	field,
	label,
	placeholder,
	subLabel,
	optional = false,
	className,
	disableLabel,
	calendarProps,
	disabled = false, // New prop to disable the field
}) => {
	const [open, setOpen] = useState(false);

	const [selectedDate, setSelectedDate] = useState<Date | undefined>(
		field.value ? new Date(field.value) : new Date()
	);

	useEffect(() => {
		if (field.value) {
			setSelectedDate(new Date(field.value));
		}
	}, [field.value]);

	return (
		<FormItem className='space-y-1.5'>
			{!disableLabel && (
				<FormLabel className='flex items-center justify-between capitalize'>
					<span>
						{label || field.name.replace('_', ' ')}{' '}
						{optional ? <span className='text-xs'>(Optional)</span> : ''}
					</span>
					{subLabel && <span className='text-xs'>{subLabel}</span>}
				</FormLabel>
			)}

			<Popover open={open} onOpenChange={setOpen}>
				<PopoverTrigger asChild>
					<FormControl>
						<Button
							type='button'
							variant={'gradient'}
							className={cn(
								'h-10 w-full text-left font-normal transition-none active:scale-100',
								!field.value && 'text-muted-foreground',
								className
							)}
							disabled={disabled} // Disable the button when the field is disabled
						>
							{field.value ? (
								format(new Date(field.value), 'PPP')
							) : (
								<span>{placeholder || 'Pick a date'} </span>
							)}
							<CalendarIcon className='ml-auto h-4 w-4 opacity-50' />
						</Button>
					</FormControl>
				</PopoverTrigger>
				<PopoverContent className='w-auto p-0' align='start'>
					<Calendar
						{...calendarProps}
						captionLayout={'dropdown'}
						mode='single'
						selected={selectedDate}
						onSelect={(selected, triggerDate) => {
							if (!disabled) {
								field.onChange(formatDate(triggerDate as Date));
								setOpen(false);
							}
						}}
						onMonthChange={(date) => {
							if (!disabled) {
								setSelectedDate(date);
							}
						}}
						month={selectedDate}
						endMonth={new Date(2040, 11)}
						disabled={disabled}
					/>
				</PopoverContent>
			</Popover>
			<FormMessage />
		</FormItem>
	);
};

export default FormDatePicker;

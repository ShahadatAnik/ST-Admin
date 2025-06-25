import { buttonVariants } from '@/components/ui/button';
import { FormControl, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Switch } from '@/components/ui/switch';

import { cn } from '@/lib/utils';

import { FormSwitchProps } from './types';

const FormSwitch: React.FC<FormSwitchProps> = ({
	field,
	label,
	optional = false,
	className,
	disabled = false,
	disableLabel,
	labelClassName,
	isBoxed = false,
	checked,
	onCheckedChange,
}) => {
	return (
		<FormItem
			className={cn(
				'flex items-center gap-1.5 space-y-0',
				isBoxed &&
					buttonVariants({
						variant: 'gradient-accent',
						size: 'sm',
						className: 'gap-1.5 rounded transition-none active:scale-100',
					})
			)}
		>
			<FormControl className=''>
				{/* <Checkbox
					className={cn(
						'size-[18px]',
						isBoxed && 'rounded-full border-2 border-accent-foreground/50',
						className
					)}
					disabled={disabled}
					checked={checked ?? field.value}
					onCheckedChange={onCheckedChange ?? field.onChange}
				/> */}
				<Switch
					className={className}
					checked={checked ?? field.value}
					onCheckedChange={(e) => {
						field.onChange(e);
						onCheckedChange?.(e);
					}}
					disabled={disabled}
				/>
			</FormControl>

			{!disableLabel && (
				<FormLabel
					className={cn(
						'flex items-center gap-1 capitalize',
						isBoxed && 'cursor-pointer text-white',
						labelClassName
					)}
				>
					{label || field.name.replace('_', ' ')}{' '}
					{optional ? <span className='text-xs'>(Optional)</span> : ''}
				</FormLabel>
			)}

			<FormMessage />
		</FormItem>
	);
};

export default FormSwitch;

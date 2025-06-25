import { ITableFilterOptionSSR } from '@/types';
import { Pin } from 'lucide-react';
import { toast } from 'sonner';
import useTableSSR from '@/hooks/useTableSSR';

import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';

import { cn } from '@/lib/utils';

import Input from './input';
import Select from './select';

function TableColumnFilter<T>({ option, isPin }: { option: ITableFilterOptionSSR<T>; isPin?: boolean }) {
	const { pinFilters, addPinFilter, removePinFilter } = useTableSSR();

	function handlePinning(option: ITableFilterOptionSSR<any>) {
		const isAlreadyPinned = pinFilters.some((filter) => filter.accessor === option.accessor);

		if (isAlreadyPinned) {
			removePinFilter(option);
			toast.warning(`${option.label} has been unpinned`, {
				position: 'bottom-right',
			});
		} else {
			addPinFilter(option);
			toast.success(`${option.label} has been pinned`, {
				position: 'bottom-right',
			});
		}
	}

	const renderFilter = () => {
		switch (option.type) {
			case 'date-range':
				return <div className='flex items-center gap-2' />;
			case 'select':
				return <Select isPin={isPin} {...option} />;
			case 'radio':
				return <div className='flex items-center gap-2' />;
			case 'text':
				return <Input {...option} />;
			case 'checkbox':
				return <div className='flex items-center gap-2' />;
			default:
				return <div className='flex items-center gap-2' />;
		}
	};

	const isPinned = pinFilters && pinFilters?.find((f) => f.accessor === option.accessor);

	return (
		<div className='flex min-w-[200px] flex-col gap-0.5'>
			<div className='flex items-center justify-between gap-2'>
				<Label htmlFor={option.label}>{option.label}</Label>
				<Button
					onClick={() => handlePinning(option)}
					className='size-8 rounded-full p-0'
					variant={isPinned ? 'ghost-destructive' : 'ghost'}
					size={'icon'}
				>
					<Pin className={cn('size-4', isPinned ? 'rotate-45 text-destructive' : 'text-muted-foreground')} />
				</Button>
			</div>
			{renderFilter()}
		</div>
	);
}

export default TableColumnFilter;

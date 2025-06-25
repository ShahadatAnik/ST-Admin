import { useState } from 'react';
import { DropdownMenuTrigger } from '@radix-ui/react-dropdown-menu';
import { Table } from '@tanstack/react-table';
import { useClickAway } from '@uidotdev/usehooks';
import { Columns2 } from 'lucide-react';

import { Button } from '@/components/ui/button';
import {
	DropdownMenu,
	DropdownMenuCheckboxItem,
	DropdownMenuContent,
	DropdownMenuLabel,
	DropdownMenuSeparator,
} from '@/components/ui/dropdown-menu';

import { cn } from '@/lib/utils';

interface TableViewOptionsProps<TData> {
	table: Table<TData>;
	className?: string;
}

export function TableViewOptions<TData>({ table, className }: TableViewOptionsProps<TData>) {
	const [isOpen, setIsOpen] = useState(false);

	const ref = useClickAway(() => {
		setIsOpen(false);
	});

	const handleOpenModal = () => {
		if (isOpen === false) {
			return setIsOpen(true);
		}
	};

	return (
		<DropdownMenu open={isOpen}>
			<DropdownMenuTrigger>
				<Button
					onClick={handleOpenModal}
					aria-label='Column Options'
					variant='gradient'
					size='sm'
					className={cn(className)}
				>
					<Columns2 className='size-4' />
					Columns
				</Button>
			</DropdownMenuTrigger>
			<DropdownMenuContent ref={ref as any} align='end' className='z-[999] max-h-[400px] w-fit overflow-auto'>
				<DropdownMenuLabel>Toggle Columns</DropdownMenuLabel>
				<DropdownMenuSeparator />
				{table
					.getAllColumns()
					.filter((column) => typeof column.accessorFn !== 'undefined' && column.getCanHide())
					.map((column) => {
						return (
							<DropdownMenuCheckboxItem
								key={column.id}
								className='capitalize'
								checked={column.getIsVisible()}
								onCheckedChange={(value) => column.toggleVisibility(!!value)}
							>
								{column.id.split('_').join(' ')}
							</DropdownMenuCheckboxItem>
						);
					})}
			</DropdownMenuContent>
		</DropdownMenu>
	);
}

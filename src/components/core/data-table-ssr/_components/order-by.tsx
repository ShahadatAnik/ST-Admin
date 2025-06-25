import { DropdownMenuTrigger } from '@radix-ui/react-dropdown-menu';
import { Table } from '@tanstack/react-table';
import { ArrowDownAZ, ArrowDownZA, ChevronsUpDown } from 'lucide-react';
import { useSearchParams } from 'react-router-dom';
import useTableSSR from '@/hooks/useTableSSR';

import { Button } from '@/components/ui/button';
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuSeparator,
} from '@/components/ui/dropdown-menu';

interface TableViewOptionsProps<TData> {
	table: Table<TData>;
}

export function TableOrderBy<TData>({ table }: TableViewOptionsProps<TData>) {
	const [searchParams] = useSearchParams();
	const { handleSearchParams } = useTableSSR();

	return (
		<DropdownMenu>
			<DropdownMenuTrigger>
				<Button aria-label='Sort By' variant='gradient' size='sm' className='hidden lg:flex'>
					{searchParams.get('orderby') === 'asc' ? (
						<ArrowDownAZ className='size-4' />
					) : searchParams.get('orderby') === 'desc' ? (
						<ArrowDownZA className='size-4' />
					) : (
						<ChevronsUpDown className='size-4' />
					)}

					{searchParams.get('sort') ? (
						<span className='capitalize'>{searchParams.get('sort')?.split('_').join(' ')}</span>
					) : (
						'Sort By'
					)}
				</Button>
			</DropdownMenuTrigger>
			<DropdownMenuContent align='end' className='max-h-[400px] w-fit min-w-[200px] overflow-auto'>
				<DropdownMenuLabel>Sort By</DropdownMenuLabel>
				<DropdownMenuSeparator />
				{table
					.getAllColumns()
					.filter((column) => typeof column.accessorFn !== 'undefined' && column.getCanHide())
					.map((column) => {
						return (
							<DropdownMenuItem
								key={column.id}
								className='flex h-8 items-center justify-between capitalize'
								onClick={() => {
									if (
										searchParams.get('sort') === column.id &&
										searchParams.get('orderby') === 'asc'
									) {
										handleSearchParams({ orderby: 'desc', sort: column.id });
									} else {
										handleSearchParams({ orderby: 'asc', sort: column.id });
									}
								}}
							>
								{column.id.split('_').join(' ')}

								<Button
									className='size-5 gap-4 rounded-sm'
									size={'icon'}
									variant={searchParams.get('sort') === column.id ? 'default' : 'ghost'}
								>
									{searchParams.get('sort') === column.id ? (
										searchParams.get('orderby') === 'asc' ? (
											<ArrowDownAZ className='size-4' />
										) : (
											<ArrowDownZA className='size-4' />
										)
									) : (
										<ChevronsUpDown className='size-4' />
									)}
								</Button>
							</DropdownMenuItem>
						);
					})}
			</DropdownMenuContent>
		</DropdownMenu>
	);
}

import { ITableFilterOptionSSR } from '@/types';
import { MixerHorizontalIcon } from '@radix-ui/react-icons';

import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import {
	Sheet,
	SheetContent,
	SheetDescription,
	SheetFooter,
	SheetHeader,
	SheetTitle,
	SheetTrigger,
} from '@/components/ui/sheet';

import TableColumnFilter from './column-filter';
import FilterButtons from './filter-buttons';

function TableFilter<T>({ options }: { options: ITableFilterOptionSSR<T>[] }) {
	return (
		<Sheet>
			<SheetTrigger>
				<Button aria-label='Filters All Columns' variant='gradient' size='sm' className='hidden lg:flex'>
					<MixerHorizontalIcon className='size-4' />
					Filters
				</Button>
			</SheetTrigger>
			<SheetContent className='flex flex-col'>
				<SheetHeader className='border-b pb-2'>
					<SheetTitle className='flex items-center gap-2'>
						<MixerHorizontalIcon className='size-4' /> All Filters
					</SheetTitle>
					<SheetDescription className='sr-only'>
						This action cannot be undone. This will permanently delete your account and remove your data
						from our servers.
					</SheetDescription>
				</SheetHeader>

				<ScrollArea className='mt-4 flex-1'>
					<div className='flex flex-col gap-4'>
						{options.map((option, index) => (
							<TableColumnFilter key={index} option={option} />
						))}
					</div>
				</ScrollArea>

				<SheetFooter>
					<FilterButtons />
				</SheetFooter>
			</SheetContent>
		</Sheet>
	);
}

export default TableFilter;

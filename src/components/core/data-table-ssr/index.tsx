import { flexRender } from '@tanstack/react-table';
import useTableSSR from '@/hooks/useTableSSR';

import { TableColumnHeader } from '@/components/core/data-table/_components/column-header';
import TableSkeleton from '@/components/core/data-table/_components/skeleton';
import { getCommonPinningStyles } from '@/components/core/data-table/_helpers/getCommonPinningStyle';
import { TableBody, TableCell, Table as TableComponent, TableHead, TableHeader, TableRow } from '@/components/ui/table';

import { cn } from '@/lib/utils';

import { TablePagination } from './_components/pagination';
import Toolbar from './_components/toolbar';

const DataTableSSR = () => {
	const { table, isEntry, isLoading } = useTableSSR();

	return (
		<div className='flex h-full flex-col'>
			<Toolbar />
			<div
				className={cn(
					'relative max-h-fit flex-1 overflow-auto border border-secondary/10',
					isEntry ? 'rounded-b-md' : 'rounded-md'
				)}
			>
				<TableComponent>
					<TableHeader className='sticky left-0 right-0 top-0 z-20'>
						{table.getHeaderGroups().map((headerGroup) => (
							<TableRow key={headerGroup.id}>
								{headerGroup.headers.map((header) => {
									const content = header.column.columnDef.header;
									return (
										<TableHead
											key={header.id}
											colSpan={header.colSpan}
											style={{
												...getCommonPinningStyles({
													column: header.column,
													isHeader: true,
												}),
											}}
										>
											{header.isPlaceholder
												? null
												: flexRender(
														typeof content === 'string' ? (
															<TableColumnHeader isSSR column={header.column} />
														) : (
															content
														),
														header.getContext()
													)}
										</TableHead>
									);
								})}
							</TableRow>
						))}
					</TableHeader>
					<TableBody className='divide-y-[1px] divide-secondary/10'>
						{isLoading ? (
							<TableSkeleton colSpan={table.getAllColumns().length} />
						) : table.getRowModel().rows?.length ? (
							table.getRowModel().rows.map((row) => (
								<TableRow key={row.id} data-state={row.getIsSelected() && 'selected'}>
									{row.getVisibleCells().map((cell) => (
										<TableCell
											key={cell.id}
											style={{
												...getCommonPinningStyles({
													column: cell.column,
												}),
											}}
										>
											{flexRender(cell.column.columnDef.cell, cell.getContext())}
										</TableCell>
									))}
								</TableRow>
							))
						) : (
							<TableRow>
								<TableCell colSpan={table.getAllColumns().length} className='h-24 text-center'>
									No results.
								</TableCell>
							</TableRow>
						)}
					</TableBody>
				</TableComponent>

				<TablePagination />
			</div>
		</div>
	);
};

export default DataTableSSR;

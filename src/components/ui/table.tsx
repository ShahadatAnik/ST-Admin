import * as React from 'react';

import { cn } from '@/lib/utils';

function Table({ className, ...props }: React.ComponentProps<'table'>) {
	return <table data-slot='table' className={cn('w-full caption-bottom text-sm', className)} {...props} />;
}

function TableHeader({ className, ...props }: React.ComponentProps<'thead'>) {
	return (
		<thead
			data-slot='table-header'
			className={cn('sticky top-0 select-none bg-base-200 text-sm text-primary [&_tr]:border-b', className)}
			{...props}
		/>
	);
}

function TableBody({ className, ...props }: React.ComponentProps<'tbody'>) {
	return <tbody data-slot='table-body' className={cn('[&_tr:last-child]:border-0', className)} {...props} />;
}

function TableFooter({ className, ...props }: React.ComponentProps<'tfoot'>) {
	return (
		<tfoot
			data-slot='table-footer'
			className={cn(
				'border-t bg-neutral-100/50 font-medium dark:bg-neutral-800/50 [&>tr]:last:border-b-0',
				className
			)}
			{...props}
		/>
	);
}

function TableRow({ className, ...props }: React.ComponentProps<'tr'>) {
	return (
		<tr
			data-slot='table-row'
			className={cn(
				'relative h-12 cursor-pointer text-base transition-colors duration-150 ease-in hover:bg-base-150 focus:bg-base-150 data-[state=selected]:bg-base-300 dark:hover:bg-neutral-800/50 dark:data-[state=selected]:bg-neutral-800',
				className
			)}
			{...props}
		/>
	);
}

function TableHead({ className, ...props }: React.ComponentProps<'th'>) {
	return (
		<th
			data-slot='table-head'
			className={cn(
				'space-y-1 whitespace-nowrap px-3 py-2 text-left align-middle text-sm font-medium tracking-wide text-primary first:pl-6 dark:text-neutral-400 [&:has([role=checkbox])]:pr-0',
				className
			)}
			{...props}
		/>
	);
}

function TableCell({ className, ...props }: React.ComponentProps<'td'>) {
	return (
		<td
			data-slot='table-cell'
			className={cn(
				'group px-3 py-2 text-left align-middle text-sm font-normal tracking-wide text-foreground first:pl-6 [&:has([role=checkbox])]:pr-0',
				className
			)}
			{...props}
		/>
	);
}

function TableCaption({ className, ...props }: React.ComponentProps<'caption'>) {
	return (
		<caption
			data-slot='table-caption'
			className={cn('mt-4 text-sm text-neutral-500 dark:text-neutral-400', className)}
			{...props}
		/>
	);
}

export { Table, TableHeader, TableBody, TableFooter, TableHead, TableRow, TableCell, TableCaption };

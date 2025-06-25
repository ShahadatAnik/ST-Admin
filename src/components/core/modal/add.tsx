import { Description, Dialog, DialogPanel, DialogTitle } from '@headlessui/react';
import { AnimatePresence, motion } from 'framer-motion';
import { X } from 'lucide-react';
import { useHotkeys } from 'react-hotkeys-hook';

import { Button } from '@/components/ui/button';
import { Form } from '@/components/ui/form';
import CoreForm from '@core/form';

import { DevTool } from '@/lib/react-hook-devtool';
import { cn } from '@/lib/utils';

import { IAddModalProps } from './types';

const AddModal: React.FC<IAddModalProps> = ({
	form,
	onSubmit,
	open,
	setOpen,
	title,
	subtitle,
	children,
	className,
	isSmall,
}) => {
	useHotkeys(
		'esc',
		() => {
			if (open) setOpen(false);
		},
		[open]
	);

	return (
		<AnimatePresence>
			{open && (
				<Dialog static open={open} onClose={() => null} className='relative z-50'>
					<motion.div
						initial={{ opacity: 0 }}
						animate={{ opacity: 1 }}
						exit={{ opacity: 0 }}
						className='fixed inset-0 bg-black/50'
					/>
					<div className='fixed inset-0 flex w-screen items-center justify-center p-4'>
						<DialogPanel
							as={motion.div}
							initial={{ opacity: 0, scale: 0.95 }}
							animate={{ opacity: 1, scale: 1 }}
							exit={{ opacity: 0, scale: 0.95 }}
							className={cn(
								'relative max-h-[90vh] w-full max-w-lg overflow-y-auto rounded-lg bg-background p-6 shadow-lg',
								isSmall && 'sm:max-w-5xl',
								className
							)}
						>
							<div className='absolute right-4 top-4'>
								<Button
									onClick={() => setOpen(false)}
									variant={'destructive'}
									size={'icon'}
									className='size-7 rounded-full'
								>
									<X className='size-4' />
								</Button>
							</div>
							<div className='mb-4 space-y-1.5'>
								<DialogTitle className='text-lg font-bold'>{title}</DialogTitle>
								<Description className={cn('text-sm text-muted-foreground', !subtitle && 'sr-only')}>
									{subtitle}
								</Description>
							</div>

							<Form {...form}>
								<form onSubmit={form.handleSubmit(onSubmit)} className='relative space-y-6'>
									<div className='space-y-3'>{children}</div>
									<CoreForm.Submit className='w-full' title='Save' />
									<DevTool control={form.control} placement='top-left' />
								</form>
							</Form>
						</DialogPanel>
					</div>
				</Dialog>
			)}
		</AnimatePresence>
	);
};

export default AddModal;

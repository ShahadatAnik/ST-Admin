import React from 'react';
import { Eye } from 'lucide-react';

import { Button } from '@/components/ui/button';
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from '@/components/ui/dialog';

import { cn } from '@/lib/utils';

import { IContentModalProps } from './types';

const ContentModal: React.FC<IContentModalProps> = ({ title, content, className, isSmall }) => {
	return (
		<Dialog>
			<DialogTrigger>
				<Button size={'sm'} variant={'gradient'}>
					View <Eye className='size-4' />
				</Button>
			</DialogTrigger>
			<DialogContent
				onInteractOutside={(e) => {
					e.preventDefault();
				}}
				className={cn(
					'max-h-[90vh] w-full cursor-default overflow-auto bg-background',
					isSmall && 'sm:max-w-5xl',
					className
				)}
			>
				<DialogHeader>
					<DialogTitle>{title}</DialogTitle>
					<DialogDescription>{content}</DialogDescription>
				</DialogHeader>
			</DialogContent>
		</Dialog>
	);
};

export default ContentModal;

import React from 'react';
import { Eye } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import RichTextViewer from '@/components/ui/rich-text-viewer';

import { cn } from '@/lib/utils';

import { IRichTextModalProps } from './types';

const RichTextModal: React.FC<IRichTextModalProps> = ({ title, content, className, isSmall }) => {
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
					<RichTextViewer content={content} />
				</DialogHeader>
			</DialogContent>
		</Dialog>
	);
};

export default RichTextModal;

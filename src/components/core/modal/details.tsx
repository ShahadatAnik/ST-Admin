import React from 'react';
import { Eye } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';

import { cn } from '@/lib/utils';

import { IDetailsModalProps } from './types';

const DetailsModal: React.FC<IDetailsModalProps> = ({ title, content, className, isSmall, open, setOpen }) => {
	return (
		<Dialog open={open} onOpenChange={setOpen}>
			<DialogContent
				onInteractOutside={(e) => {
					e.preventDefault();
				}}
				className={cn(
					'max-h-[90vh] w-full cursor-default overflow-auto bg-background',
					isSmall && 'sm:max-w-7xl',
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

export default DetailsModal;

import { Copy, Edit, Trash2 } from 'lucide-react';

import { Button } from '../ui/button';

interface FieldActionButtonProps {
	handleCopy?: (index: number) => void;
	handleEdit?: (index: number) => void;
	handleRemove?: (index: number) => void;
	hidden?: boolean;
	index: number;
}

const FieldActionButton = ({ handleEdit, handleCopy, handleRemove, index, hidden = false }: FieldActionButtonProps) => {
	return (
		<div className='flex items-center'>
			{handleEdit && !hidden && (
				<Button
					className='rounded-full'
					onClick={() => handleEdit(index)}
					type='button'
					size={'icon'}
					variant={'ghost'}
				>
					<Edit className='size-4' />
				</Button>
			)}
			{handleCopy && !hidden && (
				<Button
					className='rounded-full'
					onClick={() => handleCopy(index)}
					type='button'
					size={'icon'}
					variant={'ghost'}
				>
					<Copy className='size-4' />
				</Button>
			)}
			{handleRemove && !hidden && (
				<Button
					className='rounded-full'
					onClick={() => handleRemove(index)}
					type='button'
					size={'icon'}
					variant={'ghost-destructive'}
				>
					<Trash2 className='size-4' />
				</Button>
			)}
		</div>
	);
};

export default FieldActionButton;

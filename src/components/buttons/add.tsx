import { Plus, Repeat } from 'lucide-react';

import { Button, ButtonProps } from '@/components/ui/button';

function Add({ onClick, ...props }: ButtonProps) {
	return (
		<Button onClick={onClick} type='button' variant={'accent'} size={'icon'} className='size-5 rounded'>
			<Plus className='size-4' />
			{/* Add */}
		</Button>
	);
}

export default Add;

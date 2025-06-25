import { Eye } from 'lucide-react';

import { API_IMAGE_URL } from '@/lib/secret';

import { buttonVariants } from '../ui/button';

const FilePreview: React.FC<{ preview: string | ArrayBuffer | null }> = ({ preview }) => {
	return (
		<a
			className={buttonVariants({
				variant: 'gradient',
				className: 'gap-2',
				size: 'sm',
			})}
			target='_blank'
			href={(API_IMAGE_URL + preview) as string}
		>
			View File
			<Eye className='size-4' />
		</a>
	);
};

export default FilePreview;

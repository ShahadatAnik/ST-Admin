import { ImagePlus } from 'lucide-react';

import { cn } from '@/lib/utils';

const DocumentPreview: React.FC<{ preview: string | ArrayBuffer | null }> = ({ preview }) => {
	return (
		<div className='flex size-full min-h-[360px] flex-col items-center justify-center p-4'>
			{preview ? (
				<iframe className='size-full rounded-lg' src={preview as string} />
			) : (
				<>
					<ImagePlus className={cn(`block size-8`, preview && 'hidden')} />
					<p className='my-2 text-sm text-gray-500 dark:text-gray-400'>
						<span className='font-semibold'>Click to upload</span> or drag and drop
					</p>
					<p className='text-xs text-gray-500 dark:text-gray-400'>Document, PDF, Word</p>
				</>
			)}
		</div>
	);
};

export default DocumentPreview;

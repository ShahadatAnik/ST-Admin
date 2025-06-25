import { ImagePlus } from 'lucide-react';

import { cn } from '@/lib/utils';

const VideoPreview: React.FC<{ preview: string | ArrayBuffer | null }> = ({ preview }) => {
	return (
		<div className='flex flex-col items-center justify-center pb-6 pt-5'>
			{preview ? (
				<img className='max-h-[100px] rounded-lg' src={preview as string} alt='User image' />
			) : (
				<>
					<ImagePlus className={cn(`block size-8`, preview && 'hidden')} />

					<p className='mb-2 text-sm text-gray-500 dark:text-gray-400'>
						<span className='font-semibold'>Click to upload</span> or drag and drop
					</p>
					<p className='text-xs text-gray-500 dark:text-gray-400'>Video</p>
				</>
			)}
		</div>
	);
};

export default VideoPreview;

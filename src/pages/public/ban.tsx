import React from 'react';
import { Ban } from 'lucide-react';

type TTemplate = {
	title: string;
	subtitle: string;
	children?: React.ReactNode;
};

export const BanPage: React.FC<TTemplate> = ({ title, subtitle, children }) => {
	return (
		<div className='flex h-screen flex-col items-center justify-center gap-12 py-8'>
			<Ban className='size-24 text-red-600' />
			<div className='flex flex-col items-center gap-4'>
				<h1 className='text-center text-3xl font-medium capitalize'>{title}</h1>
				<p className='text-center text-xl'>{subtitle}</p>
				{children}
			</div>
		</div>
	);
};

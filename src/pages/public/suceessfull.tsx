import React from 'react';
import { firstRoute } from '@/routes';
import { Smile } from 'lucide-react';

type TTemplate = {
	icon: React.ReactNode;
	title: string;
	subtitle: string;
	children?: React.ReactNode;
};

const Template: React.FC<TTemplate> = ({ icon, title, subtitle, children }) => {
	return (
		<div className='flex h-screen flex-col items-center justify-center gap-12 py-8'>
			{icon}
			<div className='flex flex-col items-center gap-4'>
				<h1 className='text-center text-3xl font-medium capitalize'>{title}</h1>
				<p className='text-center text-xl'>{subtitle}</p>
				{children}
			</div>
		</div>
	);
};

export default function Success() {
	return (
		<Template
			icon={<Smile className='size-24 text-red-600' />}
			title='Your Form Submitted Successfully'
			subtitle={`Thanks for Your Honesty`}
		></Template>
	);
}

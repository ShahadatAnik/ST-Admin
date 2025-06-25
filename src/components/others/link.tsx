import React from 'react';
import { useCopyToClipboard } from '@uidotdev/usehooks';
import { Clipboard } from 'lucide-react';
import { Link } from 'react-router-dom';

import { CLIENT_URL } from '@/lib/secret';
import { cn } from '@/lib/utils';

import { Button } from '../ui/button';
import { ShowLocalToast } from './toast';

interface ILinkOnlyProps {
	uri: string;
	title: string;
	baseUrlNeeded?: boolean;
	showCopyButton?: boolean;
}

export const LinkOnly = ({ uri, title }: ILinkOnlyProps) => {
	return (
		<Link to={uri} className='font-medium text-foreground underline hover:text-accent'>
			{title}
		</Link>
	);
};
export const LinkWithRedirect = ({ title, uri, baseUrlNeeded = true, showCopyButton = false }: ILinkOnlyProps) => {
	if (baseUrlNeeded) {
		return (
			<div className={cn('flex items-center gap-2')}>
				{showCopyButton && <CopyClipboard text={uri} />}
				<Link
					target='_blank'
					className='font-medium text-foreground underline hover:text-accent'
					to={CLIENT_URL + uri}
				>
					{title}
				</Link>
			</div>
		);
	} else {
		return (
			<div className={cn('flex items-center gap-2')}>
				{showCopyButton && <CopyClipboard text={uri} />}
				<Link target='_blank' className='font-medium text-foreground underline hover:text-accent' to={uri}>
					{title}
				</Link>
			</div>
		);
	}
};
const CopyClipboard: React.FC<{
	text: string;
}> = ({ text }) => {
	const [copiedText, copy] = useCopyToClipboard();

	const handleCopy = (text: string) => () => {
		copy(text);
		ShowLocalToast({
			toastType: 'create',
			message: `${text} copied`,
		});
	};

	return <Clipboard size={14} onClick={handleCopy(text)} />;
};
export const CustomLink = ({ label, url = '', showCopyButton = true, openInNewTab = false, className = '' }: any) => {
	if (!label) return '--';

	return (
		<div className={cn('flex items-center gap-2', className)}>
			{showCopyButton && <CopyClipboard text={label} />}

			{url === null ? (
				<span>{label}</span>
			) : (
				<Link
					to={url}
					className={cn(
						'hover:text-info hover:decoration-info font-semibold underline underline-offset-2 transition-colors duration-300',
						url !== null ? 'cursor-pointer' : 'pointer-events-none cursor-not-allowed'
					)}
					target={openInNewTab ? '_blank' : '_self'}
				>
					{label}
				</Link>
			)}
		</div>
	);
};

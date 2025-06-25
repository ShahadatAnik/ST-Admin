import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';

const TooltipWrapper: React.FC<{
	children: React.ReactNode;
	message: string;
}> = ({ children, message }) => {
	return (
		<TooltipProvider>
			<Tooltip>
				<TooltipTrigger asChild>{children}</TooltipTrigger>
				<TooltipContent align='center' sideOffset={4} className='max-w-[300px]'>
					<p>{message}</p>
				</TooltipContent>
			</Tooltip>
		</TooltipProvider>
	);
};

export default TooltipWrapper;

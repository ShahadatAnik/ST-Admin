import { sidebarRoutes } from '@/routes';
import { NavLink } from 'react-router-dom';

import { cn } from '@/lib/utils';

interface IBrandLogoProps {
	className?: string;
}

const BrandLogo: React.FC<IBrandLogoProps> = ({ className, ...props }) => {
	const route = sidebarRoutes[0];

	return (
		<NavLink
			className={cn(
				'flex items-center justify-center text-2xl font-bold text-primary-foreground md:text-4xl',
				className
			)}
			to={route.path!}
			{...props}
		>
			EUB-Admin
		</NavLink>
	);
};

export default BrandLogo;

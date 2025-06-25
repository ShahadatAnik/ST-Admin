import { lazy } from 'react';
import Profile from '@/pages/profile';
import { IRoute } from '@/types';

const ProfileRoutes: IRoute[] = [
	{
		name: 'Profile',
		path: '/profile',
		element: <Profile />,
		page_name: 'profile',
		actions: ['read', 'update', 'reset_password'],
	},
];
export default ProfileRoutes;

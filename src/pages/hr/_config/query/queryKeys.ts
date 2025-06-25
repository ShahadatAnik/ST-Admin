import { IParams } from '@/types';

export const hrQK = {
	all: () => ['admin'],

	//* department
	department: () => [...hrQK.all(), 'department'],
	departmentByUUID: (uuid: string) => [...hrQK.department(), uuid],

	//* designation
	designation: () => [...hrQK.all(), 'designation'],
	designationByUUID: (uuid: string) => [...hrQK.designation(), uuid],

	//* user
	userDefault: () => [...hrQK.all(), 'user'],
	user: () => [...hrQK.userDefault()],
	userByUUID: (uuid: string) => [...hrQK.userDefault(), uuid],
	userCanAccess: (uuid: string) => [...hrQK.userDefault(), 'can-access', uuid],
	userWithAccess: () => [...hrQK.userDefault(), 'users-with-access'],
	//*auth
	authDefault: () => [...hrQK.all(), 'auth'],
	auth: ({ start_date, end_date, status }: IParams) => [...hrQK.all(), 'auth', start_date, end_date, status],
	authByUUID: (uuid: string) => [...hrQK.authDefault(), uuid],
};

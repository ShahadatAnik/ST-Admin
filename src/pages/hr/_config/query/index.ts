import { IParams } from '@/types';
import useTQuery from '@/hooks/useTQuery';

import addUrlParams from '@/utils/routes/addUrlParams';

import { hrQK } from './queryKeys';

// * User
export const useHrUsers = <T>() =>
	useTQuery<T>({
		queryKey: hrQK.user(),
		url: '/hr/users',
	});

export const useHrUsersByUUID = <T>(uuid: string) =>
	useTQuery<T>({
		queryKey: hrQK.userByUUID(uuid),
		url: `/hr/users/${uuid}`,
		enabled: !!uuid,
	});

//* Auth
export const useHrAuth = <T>(params: IParams) =>
	useTQuery<T>({
		queryKey: hrQK.auth(params),
		url: addUrlParams('/hr/auth-user', params),
	});

export const useHrAuthByUUID = <T>(uuid: string) =>
	useTQuery<T>({
		queryKey: hrQK.authByUUID(uuid),
		url: `/hr/auth-user/${uuid}`,
		enabled: !!uuid,
	});

export const useHrCanAccess = <T>(uuid: string) =>
	useTQuery<T>({
		queryKey: hrQK.userCanAccess(uuid),
		url: `/hr/users/can-access/${uuid}`,
		enabled: !!uuid,
	});

export const useHrUsersWithAccess = <T>() =>
	useTQuery<T>({
		queryKey: hrQK.userWithAccess(),
		url: '/other/hr/users-can-access/value/label',
	});
// * Department
export const useHrDepartments = <T>() =>
	useTQuery<T>({
		queryKey: hrQK.department(),
		url: '/hr/department',
	});

export const useHrDesignationByUUID = <T>(uuid: string) =>
	useTQuery<T>({
		queryKey: hrQK.designationByUUID(uuid),
		url: `/hr/designation/${uuid}`,
		enabled: !!uuid,
	});

// * Designation
export const useHrDesignations = <T>() =>
	useTQuery<T>({
		queryKey: hrQK.designation(),
		url: '/hr/designation',
	});

export const useHrDepartmentsByUUID = <T>(uuid: string) =>
	useTQuery<T>({
		queryKey: hrQK.departmentByUUID(uuid),
		url: `/hr/department/${uuid}`,
		enabled: !!uuid,
	});

import { IParams } from '@/types';
import useTQuery from '@/hooks/useTQuery';

import addUrlParams from '@/utils/routes/addUrlParams';

import { hrQK } from './queryKeys';

// * User
export const useHrUsers = <T>(params: IParams) =>
	useTQuery<T>({
		queryKey: hrQK.user(params),
		url: addUrlParams('/hr/users', params),
	});

export const useHrUsersByUUID = <T>(uuid: string) =>
	useTQuery<T>({
		queryKey: hrQK.userByUUID(uuid),
		url: `/hr/users/${uuid}`,
		enabled: !!uuid,
	});

export const useHrCanAccess = <T>(uuid: string) =>
	useTQuery<T>({
		queryKey: hrQK.userCanAccess(uuid),
		url: `/hr/users/can-access/${uuid}`,
		enabled: !!uuid,
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

import { IParams } from '@/types';
import useTQuery from '@/hooks/useTQuery';

import addUrlParams from '@/utils/routes/addUrlParams';

import { jobQK } from './queryKeys';

// * Job
export const useJob = <T>() =>
	useTQuery<T>({
		queryKey: jobQK.job(),
		url: '/lib/job',
	});

export const useJobByUUID = <T>(uuid: string) =>
	useTQuery<T>({
		queryKey: jobQK.jobByUUID(uuid),
		url: `/lib/job/${uuid}`,
		enabled: !!uuid,
	});

// * Job Entry
export const useJobEntry = <T>() =>
	useTQuery<T>({
		queryKey: jobQK.jobEntry(),
		url: `/lib/job-entry`,
	});

export const useJobEntryByUUID = <T>(uuid: string) =>
	useTQuery<T>({
		queryKey: jobQK.jobEntryByUUID(uuid),
		url: `/lib/job-entry/${uuid}`,
		enabled: !!uuid,
	});

export const useJobPayment = <T>(uuid: string) =>
	useTQuery<T>({
		queryKey: jobQK.jobPayment(uuid),
		url: `/lib/job-payment/${uuid}`,
		enabled: !!uuid,
	});

import { IParams } from '@/types';

export const jobQK = {
	all: () => ['job'],

	//* job
	job: () => [...jobQK.all(), 'jobs'],
	jobByUUID: (uuid: string) => [...jobQK.job(), uuid],

	//* job entry
	jobEntry: () => [...jobQK.all(), 'job-entries'],
	jobEntryByUUID: (uuid: string) => [...jobQK.jobEntry(), uuid],
	jobPayment: (uuid: string) => [...jobQK.all(), uuid, 'job-payment'],
};

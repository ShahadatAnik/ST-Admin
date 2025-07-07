import { IParams } from '@/types';

export const clientQK = {
	all: () => ['client'],

	//* Client
	client: () => [...clientQK.all(), 'clients'],
	clientByUUID: (uuid: string) => [...clientQK.client(), uuid],
};

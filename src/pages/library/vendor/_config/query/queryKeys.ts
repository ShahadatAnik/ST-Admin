import { IParams } from '@/types';

export const vendorQK = {
	all: () => ['vendor'],

	//* Client
	vendor: () => [...vendorQK.all(), 'vendors'],
	vendorByUUID: (uuid: string) => [...vendorQK.vendor(), uuid],
};

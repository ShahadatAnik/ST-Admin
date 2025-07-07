import { IParams } from '@/types';
import useTQuery from '@/hooks/useTQuery';

import addUrlParams from '@/utils/routes/addUrlParams';

import { vendorQK } from './queryKeys';

// * User
export const useVendor = <T>() =>
	useTQuery<T>({
		queryKey: vendorQK.vendor(),
		url: '/lib/vendor',
	});

export const useVendorByUUID = <T>(uuid: string) =>
	useTQuery<T>({
		queryKey: vendorQK.vendorByUUID(uuid),
		url: `/lib/vendor/${uuid}`,
		enabled: !!uuid,
	});

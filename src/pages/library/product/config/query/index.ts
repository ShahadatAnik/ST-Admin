import useTQuery from '@/hooks/useTQuery';

import { libQK } from './queryKeys';

// * Product
export const useLibProducts = <T>() =>
	useTQuery<T>({
		queryKey: libQK.product(),
		url: '/lib/product',
	});

export const useLibProductByUUID = <T>(uuid: string) =>
	useTQuery<T>({
		queryKey: libQK.productByUUID(uuid),
		url: `/lib/product/${uuid}`,
		enabled: !!uuid,
	});

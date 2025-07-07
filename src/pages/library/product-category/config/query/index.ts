import useTQuery from '@/hooks/useTQuery';

import { libQK } from './queryKeys';

// * Product
export const useLibProductsCategory = <T>() =>
	useTQuery<T>({
		queryKey: libQK.productCategory(),
		url: '/lib/product-category',
	});

export const useLibProductCategoryByUUID = <T>(uuid: string) =>
	useTQuery<T>({
		queryKey: libQK.productCategoryByUUID(uuid),
		url: `/lib/product-category/${uuid}`,
		enabled: !!uuid,
	});

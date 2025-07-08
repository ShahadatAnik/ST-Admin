import useTQuery from '@/hooks/useTQuery';

import { libQK } from './queryKeys';

// * Profit Summery
export const useLibReportProductDatabase = <T>() =>
	useTQuery<T>({
		queryKey: libQK.productDatabase(),
		url: '/report/job/product-database',
	});

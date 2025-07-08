import useTQuery from '@/hooks/useTQuery';

import { libQK } from './queryKeys';

// * Profit Summery
export const useLibReportProfitSummary = <T>() =>
	useTQuery<T>({
		queryKey: libQK.profitSummary(),
		url: '/report/job/profit-summary',
	});

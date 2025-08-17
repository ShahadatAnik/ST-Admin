import useTQuery from '@/hooks/useTQuery';

import { libQK } from './queryKeys';

// * Loan
export const useLibLoans = <T>(query?: string) =>
	useTQuery<T>({
		queryKey: libQK.loan(query),
		url: query ? `/lib/loan?${query}` : '/lib/loan',
	});

export const useLibLoanByUUID = <T>(uuid: string) =>
	useTQuery<T>({
		queryKey: libQK.loanByUUID(uuid),
		url: `/lib/loan/${uuid}`,
		enabled: !!uuid,
	});

export const useLibLoanPaidByLoanUUID = <T>(uuid: string) =>
	useTQuery<T>({
		queryKey: libQK.loanPaidByLoanUUID(uuid),
		url: `/lib/loan/${uuid}`,
		enabled: !!uuid,
	});

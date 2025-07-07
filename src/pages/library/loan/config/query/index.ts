import useTQuery from '@/hooks/useTQuery';

import { libQK } from './queryKeys';

// * Loan
export const useLibLoans = <T>() =>
	useTQuery<T>({
		queryKey: libQK.loan(),
		url: '/lib/loan',
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

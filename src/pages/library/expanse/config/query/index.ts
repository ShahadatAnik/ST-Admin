import useTQuery from '@/hooks/useTQuery';

import { libQK } from './queryKeys';

// * Expanse
export const useLibExpanse = <T>() =>
	useTQuery<T>({
		queryKey: libQK.expanse(),
		url: '/lib/expense',
	});

export const useLibExpanseByUUID = <T>(uuid: string) =>
	useTQuery<T>({
		queryKey: libQK.expanseByUUID(uuid),
		url: `/lib/expense/${uuid}`,
		enabled: !!uuid,
	});
